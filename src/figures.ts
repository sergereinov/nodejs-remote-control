import * as nutjs from '@nut-tree/nut-js';
import { Action } from './action';
import { parseInputNumbers } from './args-utils';

export const drawCircle: Action = async (args) => {
    const [radius] = parseInputNumbers(1, args);
    const { x: startX, y: startY } = await nutjs.mouse.getPosition();
    const center: { x: number, y: number } = {
        x: startX,
        y: startY + radius
    };

    const startAngle = Math.PI / 2;
    const step = 2 * Math.PI / 36; // 360/36 = by 10 degrees
    const points: nutjs.Point[] = [];
    for (var a = 0; a < 2 * Math.PI; a += step) {
        const angle = startAngle - a; //clockwise
        const x = center.x + radius * Math.cos(angle);
        const y = center.y - radius * Math.sin(angle);
        points.push(new nutjs.Point(x, y));
    }

    // Draw circle    
    await nutjs.mouse.pressButton(nutjs.Button.LEFT);
    for (const pt of points) {
        await nutjs.mouse.move(nutjs.straightTo(pt)); //draw segments
    }
    await nutjs.mouse.move(nutjs.straightTo(new nutjs.Point(startX, startY))); //back to start position
    await nutjs.mouse.releaseButton(nutjs.Button.LEFT);

    return null;
};

export const drawRectangle: Action = async (args) => {
    const [width, height] = parseInputNumbers(2, args);
    await nutjs.mouse.pressButton(nutjs.Button.LEFT);
    await nutjs.mouse.move(nutjs.right(width));
    await nutjs.mouse.move(nutjs.down(height));
    await nutjs.mouse.move(nutjs.left(width));
    await nutjs.mouse.move(nutjs.up(height));
    await nutjs.mouse.releaseButton(nutjs.Button.LEFT);
    return null;
};

export const drawSquare: Action = async (args) => {
    const [side] = parseInputNumbers(1, args);
    await nutjs.mouse.pressButton(nutjs.Button.LEFT);
    await nutjs.mouse.move(nutjs.right(side));
    await nutjs.mouse.move(nutjs.down(side));
    await nutjs.mouse.move(nutjs.left(side));
    await nutjs.mouse.move(nutjs.up(side));
    await nutjs.mouse.releaseButton(nutjs.Button.LEFT);
    return null;
};
