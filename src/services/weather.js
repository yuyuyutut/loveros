export async function fetchWeather(){
  const pos = await new Promise((resolve,reject)=>navigator.geolocation ? navigator.geolocation.getCurrentPosition(resolve,reject,{timeout:9000}) : reject(new Error('浏览器不支持定位')));
  const { latitude, longitude } = pos.coords;
  const res=await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weather_code&timezone=auto`);
  if(!res.ok) throw new Error('天气接口失败');
  const data=await res.json(); const temp=Math.round(data.current.temperature_2m);
  return { latitude, longitude, temp, code:data.current.weather_code, text:`${name(data.current.weather_code)} · ${temp}℃`, raw:data };
}
function name(code){ if(code===0)return'晴'; if([1,2,3].includes(code))return'多云'; if([45,48].includes(code))return'雾'; if(code>=51&&code<=67)return'雨'; if(code>=71&&code<=77)return'雪'; if(code>=80&&code<=82)return'阵雨'; if(code>=95)return'雷雨'; return'天气'; }
