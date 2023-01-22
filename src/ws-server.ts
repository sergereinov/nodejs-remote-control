import stream from 'node:stream';
import WebSocket, { WebSocketServer, createWebSocketStream } from 'ws';
import * as commands from './commands';

/**
 * Creates a duplex stream from the web socket
 * and sets the encoding to utf-8 for both reading and writing.
 */
const createTextWebSocketStream = (websocket: WebSocket.WebSocket, options?: stream.DuplexOptions): stream.Duplex => {
    const readableOptions: stream.ReadableOptions = { encoding: 'utf8' };
    const writableOptions: stream.WritableOptions = { decodeStrings: false };
    const duplexOptions: stream.DuplexOptions = { ...readableOptions, ...writableOptions, ...options };
    return createWebSocketStream(websocket, duplexOptions);
}

/**
 * Runs the web socket server on given port
 */
export const run = (port: number): WebSocket.Server<WebSocket.WebSocket> =>
    new WebSocketServer({ port: port, clientTracking: true })
        .on('connection', async (ws, req) => {
            
            const addr = req.socket.remoteAddress;
            const port = req.socket.remotePort;
            console.log('connected ws-client, remote:', { host: addr, port: port });

            const duplex = createTextWebSocketStream(ws);

            for await (const message of duplex) {
                console.log('<-', message);
                commands
                    .execute(message)
                    .then((answer) => {
                        if (answer) {
                            console.log('->', answer);
                            duplex.write(answer);
                        }
                    })
                    .catch((e) => {
                        console.log(`failed to execute '${message}',`, e.message);
                    });
            }
        });
