import * as nutjs from '@nut-tree/nut-js';
import Jimp from 'jimp';
import { Action } from './action';

export const getPartOfScreen: Action = async () => {
    const { x: centerX, y: centerY } = await nutjs.mouse.getPosition();
    const side = 200;

    const screenWidth = await nutjs.screen.width();
    const screenHeight = await nutjs.screen.height();

    let left = Math.max(centerX - side / 2, 0);
    let top = Math.max(centerY - side / 2, 0);
    const right = Math.min(left + side, screenWidth);
    const bottom = Math.min(top + side, screenHeight);
    left = Math.max(right - side, 0);
    top = Math.max(bottom - side, 0);

    const img = await nutjs.screen.grabRegion(new nutjs.Region(
        left,
        top,
        right - left,
        bottom - top
    )).then((img) => img.toRGB());

    const width = img.width / img.pixelDensity.scaleX
    const height = img.height / img.pixelDensity.scaleY;

    const jImg = new Jimp({ data: img.data, width: width, height: height });
    const pngBuffer = await jImg.getBufferAsync(Jimp.MIME_PNG);

    return 'prnt_scrn ' + pngBuffer.toString('base64');
};
