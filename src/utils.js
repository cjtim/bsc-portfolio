import { createWriteStream } from "fs";
import http from "http";

function logFile(out) {
  const logFile = createWriteStream("/var/log/port.log", { flags: "a" });
  console.info(out);
  logFile.write(out+'\n');
  logFile.close()
}

/**
 *
 * @returns {http.Server}
 */
function startServer() {
  return http
    .createServer((req, res) => {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.write('{"status":"Working hard bro!"}');
      res.end();
    })
    .listen(process.env.PORT || 8080);
}
export { logFile, startServer };
