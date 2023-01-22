import { errorInvalidArgument } from './errors';

export const parseInputNumbers = (expectNumbersCount: number, input: string[]): number[] => {
    if (input.length !== expectNumbersCount) {
        throw errorInvalidArgument(`unexpected arguments count in ${JSON.stringify(input)}`);
    }
    const result: number[] = input.map((val) => {
        const n = Number(val);
        if (isNaN(n)) {
            throw errorInvalidArgument(`${JSON.stringify(val)} is not a number`);
        }
        return n;
    })
    return result;
}
