import { createApp } from "./server.js";

const port = process.env.PORT ? Number(process.env.PORT) : 3000;

createApp().listen(port, () => {
  console.log(`todo-api-example listening on http://localhost:${port}`);
});
