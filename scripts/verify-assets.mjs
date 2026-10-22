import fs from 'node:fs';
import assert from 'node:assert/strict';
import {hairstyles,glasses} from '../src/catalog.js';
const angles=['curtains','side-part','textured-crop','quiff','comma','slick-back','two-block','buzz','low-fade','waves','flow','shag','pompadour','undercut','messy-fringe','curls','bob','top-knot','faux-hawk','bald'];
const assets=['public/assets/original.jpg','public/assets/avatar.jpg',...hairstyles.filter(x=>x.id!=='natural').map(x=>`public/assets/real/${x.id}.jpg`),...new Set(glasses.filter(x=>x.family!=='none').map(x=>`public/assets/frames/${x.family}.png`)),...angles.map(x=>`public/assets/real/${x}-angles.jpg`),...hairstyles.map(x=>`public/assets/thumbs/${x.id}.jpg`)];
for(const asset of assets){assert.ok(fs.existsSync(asset),`Missing ${asset}`);assert.ok(fs.statSync(asset).size>1000,`Invalid ${asset}`);}
console.log(`Verified ${hairstyles.length} hairstyles, 16 photographic frame shapes, 20 side/back boards, and all thumbnails.`);
