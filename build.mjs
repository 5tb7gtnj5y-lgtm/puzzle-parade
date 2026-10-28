import{SCENES}from'./engine.js';
import{mkdir,copyFile}from'node:fs/promises';
await mkdir('dist/assets',{recursive:true});
for(const file of['index.html','style.css','app.js','affiliate.js','engine.js','catalogue.js','poland.js','very-hard.js','illustrations.js','sw.js','icon.svg','manifest.webmanifest','_headers'])await copyFile(file,'dist/'+file);
for(const {id} of SCENES.filter(p=>!p.illustrated))await copyFile(id+'.webp','dist/assets/'+id+'.webp');
console.log('Built Puzzle Parade in dist/.');
