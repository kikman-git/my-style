import fs from 'node:fs';
import {execFileSync} from 'node:child_process';
import {hairstyles} from '../src/catalog.js';
fs.mkdirSync('public/assets/thumbs',{recursive:true});
let prepared=0;
for(const hair of hairstyles){const src=hair.id==='natural'?'public/assets/original.jpg':`public/assets/real/${hair.id}.jpg`,dest=`public/assets/thumbs/${hair.id}.jpg`;if(!fs.existsSync(src))continue;if(fs.existsSync(dest)&&fs.statSync(dest).mtimeMs>=fs.statSync(src).mtimeMs)continue;execFileSync('sips',['-s','format','jpeg','-s','formatOptions','77','-Z','300',src,'--out',dest],{stdio:'ignore'});prepared++;}
console.log(`Prepared ${prepared} photographic thumbnails.`);
