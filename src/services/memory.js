export function extractMemory(text){
  const rules=[/我叫(.{1,12})/,/我喜欢(.{1,30})/,/我想做(.{1,40})/,/我要做(.{1,40})/,/记住(.{1,50})/];
  for(const r of rules){ const m=text.match(r); if(m) return '用户说：'+m[0]; }
  return '';
}
