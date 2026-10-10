import { state, update } from '../state.js';
import { status, topbar, date, toast } from '../ui.js';
import { fetchWeather } from '../services/weather.js';
window.actions ??= {};
window.actions.refreshWeather = async () => { try{ update({weather:{status:'loading',text:'查询中…'}}, true); const w=await fetchWeather(); update({weather:{status:'ok',text:w.text,data:w}}); toast('天气已更新'); }catch(e){ update({weather:{status:'error',text:'天气获取失败'}}); toast('天气失败：'+e.message.slice(0,24)); } };
export function CalendarPage(){ return `<section class="screen">${status('<span class="pill">日历天气</span>')}${topbar('今天', date(state.now))}<div class="content"><div class="card"><h2 style="margin:0">☁️ ${state.weather.text}</h2><p class="muted">点击按钮会请求浏览器定位，并用 Open-Meteo 查询真实天气。</p><button class="btn primary" data-action="refreshWeather">刷新天气</button></div><div class="card"><b>纪念日</b><div class="memory-item">LoverOS 第一版开始：2026-10-10</div></div></div><div class="homebar"></div></section>`; }
