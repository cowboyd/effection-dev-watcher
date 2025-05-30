import { main, scoped } from "effection";
import { useCommand } from "./src/use-command";
import { useWatcher } from "./src/use-watcher";

await main(function*([cmd, ...args]) {
  while (true) {
    yield* scoped(function*() {

      let changes = yield* useWatcher("src");

      yield* useCommand(cmd, args);

      yield* changes.next();
    });
  }
});
