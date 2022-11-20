import { MouseEvent, KeyboardEvent, CloseEvent, ErrorEvent, Event } from "./mod.ts";

export type ApplicationEvents = {
	keypress: [KeyboardEvent]
	keyup: [KeyboardEvent]
	close: [CloseEvent]
	error: [ErrorEvent]
	mousemove: [MouseEvent]
	update: [Event]
	resize: [Event]
	run: [Event]
	quit: [CloseEvent]
	focus: [Event]
	unfocus: [Event]
	maximized: [Event]
	mouseleave: [MouseEvent]
	mouseenter: [MouseEvent]
}