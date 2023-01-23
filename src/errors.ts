
const makeError = (message: string, ...other: string[]) =>
    new Error(`${message} ${other}`);

export const errorInvalidArgument = (context: string, ...other: string[]) =>
    makeError('invalid argument:', context, ...other);

export const errorUnknownCommand = (context: string, ...other: string[]) =>
    makeError('unknown command:', context, ...other);
