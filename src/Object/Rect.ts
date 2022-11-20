import { RenderObject, RectOptions, NULL_RECT } from './Object.ts';
import { Color, COLOR } from '../Application/Application.ts';
import { SDL } from '../../deps.ts';
import { RenderObjectSized } from '../../mod.ts';

export class Rect extends RenderObjectSized {
    width: number;
    height: number;
    color: Color;
    rect: SDL.Rect;
    options: RectOptions;
    alpha: number = 255;

    constructor(options = NULL_RECT) {
        super();

        this.type = "Rect";
        this.width = options.width;
        this.height = options.height;
        this.color = options.color;
        this.position = options.position;

        this.rect = new SDL.Rect(
            this.position.x,
            this.position.y,
            this.width,
            this.height
        );

        this.options = options;
    }
}