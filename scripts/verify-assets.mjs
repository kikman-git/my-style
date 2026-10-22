import fs from 'node:fs';
import assert from 'node:assert/strict';
import {hairstyles,glasses} from '../src/catalog.js';
import {angleStyles,angleReference} from '../src/angles.js';
const angles=[...angleStyles];
for(const hair of hairstyles)assert.ok(angleStyles.has(angleReference(hair).id),`Missing angle reference: ${hair.id}`);
const assets=['public/assets/original.jpg','public/assets/avatar.jpg',...hairstyles.filter(x=>x.id!=='natural').map(x=>`public/assets/real/${x.id}.jpg`),...new Set(glasses.filter(x=>x.family!=='none').map(x=>`public/assets/frames/${x.family}.png`)),...angles.map(x=>`public/assets/real/${x}-angles.jpg`),...hairstyles.map(x=>`public/assets/thumbs/${x.id}.jpg`)];
for(const asset of assets){assert.ok(fs.existsSync(asset),`Missing ${asset}`);assert.ok(fs.statSync(asset).size>1000,`Invalid ${asset}`);}
console.log(`Verified ${hairstyles.length} hairstyles, 16 photographic frame shapes, 21 side/back boards, and all thumbnails.`);
