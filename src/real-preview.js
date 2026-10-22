const imageCache=new Map();
export function loadImage(src){
 if(imageCache.size>18)imageCache.delete(imageCache.keys().next().value);
 if(!imageCache.has(src))imageCache.set(src,new Promise((resolve,reject)=>{const image=new Image();image.onload=()=>resolve(image);image.onerror=()=>{imageCache.delete(src);reject(new Error(`Image unavailable: ${src}`));};image.src=src;}));
 return imageCache.get(src);
}
const photoCache=new Map(),frameCache=new Map();
function clearLensInterior(ctx,w,h,cx){
 const image=ctx.getImageData(0,0,w,h),data=image.data,seen=new Uint8Array(w*h),queue=new Int32Array(w*h);let start=Math.round(h*.53)*w+Math.round(w*cx);
 if(data[start*4+3]>30)return;
 let head=0,tail=1;queue[0]=start;seen[start]=1;const left=new Int32Array(h).fill(w),right=new Int32Array(h).fill(-1);
 while(head<tail){const k=queue[head++],x=k%w,y=Math.floor(k/w);left[y]=Math.min(left[y],x);right[y]=Math.max(right[y],x);for(const n of [k-1,k+1,k-w,k+w])if(n>=0&&n<w*h&&!seen[n]&&Math.abs(n%w-x)<=1&&data[n*4+3]<30){seen[n]=1;queue[tail++]=n;}}
 if(tail<w*h*.02||tail>w*h*.4)return;
 const points=[];for(let y=0;y<h;y++)if(right[y]>=0){points.push([left[y],y],[right[y],y]);}points.sort((a,b)=>a[0]-b[0]||a[1]-b[1]);
 const cross=(a,b,c)=>(b[0]-a[0])*(c[1]-a[1])-(b[1]-a[1])*(c[0]-a[0]),lower=[],upper=[];
 for(const p of points){while(lower.length>=2&&cross(lower.at(-2),lower.at(-1),p)<=0)lower.pop();lower.push(p);}for(const p of points.toReversed()){while(upper.length>=2&&cross(upper.at(-2),upper.at(-1),p)<=0)upper.pop();upper.push(p);}const hull=lower.slice(0,-1).concat(upper.slice(0,-1));
 ctx.save();ctx.globalCompositeOperation='destination-out';ctx.fillStyle='#000';ctx.beginPath();hull.forEach(([x,y],i)=>i?ctx.lineTo(x,y):ctx.moveTo(x,y));ctx.closePath();ctx.fill();ctx.restore();return hull;
}
function makeCanvas(width=800,height=1000){const c=document.createElement('canvas');c.width=width;c.height=height;return c;}
function faceMask(){
 const c=makeCanvas(),x=c.getContext('2d');x.filter='blur(5px)';x.fillStyle='white';x.beginPath();x.moveTo(281,329);x.bezierCurveTo(370,319,480,332,574,372);x.bezierCurveTo(612,427,620,476,614,535);x.bezierCurveTo(606,621,563,691,499,724);x.bezierCurveTo(441,754,391,738,342,704);x.bezierCurveTo(272,656,234,588,232,518);x.bezierCurveTo(229,437,247,364,281,329);x.fill();return c;
}
function gradients(ctx){const pixels=ctx.getImageData(0,0,160,200).data,out=new Float32Array(160*200);for(let y=1;y<199;y++)for(let x=1;x<159;x++){const k=y*160+x,lum=i=>(pixels[i*4]+pixels[i*4+1]*2+pixels[i*4+2])/4;out[k]=Math.abs(lum(k+1)-lum(k-1))+Math.abs(lum(k+160)-lum(k-160));}return out;}
function alignToOriginal(original,edited){
 const a=makeCanvas(160,200),b=makeCanvas(160,200),ac=a.getContext('2d',{willReadFrequently:true}),bc=b.getContext('2d',{willReadFrequently:true});ac.drawImage(original,0,0,160,200);bc.drawImage(edited,0,0,160,200);
 const ga=gradients(ac),gb=gradients(bc),samples=[];for(let y=77;y<143;y+=2)for(let x=52;x<115;x+=2){const k=y*160+x;if(ga[k]>8)samples.push([x,y,ga[k]]);}
 let best={score:-Infinity,scale:1,dx:0,dy:0};
 for(let si=-5;si<=5;si++){const scale=1+si*.01;for(let dy=-5;dy<=5;dy++)for(let dx=-5;dx<=5;dx++){let dot=0,aa=0,bb=0;for(const[x,y,v]of samples){const bx=Math.round((x-80-dx)/scale+80),by=Math.round((y-100-dy)/scale+100),w=gb[by*160+bx]||0;dot+=v*w;aa+=v*v;bb+=w*w;}const score=dot/Math.sqrt(aa*bb||1)-Math.abs(si)*.0002;if(score>best.score)best={score,scale,dx:dx*5,dy:dy*5};}}
 return best;
}
async function preservedPhoto(hair){
 if(photoCache.has(hair.id))return photoCache.get(hair.id);
 if(photoCache.size>8)photoCache.delete(photoCache.keys().next().value);
 const result=(async()=>{
  const original=await loadImage('/assets/original.jpg'),c=makeCanvas(),ctx=c.getContext('2d',{willReadFrequently:true});ctx.drawImage(original,0,0,800,1000);if(hair.id==='natural')return c;
  const edited=await loadImage(`/assets/real/${hair.id}.jpg`),alignment=alignToOriginal(original,edited);ctx.save();ctx.translate(400+alignment.dx,500+alignment.dy);ctx.scale(alignment.scale,alignment.scale);ctx.drawImage(edited,-400,-500,800,1000);ctx.restore();
  const originalCanvas=makeCanvas(),oc=originalCanvas.getContext('2d',{willReadFrequently:true});oc.drawImage(original,0,0,800,1000);
  const samples=[[350,500],[480,540],[425,610]],offset=[0,0,0];
  samples.forEach(([x,y])=>{const a=oc.getImageData(x,y,12,12).data,b=ctx.getImageData(x,y,12,12).data;for(let i=0;i<a.length;i+=4)for(let k=0;k<3;k++)offset[k]+=(a[i+k]-b[i+k])/(samples.length*144);});
  const pixels=ctx.getImageData(0,0,800,1000);for(let i=0;i<pixels.data.length;i+=4)for(let k=0;k<3;k++)pixels.data[i+k]+=Math.max(-24,Math.min(24,offset[k]));ctx.putImageData(pixels,0,0);
  oc.globalCompositeOperation='destination-in';oc.drawImage(faceMask(),0,0);ctx.drawImage(originalCanvas,0,0);return c;
 })();photoCache.set(hair.id,result);try{return await result;}catch(e){photoCache.delete(hair.id);throw e;}
}
function recolorHair(canvas,color,hair){
 if(color==='#262523'||hair.family==='bald'||hair.family==='natural')return canvas;
 const c=makeCanvas(),ctx=c.getContext('2d',{willReadFrequently:true});ctx.drawImage(canvas,0,0);const protectedFace=faceMask().getContext('2d').getImageData(0,0,800,1000).data;const data=ctx.getImageData(0,0,800,1000),p=data.data,hex=color.slice(1),target=[parseInt(hex.slice(0,2),16),parseInt(hex.slice(2,4),16),parseInt(hex.slice(4,6),16)];
 for(let y=35;y<570;y++)for(let x=155;x<665;x++){
  const i=(y*800+x)*4;if(protectedFace[i+3]>5)continue;const r=p[i],g=p[i+1],b=p[i+2],lum=(r+g+b)/3;
  const inCrown=((x-425)/230)**2+((y-235)/210)**2<1;
  const isTemple=y>280&&((x<260&&x>197)||(x>590&&x<640));
  if((inCrown||isTemple)&&lum<100&&Math.max(r,g,b)-Math.min(r,g,b)<35){const strength=Math.min(1,(105-lum)/40);for(let k=0;k<3;k++){const value=target[k]*.75+lum*.65;p[i+k]=p[i+k]*(1-strength)+value*strength;}}
 }
 ctx.putImageData(data,0,0);return c;
}
async function photoFrame(item){
 const key=`${item.family}-${item.finish}`;if(frameCache.has(key))return frameCache.get(key);
 if(frameCache.size>12)frameCache.delete(frameCache.keys().next().value);
 const pending=(async()=>{
  const image=await loadImage(`/assets/frames/${item.family}.png`),c=makeCanvas(image.naturalWidth,image.naturalHeight),ctx=c.getContext('2d',{willReadFrequently:true});ctx.drawImage(image,0,0);const holes=[clearLensInterior(ctx,c.width,c.height,.25),clearLensInterior(ctx,c.width,c.height,.75)];
  const data=ctx.getImageData(0,0,c.width,c.height),p=data.data;let minX=c.width,maxX=0,minY=c.height,maxY=0;
  for(let y=0;y<c.height;y++)for(let x=0;x<c.width;x++){const i=(y*c.width+x)*4;if(p[i+3]>48){minX=Math.min(minX,x);maxX=Math.max(maxX,x);minY=Math.min(minY,y);maxY=Math.max(maxY,y);}}
  if(maxX<=minX)throw Error('Empty frame');
  const native={panto:'black',rectangle:'black',round:'gold',wayfarer:'tortoise',browline:'black',aviator:'gold',geometric:'gold',rimless:'silver',oval:'black',square:'black',navigator:'gold',octagon:'silver','cat-eye':'black',butterfly:'tortoise','semi-rimless':'silver',sport:'black'};const colors={black:[30,29,27],tortoise:[104,66,32],gold:[176,144,80],clear:[174,175,166]},target=colors[item.finish];
  for(let y=minY;y<=maxY;y++)for(let x=minX;x<=maxX;x++){const i=(y*c.width+x)*4;if(p[i+3]<6||item.finish===native[item.family])continue;const lum=(p[i]+p[i+1]+p[i+2])/3,highlight=Math.max(0,lum-100)*.9;for(let k=0;k<3;k++)p[i+k]=Math.min(255,target[k]*(.5+lum/360)+highlight);if(item.finish==='tortoise'){const fleck=Math.sin(x*.05+y*.09)*Math.sin(x*.031-y*.05);if(fleck>.25){p[i]=Math.min(255,p[i]*1.6);p[i+1]=Math.min(255,p[i+1]*1.5);p[i+2]=Math.min(255,p[i+2]*1.3);}}if(item.finish==='clear')p[i+3]*=.45;}
  ctx.putImageData(data,0,0);const crop=makeCanvas(maxX-minX+1,maxY-minY+1);crop.getContext('2d').drawImage(c,minX,minY,crop.width,crop.height,0,0,crop.width,crop.height);const mask=makeCanvas(crop.width,crop.height),m=mask.getContext('2d');m.fillStyle='white';for(let side=0;side<holes.length;side++){const hull=holes[side];if(!hull){m.beginPath();m.roundRect(crop.width*(side===0?.055:.545),crop.height*.17,crop.width*.40,crop.height*.68,8);m.fill();continue;}m.beginPath();if(hull)hull.forEach(([x,y],i)=>i?m.lineTo(x-minX,y-minY):m.moveTo(x-minX,y-minY));m.closePath();m.fill();}crop.lensMask=mask;return crop;
 })();frameCache.set(key,pending);try{return await pending;}catch(e){frameCache.delete(key);throw e;}
}
export async function drawRealPreview(canvas,state,photo){
 const c=makeCanvas(),ctx=c.getContext('2d');
 if(state.hasCustomPhoto){const ratio=Math.max(800/photo.width,1000/photo.height);ctx.drawImage(photo,(800-photo.width*ratio)/2,(1000-photo.height*ratio)/2,photo.width*ratio,photo.height*ratio);}else{const base=state.original?await preservedPhoto({id:'natural'}):await preservedPhoto(state.hair);ctx.drawImage(state.original?base:recolorHair(base,state.color,state.hair),0,0);}
 if(!state.original&&state.glasses.family!=='none'){
  const frame=await photoFrame(state.glasses),w=320*state.glassesScale,h=w*frame.height/frame.width;
  ctx.save();ctx.translate(425+state.glassesX,413+state.glassesY);ctx.rotate(state.glassesRotation);if(state.tint!=='clear'){
   const tint=makeCanvas(frame.width,frame.height),t=tint.getContext('2d');t.fillStyle=state.tint==='smoke'?'#283230':'#a16f30';t.fillRect(0,0,tint.width,tint.height);t.globalCompositeOperation='destination-in';t.drawImage(frame.lensMask,0,0);ctx.save();ctx.globalAlpha=.52;ctx.drawImage(tint,-w/2,-h/2,w,h);ctx.restore();
  }
  ctx.shadowColor='rgba(22,18,10,.2)';ctx.shadowBlur=2;ctx.shadowOffsetY=3;ctx.drawImage(frame,-w/2,-h/2,w,h);ctx.restore();
 }
 canvas.getContext('2d').clearRect(0,0,800,1000);canvas.getContext('2d').drawImage(c,0,0);return canvas;
}
export async function drawAngle(canvas,hair,angle){
 const image=await loadImage(`/assets/real/${hair.id}-angles.jpg`),half=image.naturalWidth/2;canvas.getContext('2d').drawImage(image,angle==='side'?0:half,0,half,image.naturalHeight,0,0,800,1000);
}
