import { state, hydrate, subscribe, update } from './state.js';
import { render } from './router.js';

hydrate();
subscribe(render);
setInterval(() => update({ now: Date.now() }, false), 20000);
render();

window.LoverOS = { state, update };
