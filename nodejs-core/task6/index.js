// build a command-line notes tool. notes stored in notes.json
//each note has an id and text . delete removes by id 
//if notes.json dosen't exist ,  create it automatically . no external libraries - only node.js built-ins.


const fs = require("fs");
const path = require("path")

const notesPath = path.join(__dirname , "notes.json");
//[0] = always node , [1] = always your file(index.js) , [2] = your command ,[3] = your input.
const command = process.argv[2];//your command like add , delte,clear
const input = process.argv[3];//your input like grocery , fruits etc

function loadNotes() {
    try{
        const data = fs.readFileSync(notesPath, "utf8");
        return JSON.parse(data);
    }catch(err) {
          return[];
    }      
}

function saveNotes(notes) {
        const json = JSON.stringify(notes , null ,2);
        fs.writeFileSync(notesPath , json);
       
         console.log(json);
    
}

if(command === 'add'){
    const notes = loadNotes();
    const newNotes = { // use array for a list of items and object for a thing with property . id and text are property of this object.

        id : notes.length +1 ,
        text : input
    };
    notes.push(newNotes);
    saveNotes(notes);
    console.log("note added :" , input);
  
}
if(command === "list") {
    const notes = loadNotes();
    // const id = notes.length +1 ;
    if( notes.length === 0) {
        console.log("NO notes found")
    }else {
    for(let i= 0; i< notes.length ; i++ ) {
        console.log(`${notes[i].id} : ${notes[i].text}`);
    }
    }
}

if(command === 'delete'){
    const notes = loadNotes();
    const remaining = notes.filter(note => note.id !== Number(input));
    saveNotes(remaining);
    console.log("Note deleted");
}

if(command === 'clear'){
    saveNotes([]);
    console.log("All notes cleared");
}