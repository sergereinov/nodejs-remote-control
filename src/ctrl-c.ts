var currentHandler: (signal: NodeJS.Signals) => void = () => { }

const oneTimeHandler: (signal: NodeJS.Signals) => void = (signal) => {
    currentHandler(signal);
    currentHandler = () => { } //reset one-time handler
}

export const setHandler = (handler: (signal: NodeJS.Signals) => void) => {
    currentHandler = handler;
}

process.on('SIGHUP', oneTimeHandler); // terminal lost
process.on('SIGINT', oneTimeHandler); // ctrl-c
process.on('SIGQUIT', oneTimeHandler); // quit signal
process.on('SIGTERM', oneTimeHandler); // kill signal
