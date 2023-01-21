import { httpServer } from "./http-server";
import * as wsServer from './ws-server';

const HTTP_PORT = 8181;
const WS_PORT = 8080;

console.log('Start static http server on the', HTTP_PORT, 'port!');
httpServer.listen(HTTP_PORT);

console.log('Start websocket server on the', WS_PORT, 'port!');
wsServer.run(WS_PORT);
