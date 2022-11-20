import { Event } from "./Event.ts";
import { Application } from "../Application/mod.ts";

export class MouseEvent extends Event {
    readonly x: number;
    readonly y: number;
    constructor(type: string, app: Application, x: number, y: number) {
        super(app, type);
        this.x = x;
        this.y = y;
    }
}