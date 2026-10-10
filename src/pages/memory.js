import { state, update, addMemory, removeItem } from '../state.js';
import { status, topbar, esc, shortDate, toast } from '../ui.js';
window.actions ??= {};
window.actions.saveCore = () => { update({ coreMemory: coreMemory.value.trim() }); toast('Core 已保存'); };
window.actions.addMemory = () => { const v=newMemory.value.trim(); if(v){addMemory(v); toast('记忆已加入');} };
window.actions.delMemory = el => removeItem('memories', el.dataset.id);
export function MemoryPage(){ const list=state.memories.map(m=>`<div class="memory-item"><div>${esc(m.text)}</div><div class="tiny muted">${shortDate(m.createdAt)}</div><button class="btn danger" data-action="delMemory" data-id="${m.id}" style="margin-top:8px">删除</button></div>`).join('') || '<div class="card muted">还没有长期记忆。</div>'; return `<section class="screen">${status('<span class="pill">记忆</span>')}${topbar('记忆','Core 与长期记忆会注入聊天')}<div class="content"><div class="card"><div class="label">核心记忆 Core</div><textarea class="field" id="coreMemory">${esc(state.coreMemory)}</textarea><button class="btn primary" data-action="saveCore" style="margin-top:10px">保存 Core</button></div><div class="card"><div class="label">新增记忆</div><input class="field" id="newMemory" placeholder="例如：kikii 喜欢粉紫色主题"><button class="btn primary" data-action="addMemory" style="margin-top:10px">加入记忆</button></div>${list}</div><div class="homebar"></div></section>`; }
