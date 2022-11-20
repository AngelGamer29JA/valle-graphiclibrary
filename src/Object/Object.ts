import { Application, COLOR, Color } from "../Application/mod.ts";

export type EntityPosition = {
    x: number,
    y: number
}

export const NULL_RECT: RectOptions = {
    width: 0,
    height: 0,
    position: { x: 0, y: 0 },
    color: COLOR.BLACK
}

export abstract class RenderObject {
    position: EntityPosition = {x: 0, y: 0};
    // id: string = "";
    type: string = "RenderObject";
    id?: string;
    app?: Application

    private angle: number = 0;

    setPosition(pos: {x?: number, y?: number}) {
        pos.x = pos.x != null ? pos.x : this.position.x;
        pos.y = pos.y != null ? pos.y : this.position.y;

        this.position = pos as EntityPosition;
    }

    rotate(angle: number): void {
        this.angle = angle;
    }

    get renderer() {
        return this.app?.renderer;
    }
}

export abstract class RenderObjectSized extends RenderObject {
    width: number = 0;
    height: number = 0;
    alpha: number = 255;

    setSize(w: number, h: number): void {
        this.width = w;
        this.height = h;
    }
}

export interface CollisionObject {
    collision: RenderObject[];
}

export type ColorizedObject = {
    color: Color,
    strokeColor?: Color
}

export type RenderObjectOptions = {
    width: number,
    height: number,
    position: {
        x: number,
        y: number
    },
    id?: string
}

export type ImageOptions = RenderObjectOptions & {
    image: string
} 

export type RectOptions = ColorizedObject & RenderObjectOptions
