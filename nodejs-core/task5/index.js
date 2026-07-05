//write a script that takes any hardcoded file path and logs basename, dirname,
//extname,path.resolve and path.join()
const fs = require('fs');
const path = require('path');

const fileFilePath = "/home/sunny/projects/notes.txt";

const basename = path.basename(fileFilePath);
console.log(basename);

const dirname = path.dirname(fileFilePath);
console.log(dirname);

const extname = path.extname(fileFilePath);
console.log(extname);

const result = path.resolve(__dirname,"data","note.txt");
console.log( "resolve result : ",result);

const results = path.join(__dirname,"data","note.txt");
console.log("join result :",results);