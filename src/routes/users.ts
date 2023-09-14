import { Hono } from "hono";
import users from "../data/users.json";

const api = new Hono();

api.get("", (c) => {
  return c.json({ ok: true, data: users });
});

api.get("/:id", async (c) => {
  const id = c.req.param("id");
  const user = users.find((u) => u.id === Number(id));
  if (!user) {
    return c.json({ ok: false, error: "Not Found" }, 404);
  } else {
    return c.json({ ok: true, data: user });
  }
});

api.post("/", async (c) => {
  const body = await c.req.json();
  users.push(body);
  return c.json({ ok: true, data: body });
});

api.put("/:id", async (c) => {
  const id = c.req.param("id");
  const body = await c.req.json();
  const user = users.find((u) => u.id === Number(id));
  if (!user) {
    return c.json({ ok: false, error: "Not Found" }, 404);
  } else {
    const index = users.indexOf(user);
    users[index] = body;
    return c.json({ ok: true, data: body });
  }
});

api.delete("/:id", async (c) => {
  const id = c.req.param("id");
  const user = users.find((u) => u.id === Number(id));
  if (!user) {
    return c.json({ ok: false, error: "Not Found" }, 404);
  } else {
    const index = users.indexOf(user);
    users.splice(index, 1);
    return c.json({ ok: true, data: user });
  }
});

export default api;
