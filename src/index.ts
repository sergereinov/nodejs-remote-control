import { httpServer as HttpServer } from './http-server';
import * as WsServer from './ws-server';
import * as ctrl_c from './ctrl-c';

const HTTP_PORT = 8181;
const WS_PORT = 8080;

console.log('Start static http server on the', HTTP_PORT, 'port!');
const httpServer = HttpServer.listen(HTTP_PORT);

console.log('Start websocket server on the', WS_PORT, 'port!');
const wsServer = WsServer.run(WS_PORT);

ctrl_c.setHandler(() => {
    console.log('Stopping the servers...')

    //just close http listener
    console.log('Stop http listener', httpServer.address());
    httpServer.close();

    //initiate closing the websocket server
    console.log('Stop websocket server', wsServer.address());
    wsServer.close(() => {
        console.log('Stopped websocket server.');
        process.nextTick(() => {
            process.exit();
        });
    });

    //initiate closing all clients
    wsServer.clients.forEach((ws) => {
        const addr = ws['_socket']?.remoteAddress;
        const port = ws['_socket']?.remotePort;
        console.log(' * closing ws-client, remote:', { host: addr, port: port });
        ws.close();
    });
});
