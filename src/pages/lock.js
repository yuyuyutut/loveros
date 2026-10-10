import { state } from '../state.js';
import { status, time, date, avatar } from '../ui.js';
export function LockPage(){ return `<section class="screen lock-screen">${status()}<div class="lock-center"><div class="lock-time">${time(state.now)}</div><div class="lock-date">${date(state.now)}</div>${avatar(state.character,'big')}<button class="unlock" data-go="home">上滑回到 TA 身边</button></div><div class="homebar"></div></section>`; }
