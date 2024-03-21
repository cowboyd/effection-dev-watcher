import { action, resource } from "effection";
import { createServer } from "http";
import { AddressInfo } from "net";

export function useServer(message: string) {
  return resource<AddressInfo>(function*(provide) {
    const server = createServer((req, res) => {
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end(message);
    });

    yield* action<void>(function*(resolve) {
      server.listen(resolve)
    });

    try {
      yield* provide(server.address() as AddressInfo);
    } finally {
      yield* action<void>(function*(resolve, reject) {
	server.close((err) => {
	  if (err) {
	    reject(err);
	  } else {
	    resolve();
	  }
	});
      })
    }
  });
}
