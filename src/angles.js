import { hairstyles } from './catalog.js';

export const angleStyles = new Set(hairstyles.map(hair => hair.id));
export function angleReference(hair) {
  return angleStyles.has(hair.id) ? { id: hair.id, name: hair.name } : null;
}

const profileLandmarks = {
  'korean-curtains':[625,400,375,420], 'long-curtains':[630,400,375,420], 'double-comma':[640,405,375,420], 'soft-comma':[640,405,375,420],
  'ivy-league':[715,400,375,420], 'business-cut':[640,400,375,420], 'french-crop':[640,410,375,420], caesar:[630,407,375,420],
  'textured-quiff':[640,410,375,420], 'short-quiff':[640,415,375,420], 'loose-pomp':[630,400,375,420], 'high-pomp':[700,370,375,405],
  'wet-slick':[720,360,375,410], 'loose-slick':[705,355,375,410], 'soft-two-block':[710,360,375,410], bowl:[630,405,375,420],
  crew:[640,410,375,420], butch:[635,400,375,420], 'mid-fade':[710,365,375,410], 'high-fade':[650,405,375,420],
  'side-undercut':[710,390,375,420], 'textured-undercut':[630,400,375,420], 'angular-fringe':[610,400,375,420], 'long-fringe':[730,405,375,420],
  'beach-waves':[640,400,375,420], 'wavy-part':[645,405,375,420], 'tight-curls':[645,395,375,420], 'curly-top':[650,400,375,420],
  wolf:[650,415,375,420], mullet:[720,385,375,420], surfer:[650,410,375,420], 'ear-tuck':[650,400,375,420],
  'layered-bob':[710,390,375,420], 'long-straight':[710,350,375,420], 'low-bun':[710,370,375,420], 'half-up':[645,400,375,420], spiky:[720,380,375,420], 'flat-top':[720,375,375,420],
  natural: [635,393,380,405], curtains: [625,419,380,415], 'side-part': [620,397,365,401],
  'textured-crop': [625,425,385,424], quiff: [630,418,375,410], comma: [615,405,365,408],
  'slick-back': [628,410,380,408], 'two-block': [610,396,370,400], buzz: [610,399,370,407],
  'low-fade': [630,409,380,415], waves: [625,372,380,395], flow: [585,412,355,411],
  shag: [635,414,380,425], pompadour: [623,366,375,380], undercut: [623,373,380,395],
  'messy-fringe': [628,418,385,433], curls: [622,409,370,418], bob: [609,382,370,405],
  'top-knot': [623,405,385,410], 'faux-hawk': [641,424,385,430], bald: [610,358,350,372]
};

export function angleCrop(width,height,angle){
 const panel=width/2,availableWidth=panel-4,availableHeight=height-4,displayWidth=panel/height<.65?576:800,cropWidth=Math.min(availableWidth,availableHeight*displayWidth/1000),cropHeight=cropWidth*1000/displayWidth;
 return {x:(angle==='back'?panel:0)+2+(availableWidth-cropWidth)/2,y:2+(availableHeight-cropHeight)*.25,width:cropWidth,height:cropHeight,displayWidth,displayX:(800-displayWidth)/2};
}

export function sidePose(id,width=1600,height=1000) {
 const [eyeX,eyeY,earX,earY] = profileLandmarks[id],crop=angleCrop(width,height,'side');
 const map=(x,y)=>[(x/800*(width/2)-crop.x)*crop.displayWidth/crop.width+crop.displayX,(y/1000*height-crop.y)*1000/crop.height];
 const eye=map(eyeX,eyeY),ear=map(earX,earY),scale=Math.min(1.4,Math.max(.9,(eye[0]-ear[0])/250));
 return {lens:[eye[0]+48*scale,eye[1]+22*scale],ear,slant:.1,scale};
}
