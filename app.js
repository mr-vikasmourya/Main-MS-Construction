var express = require("express")
var bodyParser = require("body-parser")
var mongoose = require("mongoose")

const app = express()

app.use(bodyParser.json())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({
       extended:true
}))

mongoose.connect('mongodb://localhost:27017/msconstruction');

var db = mongoose.connection;

db.on('error',()=>console.log("Error in Conncetiong to Database"));
db.once('open',()=>console.log("Connected to Database"));

app.post("/contact",(req,res)=>{
    var name = req.body.name;
    var phone = req.body.phone;
    var email = req.body.email;
    var message = req.body.message;

    var data = {
        "name": name,
        "phone": phone,
        "email": email,
        "message": message,

    }

    db.collection('contacts').insertOne(data,(err,collection)=>{
        if(err){
            throw err;
        }
        console.log("Record Inserted Successfully");
    });

    return res.redirect('signup_success.html');
})

app.post("/Gallery",(req,res)=>{
    var name = req.body.name;
    var email = req.body.email;
    var comment = req.body.comment;

    var data = {
        "name": name,
        "email": email,
        "comment": comment,

    }

    db.collection('comments').insertOne(data,(err,collection)=>{
        if(err){
            throw err;
        }
        console.log("Comment Inserted Successfully");
    });

    return res.redirect('signup_success.html');
})

app.get("/",(req,res)=>{
    res.set({
        "Allow-access-Allow-Origin":'*'
    })
    return res.redirect('index.html');
}).listen(80);

console.log("Listening the server on port 80");