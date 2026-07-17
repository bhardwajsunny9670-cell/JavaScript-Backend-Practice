//Use express.json() to parse a POST body. Build a route POST /users that accepts { name, age }. 
// Write a custom middleware that validates: name must be a string, age must be a number > 0. 
// If invalid, respond 400 with a clear error message — do NOT let it reach the route handler if validation fails.

const express =  require("express");
const app = express();
let port = 3000;

app.listen(port, ()=>{
    console.log(`app is listening on port ${port}`);
} )

app.use(express.urlencoded({extended: true}));
app.use(express.json());

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

//By itself, res.status(201) does not send anything to the client yet — it just sets the code.
//  It returns res again, which is why you can chain .json(...) right after it.


//res.json(data) Converts your JavaScript object into a JSON string 
// (because HTTP responses are sent as text/bytes — you can't send a raw JS object over the network).