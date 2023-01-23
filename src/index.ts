import { httpServer as HttpServer } from './http-server';
import * as WsServer from './ws-server';
import * as ctrl_c from './ctrl-c';

// Ports config
const HTTP_PORT = 8181;
const WS_PORT = 8080;

// Run HTTP & WebSocket servers

console.log(`Start static http server at `, { host: `http://localhost:${HTTP_PORT}` });
const httpServer = HttpServer.listen(HTTP_PORT);

console.log('Start websocket server on the', WS_PORT, 'port!');
const wsServer = WsServer.run(WS_PORT);

/**
 * Convert EventEmitter's close event to Promise
 */
const waitClose: (e: NodeJS.EventEmitter) => Promise<void> = (e) =>
    new Promise((resolve, reject) => {
        e.on('close', resolve);
        e.on('error', reject);
    });

// Setup CTRL-C handler
ctrl_c.setHandler(async () => {
    console.log('Stopping the servers:');

    //emergency exit after 5.. 4.. 3.. 2.. 1..
    setTimeout(() => {
        console.log('!!! killed by timer');
        process.nextTick(process.exit);
    }, 5000);

    const pendingClosers: Promise<void>[] = [
        waitClose(httpServer),
        waitClose(wsServer)
    ];

    //close http listener
    console.log(' ! stopping http server', httpServer.address());
    httpServer.close(() => {
        console.log('(v) Http server stopped.');
    });

    //close websocket listener
    console.log(' ! stopping websocket server', wsServer.address());
    wsServer.close(() => {
        console.log('(v) Websocket server stopped.');
    });

    //initiate closing all clients
    wsServer.clients.forEach((ws) => {
        const peer = {
            remote_host: ws['_socket']?.remoteAddress,
            remote_port: ws['_socket']?.remotePort
        };
        console.log(' ! closing ws-client', peer);
        ws.close();

        //it would be nice to wait until the close actually starts.
        pendingClosers.push(waitClose(ws));
    });

    //wait all pending events
    Promise.all(pendingClosers).then(() => {
        console.log('(v) All pending closed.');
        process.nextTick(process.exit);
    });
});
