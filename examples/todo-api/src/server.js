import { createServer } from "node:http";
import { randomUUID } from "node:crypto";

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
      } catch {
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
    let raw = "";
    req.on("data", (chunk) => {
      raw += chunk;
    });
    req.on("end", () => {
      if (!raw) {
        resolve(undefined);
        return;
      }
      try {
        resolve(JSON.parse(raw));
      } catch (error) {
        reject(error);
      }
    });
    req.on("error", reject);
  });
}
