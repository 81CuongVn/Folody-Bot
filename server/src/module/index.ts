import 'dotenv/config';
import { spawn, Worker, Thread } from "threads";

(async () => {
  const worker = await spawn(new Worker("./worker.js"));
  await worker.init();
  process.on("SIGINT", () => {
    Thread.terminate(worker);
    process.exit(0);
  })
})();