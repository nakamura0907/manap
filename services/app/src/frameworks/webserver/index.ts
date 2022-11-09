import "reflect-metadata";
import config from "@config/index";

const server = require("@frameworks/webserver/server");

// サーバーリッスン
const port = config.server.port;
server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
