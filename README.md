# Valle Render Engine

In Develpment

```typescript
const WIDTH = 800;
const HEIGHT = 600;

const app = new Application({
    title: "Testing SDL Rect from DENO",
    width: WIDTH,
    height: HEIGHT
});

const rect = new Rect({
    width: 64,
    height: 64,
    position: {
        x: 0,
        y: 0
    },
    color: COLOR.GREEN
});

await app.draw(rect);
await app.run();
```
## Dependencies
[https://github.com/smack0007/sdl2-ts](https://github.com/smack0007/sdl2-ts)
