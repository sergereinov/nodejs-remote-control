import * as nutjs from '@nut-tree/nut-js';
import Jimp from 'jimp';
import { Action } from './action';

export const getPartOfScreen: Action = async () => {
    const { x: centerX, y: centerY } = await nutjs.mouse.getPosition();
    const side = 200;

    const img = await nutjs.screen.grabRegion(new nutjs.Region(
        centerX - side / 2,
        centerY - side / 2,
        side,
        side
    )).then((img) => img.toRGB());

    const width = img.width / img.pixelDensity.scaleX
    const height = img.height / img.pixelDensity.scaleY;

    const jImg = new Jimp({ data: img.data, width: width, height: height });
    const pngBuffer = await jImg.getBufferAsync(Jimp.MIME_PNG);

    return 'prnt_scrn ' + pngBuffer.toString('base64');
};
