export const angleStyles = new Set(['natural', 'curtains', 'side-part', 'textured-crop', 'quiff', 'comma', 'slick-back', 'two-block', 'buzz', 'low-fade', 'waves', 'flow', 'shag', 'pompadour', 'undercut', 'messy-fringe', 'curls', 'bob', 'top-knot', 'faux-hawk', 'bald']);
export function angleReference(hair) {
  return angleStyles.has(hair.id) ? { id: hair.id, name: hair.name } : null;
}

const profileLandmarks = {
  natural: [635,393,380,405], curtains: [625,419,380,415], 'side-part': [620,397,365,401],
  'textured-crop': [625,425,385,424], quiff: [630,418,375,410], comma: [615,405,365,408],
  'slick-back': [628,410,380,408], 'two-block': [610,396,370,400], buzz: [610,399,370,407],
  'low-fade': [630,409,380,415], waves: [625,372,380,395], flow: [585,412,355,411],
  shag: [635,414,380,425], pompadour: [623,366,375,380], undercut: [623,373,380,395],
  'messy-fringe': [628,418,385,433], curls: [622,409,370,418], bob: [609,382,370,405],
  'top-knot': [623,405,385,410], 'faux-hawk': [641,424,385,430], bald: [610,358,350,372]
};

export function sidePose(id) {
  const [eyeX,eyeY,earX,earY] = profileLandmarks[id];
  return { lens: [eyeX+48,eyeY+22], ear: [earX,earY], slant: .1 };
}
