import { BoxedPointer, SDL, v5 } from '../../deps.ts';
import { RenderObject, Rect } from '../Object/mod.ts';

export class Renderer {
    readonly objects = new Map<string, RenderObject>;
    readonly renderer: SDL.Renderer

    constructor(renderer: SDL.Renderer) {
        this.renderer = renderer;
    }

    render() {
        const _objs = this.objects;
        for (let [key, object] of _objs) {
            if (object.type = "Rect") {
                const _object = (object as Rect);
                const _color = _object.color;
                const _rect = _object.rect;

                _rect.x = object.position.x;
                _rect.y = object.position.y;
                _rect.w = _object.width;
                _rect.h = _object.height;

                SDL.SetRenderDrawColor(this.renderer, _color[0], _color[1], _color[2], _object.alpha);
                SDL.RenderDrawRect(this.renderer, _rect);
                SDL.RenderFillRect(this.renderer, _rect);
            }
        }
    }

    async setObject(obj: RenderObject) {
        const _Key = btoa(`Renderer;ri=${this.objects.size};k=${Math.random() * 0x999999};o=Obj{pos=${obj.position}};`);
        const _uuid = await v5.generate("6ba7b814-9dad-11d1-80b4-00c04fd430c8", new TextEncoder().encode(_Key));
        if (obj.id === undefined) obj.id = _uuid;
        this.objects.set(_uuid, obj);
    }

}