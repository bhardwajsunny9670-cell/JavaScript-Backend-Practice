//Add a 404 handler for unmatched routes AND a global error-handling middleware (4-parameter signature: (err, req, res, next)). 
// Deliberately throw an error in one route (e.g., accessing undefined data)
//  and confirm it's caught by your error middleware instead of crashing the server.


const express = require("express")
const app = express();

let port = 3000;

app.listen(port, () => {
    console.log(`server is listening on port${port}`);
});

app.use(express.urlencoded({extended: true}));
app.use(express.json());

function logger(req , res , next){
    const timeStamp = new Date().toISOString();
    console.log(`[${timeStamp}] ${req.method} to ${req.url}`);

    next();
}
app.use(logger);


app.get('/' ,(req,res) => {
    console.log ('receiving incoming call data');
    res.send(`receiving the data from incoming call :`);
})



function validateUser(req,res,next) {
    let{name , age} = req.body ;
   
    if(typeof name === 'string' && typeof age === 'number' && age > 0) {
        next() ;
    }else{
        res.status(400).json({ error: "something went wrong"});
    }
     
}

app.post("/users", validateUser , (req,res) => {
    let{name , age} = req.body;
    res.status(201).json({message:"user created", user:{name,age}});
})

app.get("/crash-test",(req,res)=> {
    throw new Error("Intentional crash for testing");
});

app.use((req,res) => {
    res.status(404).json({ error: "Route not found"});
});

app.use((err , req, res,next) => {
    console.log(err.stack);
    res.status(500).json({error: "Something broke on the server"});
});



