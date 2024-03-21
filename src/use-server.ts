import { action, resource } from "effection";
import { createServer } from "http";
import { AddressInfo } from "net";

export function useServer(message: string, port?: number) {
  return resource<AddressInfo>(function*(provide) {
    // create server to echo message
    const server = createServer((req, res) => {
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end(message);
    });

    // wait until server is listening
    yield* action<void>(function*(resolve) {
      server.listen(port, resolve)
    });

    try {
      // provide the address info to the user of the resource
      yield* provide(server.address() as AddressInfo);
    } finally {
      // close the server, but only continue until it is
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
