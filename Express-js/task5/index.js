//Build a full CRUD REST API for tasks, in-memory array storage (no DB yet):
//GET /tasks — list all
//GET /tasks/:id — get one
//POST /tasks — create (with validation middleware from Task 4)
//PUT /tasks/:id — update
//DELETE /tasks/:id — delete
//Wrap everything with your logger + error-handling middleware


const express = require('express');
const app = express();

app.use(express.urlencoded({extended:true}));
app.use(express.json());

function logger(req,res,next){
    const timeStamp = new Date().toISOString();
    console.log(`[${timeStamp}] ${req.method} to ${req.url}`);
    next()
};

app.use(logger);

let tasks = [];
let nextId = 1;


function validateTask(req,res,next) {
    let{title} = req.body;
    if(
        typeof title === "string" && title.trim().length > 0 ) {
            req.body.title = title.trim(); // overwrite it on req.body itself . add this because
                              //let {title} = req.body; again, pulling the original untrimmed value straight from req.body
            next()
        }else{
            res.status(400).json({error: "something went wrong"})
        }  
}

app.post("/tasks", validateTask,(req,res)=>{
    let{title} = req.body;
    // title = title.trim();// this works correctly but we have to do it with middleware for better practice

    const newTask = {
        title: title,
        id : nextId,
        completed: false
    }
    tasks.push(newTask);
     nextId++ ;

     res.status(201).json(newTask);   
})

app.put("/tasks/:id",(req,res)=>{
    let id = Number(req.params.id);
    
    let foundId = tasks.find(i=> i.id === id);
    
    if(!foundId){
        res.status(404).json({error:"Task not found"})
    }else{
        if (req.body.title !== undefined) {          // outer: was it even sent?
        if (typeof req.body.title === "string" && req.body.title.trim() !== "") {  // inner: is it valid?
        foundId.title = req.body.title.trim();
         } else {
         return res.status(400).json({ error: "title must be a non-empty string" });
          }
        }      // if req.body.title === undefined, neither branch runs — silently skipped, as intended
        if(
            req.body.completed !== undefined 
        ){
            if( typeof req.body.completed === "boolean"){
            foundId.completed = req.body.completed;
            }else{
              return res.status(400).json({ error: "complete must be a boolean" });  
            }
        };
        res.status(200).json(foundId);
    }

})

app.delete("/tasks/:id",(req,res)=>{
    let id = Number(req.params.id);
    //find the index of the task 
    let taskIndex = tasks.findIndex(i => i.id === id);

    //task not found
    if(taskIndex === -1){
        return res.status(404).json({error:"task not found"})
    };

    //remove the task from the array
    let deleteTask = tasks.splice(taskIndex,1);

    res.status(200).json({message: "task delete successfully", task: deleteTask[0]
    });
});

app.get('/tasks',(req,res)=> {

    res.status(200).json(tasks);
})

app.get('/tasks/:id',(req,res) => {
    let id = Number(req.params.id);
    
    const foundTask = tasks.find(i => i.id === id);
    if(!foundTask){
        res.status(404).json({error: "task not found"});
    }else{
    res.status(200).json(foundTask);
    }
});


app.listen(3000,()=>{
    console.log(`App is listening on port 3000`);
})