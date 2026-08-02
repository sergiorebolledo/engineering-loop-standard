import { createServer } from "node:http";
import { randomUUID } from "node:crypto";

// Caps how much of a request body we'll buffer in memory before giving up.
// Without this, an unbounded POST body is a trivial memory-exhaustion DoS
// (OWASP API4:2023 - Unrestricted Resource Consumption).
const MAX_BODY_BYTES = 1_000_000; // 1 MB - generous for a todo title

class PayloadTooLargeError extends Error {}

export function createTodoStore() {
  const todos = new Map();
  return {
    list() {
      return [...todos.values()];
    },
    add(title) {
      const todo = { id: randomUUID(), title, done: false };
      todos.set(todo.id, todo);
      return todo;
    },
    remove(id) {
      return todos.delete(id);
    },
  };
}

export function createApp(store = createTodoStore()) {
  return createServer(async (req, res) => {
    res.setHeader("content-type", "application/json");
    const url = new URL(req.url ?? "/", "http://localhost");

    if (req.method === "GET" && url.pathname === "/todos") {
      res.writeHead(200);
      res.end(JSON.stringify(store.list()));
      return;
    }

    if (req.method === "POST" && url.pathname === "/todos") {
      let body;
      try {
        body = await readJsonBody(req);
      } catch (error) {
        if (error instanceof PayloadTooLargeError) {
          res.writeHead(413);
          res.end(JSON.stringify({ error: "request body too large" }));
          return;
        }
        res.writeHead(400);
        res.end(JSON.stringify({ error: "invalid JSON body" }));
        return;
      }
      if (!body || typeof body.title !== "string" || body.title.trim() === "") {
        res.writeHead(400);
        res.end(JSON.stringify({ error: "title is required" }));
        return;
      }
      const todo = store.add(body.title.trim());
      res.writeHead(201);
      res.end(JSON.stringify(todo));
      return;
    }

    const deleteMatch =
      req.method === "DELETE" && url.pathname.match(/^\/todos\/([^/]+)$/);
    if (deleteMatch) {
      const removed = store.remove(deleteMatch[1]);
      res.writeHead(removed ? 204 : 404);
      res.end();
      return;
    }

    res.writeHead(404);
    res.end(JSON.stringify({ error: "not found" }));
  });
}

function readJsonBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    let receivedBytes = 0;
    let overLimit = false;

    req.on("data", (chunk) => {
      if (overLimit) return;
      receivedBytes += chunk.length;
      if (receivedBytes > MAX_BODY_BYTES) {
        // Stop buffering and let the caller respond (413) over the still-open
        // connection - destroying the socket here would reset it before any
        // response bytes could be written.
        overLimit = true;
        req.pause();
        reject(new PayloadTooLargeError());
        return;
      }
      chunks.push(chunk);
    });
    req.on("end", () => {
      if (overLimit) return;
      if (chunks.length === 0) {
        resolve(undefined);
        return;
      }
      try {
        resolve(JSON.parse(Buffer.concat(chunks).toString("utf8")));
      } catch (error) {
        reject(error);
      }
    });
    req.on("error", reject);
  });
}
