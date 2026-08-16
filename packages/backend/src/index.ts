import { app } from "./app";
import { prepareDatabase } from "./db/bootstrap";

const PORT = Number(process.env.PORT ?? 4000);

// Migrate and seed before accepting traffic, so a fresh clone comes up with a
// populated catalogue rather than an empty one.
await prepareDatabase();

app.listen(PORT);

console.log(`Backend is running at http://localhost:${PORT}`);

export { app };
export type { App } from "./app";
