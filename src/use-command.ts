import { Operation, resource } from "effection";
import { ChildProcess, spawn as createChildProcess } from "child_process";

export function useCommand(cmd: string, args: string[]): Operation<ChildProcess> {
  return resource(function*(provide) {
    const proc = createChildProcess(cmd, args, {
      stdio: "inherit",
    });

    try {
      yield* provide(proc);
    } finally {
      proc.kill("SIGINT");
    }
  });
}
