//const fs = require("fs")// fs-> file system
/*fs.writeFile("./a.txt","Hello from Global",
    (err)=>{
        console.log("success");
    }
)*/
/*fs.readFile("./a.txt","utf-8",(err,data)=>{
    if(err){
        console.error(err);
    }else{
        console.log(data);
    }
})
    */

//writing dynamic values
/*const username= "Arbeena"
const email= "arbeena@123.com"
fs.writeFile("./a.txt",`${username} and ${email}`,
    (err)=>{
        console.log("success");
    }
) */

/*const fs = require('fs');
const data = {
    username: "Arbeena Hassan",
    email: "arbeena@gmail.com"
};

const jsonData = JSON.stringify(data,null,2);
fs.writeFile("./a.json",jsonData,(err)=>{
    if (err){
        console.error("Error",err);
    }else{
        console.log("success");
    }
}); */

/*const express = require("express");
const app = express();
app.use(express.json()) //->build in middleware
//const PORT = process.evn || 3000

//node --watch <filename>
//app.get(path,callback)
/*app.get("/",(req,res)=>{
    res.send("server responded successfully")//one request and one response

})

app.get("/login",(req,res)=>{
    res.send("login sucessfully")
}
)
app.post("/users",(req,res)=>{
    res.send("from post route")
})

app.delete("/delete",(req,res)=>{
    res.send("from delete post")
})*/

/*app.get("/user",(req,res)=>{
    //const name = req.query.username;
    //const email = req.query.email;
    const {username,email} = req.query;
    res.send(`${username} and ${email}`);
})*/

/*app.post("/",(req,res)=>{
    const token = req.headers.token
    res.send(`${token}`);
})*/
/*const fs = require("fs")
app.post("/",(req,res)=>{
    const {name,email,password} = req.body;
    const user = {
        name: req.body.name,
        email:req.body.email,
        password:req.body.password
    }
    console.log(req.body.name)
    const userData = JSON.stringify(user);
    console.log(userData)
    fs.writeFile("./a.json",userData,(err)=>{
        res.send(`${userData}`)
    })

})*/

/*app.set("view engine","ejs")
app.use(express.static("public"))

app.get("/",(req,res)=>{
    res.render("home");
    
})
app.listen(3000,()=>{
    console.log("server is listing on port no 3000");
})
*/
// -> boiler plate for connecting mongodb and node js
const express = require("express");
const app = express();
const mongoose = require("mongoose");
app.use(express.json()) //convert json to js object

const cors = require("cors")
app.use(cors())
mongoose.connect("mongodb://localhost:27017/globalDBbb")
.then(()=>{console.log("db connect");})
.catch(()=>{console.log("db not connected");})

const mySchema = new mongoose.Schema({
    user:String
    /*email:String*/
})
const user = mongoose.model("user",mySchema)
/*app.post("/",(req,res)=>{
    const username = req.body.username;
    const email = req.body.email;
    const details = {
        user:username,
        email:email
    }
    const userDetails  = new user(details) //user is model name
    userDetails.save()
    .then(()=>{res.send("success ")})
    .catch(()=>{res.send("somethign went wrong")})
})*/

app.post("/",async(req,res)=>{
    try{
        const username = req.body.username;
        /*const email = req.body.email;*/
        const details = {
        user:username
        /*email:email*/
        }

        const userDetails  = new user(details) //user is model name
        await userDetails.save();
        res.send("success ")
    }
    catch (error) {
        console.error("Error saving user details:", error);
        res.send("something went wrong");
    }
})

/*app.delete("/delete",(req,res)=>{
    const emailToDelete = req.body.email;
    user.findOneAndDelete({ email:emailToDelete})
    .then((deletedUser) => {
        if (deletedUser) {
            res.send("User deleted successfully.");
        } else {
            res.send("No user found with the given email.");
        }
    })
    .catch(() => {
        res.send("Something went wrong while deleting the user.");
    });
})*/

/* app.get("/fetchAll",(req,res)=>
{
    const username = req.query.username;
    user.find({user:username})
    .then((users)=>{
        if(users.length >0){
            res.json(users);
        }else{
            res.send("user not found")
        }
    })
    .catch((err)=>{
        console.error("error fetching user:",err);
    })
})*/
app.get("/",(req,res)=>{
    res.send("hello from backend. you have connected get route")
})
const nameSchema = new mongoose.Schema({
    name: String
  });
const Name = mongoose.model("Name", nameSchema);
app.post("/sample", async (req, res) => {
    try { 
        const randomName = req.body.randomName;
        const details = {
            name: randomName
        };

        const nameDetails = new Name(details); // Assuming 'Name' is the correct model
        await nameDetails.save();

        res.send("success");
    } catch (error) {
        console.error("Error saving user details:", error);
    
    }
});

app.listen(3000, ()=>{
    console.log("server started");
})
