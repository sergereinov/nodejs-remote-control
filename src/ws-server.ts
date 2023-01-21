import WebSocket, { WebSocketServer, createWebSocketStream } from 'ws';
import * as commands from './commands';
import stream from 'node:stream';

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
export const run = (port: number): void => {
    const wsServer = new WebSocketServer({ port: port });
    wsServer.on('connection', async (ws) => {

        const duplex = createTextWebSocketStream(ws);

        for await (const message of duplex) {
            console.log('<-', message);
            commands
                .execute(message)
                .then((answer) => {

                    if (answer) {
                        console.log('->', answer);
                        duplex.write(answer);
                    } else {
                        console.log(`silently done '${message}'`);
                    }
                });
        }
    });
};
