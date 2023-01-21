import { Action } from './action';
import * as mouse from './mouse';
import * as figures from './figures';
import * as printScreen from './print-screen';

/**
 * Executes the input command
 * @param input line with arguments, like `draw_rectangle 100 100`
 * @returns Promise with string result or null
 */
export const execute = async (input: string): Promise<string | null> => {
    const [cmd, ...args] = input.split(' ');
    if (cmd in commands) {
        const action = commands[cmd];
        return action(args);
    }
    return null;
}

const commands: { [key: string]: Action; } = {
    'mouse_up': mouse.up,
    'mouse_down': mouse.down,
    'mouse_left': mouse.left,
    'mouse_right': mouse.right,
    'mouse_position': mouse.getPosition,
    'draw_circle': figures.drawCircle,
    'draw_rectangle': figures.drawRectangle,
    'draw_square': figures.drawSquare,
    'prnt_scrn': printScreen.getPartOfScreen
};
