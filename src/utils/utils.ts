import { KeyboardEvent } from "../Events/KeyboardEvent.ts";

export function isKeyPressed(value:  KeyboardEvent[], key: string): KeyboardEvent | null {
    for (const k of value) {
        if (k.key === key) {
            if (k.pressed === true) {
                return k;
            }
        }
    }
    return null;
}