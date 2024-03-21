import { main, suspend } from "effection";
import { useCommand } from "./src/use-command";

await main(function*([cmd, ...args]) {
  yield* useCommand(cmd, args);
  yield* suspend();
});

