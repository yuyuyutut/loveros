import { state, update } from './state.js';
import { shell } from './ui.js';
import { LockPage } from './pages/lock.js';
import { HomePage } from './pages/home.js';
import { ChatPage } from './pages/chat.js';
import { CharacterPage } from './pages/character.js';
import { MemoryPage } from './pages/memory.js';
import { MomentsPage } from './pages/moments.js';
import { DiaryPage } from './pages/diary.js';
import { AssetsPage } from './pages/assets.js';
import { CalendarPage } from './pages/calendar.js';
import { SettingsPage } from './pages/settings.js';

const pages = { lock:LockPage, home:HomePage, chat:ChatPage, character:CharacterPage, memory:MemoryPage, moments:MomentsPage, diary:DiaryPage, assets:AssetsPage, calendar:CalendarPage, settings:SettingsPage };

export function go(route){ update({ route }); location.hash = route; }
export function render(){
  document.documentElement.dataset.theme = state.theme;
  document.getElementById('app').innerHTML = shell((pages[state.route] || HomePage)());
  bindGlobal();
}
function bindGlobal(){
  document.querySelectorAll('[data-go]').forEach(el => el.onclick = () => go(el.dataset.go));
  document.querySelectorAll('[data-action]').forEach(el => window.actions?.[el.dataset.action]?.(el));
}
window.addEventListener('hashchange', () => { const r = location.hash.slice(1); if(r && r !== state.route) update({route:r}); });
window.go = go;
