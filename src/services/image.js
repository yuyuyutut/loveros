export async function compressImage(file, maxSize=1200, quality=.82){
  const dataUrl = await new Promise((resolve,reject)=>{const r=new FileReader();r.onload=()=>resolve(r.result);r.onerror=reject;r.readAsDataURL(file);});
  const img = await new Promise((resolve,reject)=>{const i=new Image();i.onload=()=>resolve(i);i.onerror=reject;i.src=dataUrl;});
  const ratio=Math.min(1,maxSize/Math.max(img.width,img.height));
  const canvas=document.createElement('canvas'); canvas.width=Math.round(img.width*ratio); canvas.height=Math.round(img.height*ratio);
  canvas.getContext('2d').drawImage(img,0,0,canvas.width,canvas.height);
  return canvas.toDataURL('image/jpeg',quality);
}
