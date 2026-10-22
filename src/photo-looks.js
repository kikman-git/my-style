import { loadImage, drawRealPreview } from './real-preview.js';

export const photoLooks = [
 {id:'korean-panto',hair:'korean-curtains',glasses:'panto-black',name:'Korean curtains',frames:'Black panto'},
 {id:'ivy-rectangle',hair:'ivy-league',glasses:'rectangle-tortoise',name:'Ivy League',frames:'Tortoise rectangle'},
 {id:'crop-round',hair:'textured-crop',glasses:'round-gold',name:'Textured crop',frames:'Gold round'},
 {id:'quiff-browline',hair:'quiff',glasses:'browline-black',name:'Modern quiff',frames:'Black browline'},
 {id:'fade-wayfarer',hair:'low-fade',glasses:'wayfarer-tortoise',name:'Low taper fade',frames:'Tortoise wayfarer'},
 {id:'flow-rimless',hair:'flow',glasses:'rimless-clear',name:'Bro flow',frames:'Clear rimless'}
];

export function getPhotoLook(state){
 if(state.hasCustomPhoto||state.color!=='#262523'||state.tint!=='clear'||state.glassesX!==0||state.glassesY!==0||state.glassesScale!==1||state.glassesRotation!==.12)return null;
 return photoLooks.find(look=>look.hair===state.hair.id&&look.glasses===state.glasses.id)||null;
}

export async function drawPhotoLook(canvas,look,angle,state,photo){
 if(angle==='front')return drawRealPreview(canvas,state,photo);
 const image=await loadImage(`/assets/looks/${look.id}.jpg`),positions={front:[0,0],'three-quarter':[1,0],side:[0,1],back:[1,1]},[col,row]=positions[angle],w=image.naturalWidth/2,h=image.naturalHeight/2;
 canvas.getContext('2d').drawImage(image,col*w+4,row*h+4,w-8,h-8,0,0,800,1000);
}
