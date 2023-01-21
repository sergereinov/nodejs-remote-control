
const makeError = (message: string, ...other: string[]) =>
    new Error(`${message} ${other}`);

export const errorInvalidArgument = (context: string, ...other: string[]) =>
    makeError('invalid argument:', context, ...other);