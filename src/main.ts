import { main, suspend } from "effection";
import { useServer } from "./use-server";

await main(function*() {
  const address1 = yield* useServer("Hello World!\n");

  console.log(`-> http://localhost:${address1.port}`);

  const address2 = yield* useServer("Hello Universe!\n");

  console.log(`-> http://localhost:${address2.port}`);

  yield* suspend();
});
