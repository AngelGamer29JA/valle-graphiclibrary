import { BoxedPointer, SDL } from "../../deps.ts";
import { RenderObject } from "../Object/Object.ts";
import { Color } from "./Application.ts";
import { Renderer } from "./Renderer.ts";

export class RenderContext {
    readonly renderer: Renderer;
    #_clearColorRenderContext: Color = Color(255,255,255);

    constructor(renderer: Renderer) {
        this.renderer = renderer;
    }

    async draw(object: RenderObject) {
        await this.renderer.setObject(object);
    }

    get clearColor() {
        return this.#_clearColorRenderContext;
    }

    set clearColor(color: Color) {
        this.#_clearColorRenderContext= color;
    } 
}