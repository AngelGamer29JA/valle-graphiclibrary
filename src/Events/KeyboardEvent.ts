import { Application } from "../Application/mod.ts";
import { Event } from "./Event.ts";

export class KeyboardEvent extends Event {
    readonly key: string;
    readonly keyCode: number;
    pressed = false;

    constructor(type: string, code: number, app: Application, evtType: string) {
        super(app, evtType)
        this.key = type;
        this.keyCode = code;
    }
}