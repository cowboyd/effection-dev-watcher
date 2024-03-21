import { main, suspend } from "effection";
import { useServer } from "./use-server";

await main(function*() {
  const address = yield* useServer("Hello World!\n");

  console.log(`-> http://localhost:${address.port}`);

  yield* suspend();
});
