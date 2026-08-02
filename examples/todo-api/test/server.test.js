import { test } from "node:test";
import assert from "node:assert/strict";
import { createApp, createTodoStore } from "../src/server.js";

async function withServer(fn) {
  const server = createApp(createTodoStore());
  await new Promise((resolve) => server.listen(0, resolve));
  const { port } = server.address();
  const baseUrl = `http://127.0.0.1:${port}`;
  try {
    await fn(baseUrl);
  } finally {
    await new Promise((resolve) => server.close(resolve));
  }
}

test("GET /todos starts empty", async () => {
  await withServer(async (baseUrl) => {
    const res = await fetch(`${baseUrl}/todos`);
    assert.equal(res.status, 200);
    assert.deepEqual(await res.json(), []);
  });
});

test("POST /todos creates a todo", async () => {
  await withServer(async (baseUrl) => {
    const res = await fetch(`${baseUrl}/todos`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ title: "Write ADR for the schema fix" }),
    });
    assert.equal(res.status, 201);
    const todo = await res.json();
    assert.equal(todo.title, "Write ADR for the schema fix");
    assert.equal(todo.done, false);

    const list = await (await fetch(`${baseUrl}/todos`)).json();
    assert.equal(list.length, 1);
  });
});

test("POST /todos rejects an empty title", async () => {
  await withServer(async (baseUrl) => {
    const res = await fetch(`${baseUrl}/todos`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ title: "   " }),
    });
    assert.equal(res.status, 400);
  });
});

test("POST /todos rejects invalid JSON", async () => {
  await withServer(async (baseUrl) => {
    const res = await fetch(`${baseUrl}/todos`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: "{not json",
    });
    assert.equal(res.status, 400);
  });
});

test("POST /todos rejects a body over the size cap", async () => {
  await withServer(async (baseUrl) => {
    const oversized = JSON.stringify({ title: "x".repeat(1_100_000) });
    const res = await fetch(`${baseUrl}/todos`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: oversized,
    });
    assert.equal(res.status, 413);

    const list = await (await fetch(`${baseUrl}/todos`)).json();
    assert.equal(list.length, 0);
  });
});

test("DELETE /todos/:id removes a todo", async () => {
  await withServer(async (baseUrl) => {
    const created = await (
      await fetch(`${baseUrl}/todos`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ title: "temp" }),
      })
    ).json();

    const del = await fetch(`${baseUrl}/todos/${created.id}`, { method: "DELETE" });
    assert.equal(del.status, 204);

    const list = await (await fetch(`${baseUrl}/todos`)).json();
    assert.equal(list.length, 0);
  });
});

test("DELETE /todos/:id 404s for an unknown id", async () => {
  await withServer(async (baseUrl) => {
    const res = await fetch(`${baseUrl}/todos/does-not-exist`, { method: "DELETE" });
    assert.equal(res.status, 404);
  });
});

test("unknown routes 404", async () => {
  await withServer(async (baseUrl) => {
    const res = await fetch(`${baseUrl}/nope`);
    assert.equal(res.status, 404);
  });
});
