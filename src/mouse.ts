import * as nutjs from "@nut-tree/nut-js";
import { Action } from './action';
import { errorInvalidArgument } from "./errors";

const parseInputNumbers = (expectNumbersCount: number, input: string[]): number[] => {
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

export const up: Action = async (args) => {
    const [offset] = parseInputNumbers(1, args);
    await nutjs.mouse.move(nutjs.up(offset));
    return null;
};

export const down: Action = async (args) => {
    const [offset] = parseInputNumbers(1, args);
    await nutjs.mouse.move(await nutjs.down(offset));
    return null;
};

export const left: Action = async (args) => {
    const [offset] = parseInputNumbers(1, args);
    await nutjs.mouse.move(nutjs.left(offset));
    return null;
};

export const right: Action = async (args) => {
    const [offset] = parseInputNumbers(1, args);
    await nutjs.mouse.move(nutjs.right(offset));
    return null;
};

export const getPosition: Action = async (args) => {
    const { x, y } = await nutjs.mouse.getPosition();
    return `mouse_position ${x},${y}`;
};
