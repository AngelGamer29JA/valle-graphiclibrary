import { Application } from "../Application/mod.ts";
import { Event } from "./Event.ts";

export class ErrorEvent extends Event {
    readonly message: string;

    constructor(app: Application, message: string){
        super(app, "error");
        this.message = message;
    }
}