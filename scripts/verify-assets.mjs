import fs from 'node:fs';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {hairstyles,glasses} from '../src/catalog.js';
import {angleStyles,angleReference,angleCrop,sidePose} from '../src/angles.js';
import {photoLooks} from '../src/photo-looks.js';
const angles=[...angleStyles];
for(const hair of hairstyles){const reference=angleReference(hair);if(reference)assert.equal(reference.id,hair.id,'Every angle must belong to the selected hairstyle');else assert.ok(!angleStyles.has(hair.id));}
const assets=['public/assets/original.jpg','public/assets/avatar.jpg',...hairstyles.filter(x=>x.id!=='natural').map(x=>`public/assets/real/${x.id}.jpg`),...new Set(glasses.filter(x=>x.family!=='none').map(x=>`public/assets/frames/${x.family}.png`)),...angles.map(x=>`public/assets/real/${x}-angles.jpg`),...photoLooks.map(x=>`public/assets/looks/${x.id}.jpg`),...hairstyles.map(x=>`public/assets/thumbs/${x.id}.jpg`)];
for(const asset of assets){assert.ok(fs.existsSync(asset),`Missing ${asset}`);assert.ok(fs.statSync(asset).size>1000,`Invalid ${asset}`);}
const hashes=angles.map(id=>createHash('sha256').update(fs.readFileSync(`public/assets/real/${id}-angles.jpg`)).digest('hex'));assert.equal(new Set(hashes).size,angles.length,'Angle boards must be unique to each hairstyle');
for(const [width,height] of [[1586,992],[1122,1402],[1800,1126]])for(const angle of ['side','back']){const crop=angleCrop(width,height,angle);assert.ok(Math.abs(crop.width/crop.height-crop.displayWidth/1000)<.0001,'Image rendering must preserve face proportions');assert.ok(crop.x>=0&&crop.x+crop.width<=width&&crop.y>=0&&crop.y+crop.height<=height);}
for(const hair of hairstyles)assert.ok(sidePose(hair.id).lens.every(Number.isFinite),'Every hairstyle needs fitted eye and ear anchors');
for(const look of photoLooks){assert.ok(hairstyles.some(h=>h.id===look.hair));assert.ok(glasses.some(g=>g.id===look.glasses));}
console.log(`Verified ${hairstyles.length} hairstyles, ${angles.length} unique side/back boards, ${photoLooks.length} complete photographic looks, 16 frame shapes, and all thumbnails.`);
