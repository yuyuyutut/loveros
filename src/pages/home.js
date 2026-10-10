import { state } from '../state.js';
import { status, avatar, daysSince } from '../ui.js';
import { exportBackup } from '../services/backup.js';
window.actions ??= {};
window.actions.exportBackup = exportBackup;
const icon = (emoji,label,route) => `<button class="appicon" data-go="${route}"><span>${emoji}</span><span>${label}</span></button>`;
export function HomePage(){
  const bg = state.character.wallpaper ? `style="background-image:linear-gradient(rgba(255,255,255,.25),rgba(255,255,255,.25)),url('${state.character.wallpaper}')"` : '';
  return `<section class="screen">${status(`<span class="pill">${state.weather.text}</span>`)}<div class="content" ${bg}><div class="hero"><div class="hero-row">${avatar()}<div class="grow"><div class="badge">LoverOS</div><h2>${state.character.name}</h2><div class="muted">${state.character.tagline}</div></div></div><div class="mood"><span class="pill">相处第 ${daysSince(state.createdAt)} 天</span><span class="pill">本地优先</span><span class="pill">开源前端</span></div></div><div class="grid">${icon('💌','聊天','chat')}${icon('🧸','角色','character')}${icon('🧠','记忆','memory')}${icon('🌷','动态','moments')}${icon('📔','日记','diary')}${icon('🖼️','素材','assets')}${icon('☁️','日历','calendar')}${icon('⚙️','设置','settings')}<button class="appicon" data-action="exportBackup"><span>📦</span><span>备份</span></button></div><div class="today-card"><b>今日小目标</b><br/>把前端做成真的：每个功能都能保存、能修改、能继续扩展。</div></div><div class="homebar"></div></section>`;
}
