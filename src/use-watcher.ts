import { type Stream, resource, stream } from "effection";
import { type FileChangeInfo, watch } from "node:fs/promises";

/**
 * Stream file changes every time something in a directory changes.
 */
export function useWatcher(dir: string): Stream<FileChangeInfo<string>, any> {
  return resource(function*(provide) {
    const ac = new AbortController();
    const { signal } = ac;
    try {
      const watcher = watch(dir, { signal });
      const subscription = yield* stream(watcher);
      yield* provide(subscription)
    } finally {
      ac.abort();
    }
  })
}
