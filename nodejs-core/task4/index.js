//build a script that does all read, append, rename, delete
//adn handle the case where file dosen't exist with ENOENT message.
const fs = require('fs');

fs.writeFileSync("notes.txt","Hello Node");

const data = fs.readFileSync('notes.txt', 'utf8');
console.log(data);
 
fs.appendFileSync("notes.txt","- updated","utf8");
 console.log("file updated successfully");

 fs.renameSync("notes.txt","notes-backup.txt");
 console.log("file rename successfully");

fs.unlinkSync("notes-backup.txt");
console.log("deleted successfully");

try{
     fs.readFileSync("ghost.txt","utf8")
    console.log("file read successfully")
}catch(err){
    if(err.code === 'ENOENT'){
        console.log("file not found")
    }else{
        console.log("Something unexpected happens");
    }
}