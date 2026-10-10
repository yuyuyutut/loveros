import { state, activeChat } from '../state.js';
function messages(){
  const sys = `${state.character.persona}\n\n核心记忆：${state.coreMemory}\n\n长期记忆：\n${state.memories.slice(0,30).map(m=>'- '+m.text).join('\n')}`;
  return [{role:'system',content:sys}, ...activeChat().messages.slice(-Number(state.settings.contextTurns||24)).map(m=>({role:m.role==='assistant'?'assistant':'user',content:m.content}))];
}
export async function sendToModel(){
  const s=state.settings; if(!s.apiBase||!s.apiKey||!s.model) throw new Error('未配置在线模型');
  const res=await fetch(s.apiBase.replace(/\/$/,'')+'/chat/completions',{method:'POST',headers:{'Content-Type':'application/json','Authorization':'Bearer '+s.apiKey},body:JSON.stringify({model:s.model,messages:messages(),temperature:Number(s.temperature||0.8)})});
  if(!res.ok) throw new Error(res.status+' '+await res.text());
  const data=await res.json(); return data.choices?.[0]?.message?.content || '我在，但模型没有返回内容。';
}
export async function testModel(){
  const s=state.settings; if(!s.apiBase||!s.apiKey||!s.model) throw new Error('请先填完整模型配置');
  const res=await fetch(s.apiBase.replace(/\/$/,'')+'/chat/completions',{method:'POST',headers:{'Content-Type':'application/json','Authorization':'Bearer '+s.apiKey},body:JSON.stringify({model:s.model,messages:[{role:'user',content:'请只回复：连接成功'}],temperature:0})});
  if(!res.ok) throw new Error(res.status+' '+await res.text());
  const data=await res.json(); return data.choices?.[0]?.message?.content || '连接成功';
}
