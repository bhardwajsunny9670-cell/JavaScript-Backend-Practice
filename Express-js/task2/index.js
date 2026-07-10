//Write a middleware function that logs METHOD | URL | TIMESTAMP to the console for every incoming request. 
// Apply it globally with app.use(). No console.log scattered in route handlers — 
// this must sit in its own middleware function, and you must call next() correctly.

const express = require("express");
const app = express();

app.listen(3000 , ()=>{
    console.log("server is running on port 3000");
})

function logger(req , res , next){
    const timeStamp = new Date().toISOString();
    console.log(`[${timeStamp}] ${req.method} to ${req.url}`);

    next();
}

app.use(logger);

app.get('/' , (req,res) => {
    console.log ('receiving incoming call data');
    res.send(`receiving the data from incoming call :`);
})

//new Date().toISOString() : about this 
// Date is a built-in JavaScript object that represents a specific point in time.
//.toISOString() — a method on that Date object that converts it into a standardized string format, called ISO 8601.
//  It looks like this: 2026-07-09T10:32:11.203Z


//Date.now() gives you a raw number (milliseconds since 1970) — not human-readable.

//new Date().toString() gives you something like Fri Jul 09 2026 16:02:11 GMT+0530 — readable, but format varies by locale/timezone