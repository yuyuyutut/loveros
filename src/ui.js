import { state } from './state.js';
export const esc = s => String(s??'').replace(/[&<>\"]/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;'}[m]));
export const br = s => esc(s).replace(/\n/g,'<br>');
export const time = (ts=Date.now()) => new Date(ts).toLocaleTimeString('zh-CN',{hour:'2-digit',minute:'2-digit'});
export const date = (ts=Date.now()) => new Date(ts).toLocaleDateString('zh-CN',{year:'numeric',month:'long',day:'numeric',weekday:'long'});
export const shortDate = ts => new Date(ts).toLocaleDateString('zh-CN');
export const daysSince = ts => Math.max(1, Math.ceil((Date.now()-ts)/86400000));
export function shell(content){ return `<div class="ambient"></div><main class="app"><div class="phone">${content}<div class="toast" id="toast"></div></div></main>`; }
export function status(right='<span class="pill">5G · 35%</span>'){ return `<div class="status"><span>${time(state.now)}</span><span>${right}</span></div>`; }
export function topbar(title, subtitle='', right=''){ return `<div class="topbar"><button class="back" data-go="home">‹</button><div><div class="title">${esc(title)}</div><div class="subtitle">${esc(subtitle)}</div></div><div class="grow"></div>${right}</div>`; }
export function avatar(c=state.character, cls=''){ const inner = c.avatar ? `<img src="${c.avatar}">` : esc(c.name?.[0] || '恋'); return `<div class="avatar ${cls}">${inner}</div>`; }
export function toast(text='已保存'){ const el=document.getElementById('toast'); if(!el)return; el.textContent=text; el.classList.add('show'); setTimeout(()=>el.classList.remove('show'),1500); }
window.toast = toast;
