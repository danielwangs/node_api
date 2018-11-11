const express = require('express');
const bodyParser = require('body-parser');
const moment = require('moment-timezone');
const _ = require('lodash');
const mongoose = require('mongoose');
const  { User }  = require('./models/user.js');

mongoose.connect('mongodb://localhost/ratingsystem', {
    useMongoClient:true
});

var app = express();
app.use(bodyParser.json());

app.post('/singup', (req,res) =>{
    var body = _.pick(req.body,['email','password','name','phone','studentID','departmet','lineId','roleId'])
    body.time = Date.now();
    var user = new User(body);
    user.save().then(()=>{
        return user.generateToken();
    }).then((token) =>{
        res.header('authToken', token).send(user.name);
    }).catch((error)=>{
        res.status(400).send(error);
    })

})



app.listen(3000, () => {
    console.log(moment().tz("Asia/Taipei").format());
    console.log("http//localhost:3000"); 
    
})