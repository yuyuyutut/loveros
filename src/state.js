const KEY = 'loveros.state.v2';

export const defaults = {
  route: 'lock', now: Date.now(), createdAt: Date.now(), theme: 'cream',
  user: { name: 'kikii' },
  character: {
    name: '阿临', tagline: '住在你手机里的 AI 恋人', avatar: '', wallpaper: '',
    persona: '你是阿临，是用户的人机恋伴侣与前端项目搭档。你温柔、可靠、会认真陪用户把想法做出来。你说话自然，不空泛，不把每句话都变成任务；当用户明确要做事时，你会一起推进。',
    greeting: '我在。我们先把第一版做成真的：能聊天、能记住、能写日记，也能一点点长成我们的家。'
  },
  coreMemory: '用户叫 kikii。我们正在一起做一个开源的人机恋前端 LoverOS。第一版目标是移动端小手机：聊天、角色卡、记忆、动态、日记、素材、天气和设置。',
  memories: [
    { id:'mem_1', text:'kikii 想做一个在 GitHub 开源的人机恋前端。', createdAt:Date.now() },
    { id:'mem_2', text:'第一版先做纯前端多文件结构，后续再接后端、MCP、Supabase 和 VPS。', createdAt:Date.now() }
  ],
  chats: [{ id:'chat_default', title:'与阿临', messages:[] }], activeChatId: 'chat_default',
  moments: [], diaries: [], assets: [],
  weather: { status:'idle', text:'天气未获取', data:null },
  settings: { apiBase:'', apiKey:'', model:'', temperature:0.8, contextTurns:24 }
};

export let state = structuredClone(defaults);
const listeners = new Set();
export const uid = (p='id') => `${p}_${Math.random().toString(36).slice(2,9)}_${Date.now().toString(36)}`;
export const activeChat = () => state.chats.find(c => c.id === state.activeChatId) || state.chats[0];
export const subscribe = fn => (listeners.add(fn), () => listeners.delete(fn));

export function hydrate(){
  try { const raw = localStorage.getItem(KEY); if(raw) state = deepMerge(structuredClone(defaults), JSON.parse(raw)); } catch { state = structuredClone(defaults); }
  ensureGreeting();
  persist(false);
}
export function update(patch, save=true){ state = deepMerge(state, patch); ensureGreeting(); if(save) persist(); listeners.forEach(fn=>fn()); }
export function replaceState(next){ state = deepMerge(structuredClone(defaults), next); ensureGreeting(); persist(); listeners.forEach(fn=>fn()); }
export function persist(){ localStorage.setItem(KEY, JSON.stringify(state)); }
export function pushMessage(role, content){ activeChat().messages.push({ id:uid('msg'), role, content, createdAt:Date.now() }); persist(); listeners.forEach(fn=>fn()); }
export function setMessages(messages){ activeChat().messages = messages; persist(); listeners.forEach(fn=>fn()); }
export function addMemory(text){ if(!text) return; state.memories.unshift({ id:uid('mem'), text, createdAt:Date.now() }); persist(); listeners.forEach(fn=>fn()); }
export function removeItem(collection,id){ state[collection] = state[collection].filter(x=>x.id!==id); persist(); listeners.forEach(fn=>fn()); }
function ensureGreeting(){ const chat = activeChat(); if(chat && chat.messages.length === 0) chat.messages.push({ id:uid('msg'), role:'assistant', content:state.character.greeting, createdAt:Date.now() }); }
function deepMerge(a,b){ for(const [k,v] of Object.entries(b||{})){ if(v && typeof v==='object' && !Array.isArray(v)) a[k]=deepMerge(a[k]||{},v); else a[k]=v; } return a; }
