import { SDL } from "../../deps.ts";
import { Renderer } from "../Application/Renderer.ts";
import { RenderObject, RenderObjectSized } from "./mod.ts";
import { ImageOptions } from "./Object.ts";

export class Sprite extends RenderObjectSized {
    width: number = 0;
    height: number = 0;
    alpha: number = 255;

    surface: SDL.Surface | null;
    texture: SDL.Texture | null;

    constructor(options: ImageOptions){
        super();

        this.surface = SDL.LoadBMP(options.image);

        this.texture = SDL.CreateTextureFromSurface(
            this.renderer!.renderer,
            this.surface!
        );
    }
}