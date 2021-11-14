import { createWriteStream } from "fs";
import http from "http";

function logFile(out) {
  const DefaultLog = "/var/log/port.log";
  const AlternativeLog = "./port.log";
  let defaultLog = createWriteStream(DefaultLog, { flags: "a" });
  defaultLog.on("open", () => {
    console.info(out);
    defaultLog.write(out + "\n");
    defaultLog.close();
  });
  defaultLog.on("error", (e) => {
    const alter = createWriteStream(AlternativeLog, { flags: "a" });
    console.info(out);
    alter.write(out + "\n");
    alter.close();
  });
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
