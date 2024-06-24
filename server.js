const express = require('express');
const bodyParser= require('body-parser');
const dbConfig=require('./config/db.config')
const mongoose=require('mongoose')

const userRouters= require('./src/routes/user.routes')
//create express app
const app=express();


//parse request of content-type-application/x-www-from-urlencoded
app.use(bodyParser.urlencoded({extended:true}))

//parse requests of content-type-application/json
app.use(bodyParser.json())

app.use('/api/users', userRouters)


//setup server port
const port=3000;








//connection data base
mongoose.connect(dbConfig.url).then(()=>{
    console.log("sussessfuly connection to database");

}).catch(err=>{
    console.log('could not connect to the database',err);
    process.exit();
})




app.get('/test', (req,res)=>{
    res.json({"message":"hello worldx"})
})

app.listen(port,()=>{console.log(`node server is running in port ${port}`)})