const express = require('express');
const bodyParser = require('body-parser');
const moment = require('moment-timezone');
const _ = require('lodash');
const mongoose = require('mongoose');
const  { User }  = require('./models/user.js');
const {authenticate} = require('./middleware/authenticare.js');
mongoose.Promise = global.Promise; //新版mongoose不用打

mongoose.connect('mongodb://localhost/ratingsystem', {
    useMongoClient:true
});

var app = express();
app.use(bodyParser.json());

app.post('/singup', (req,res) =>{
    var body = _.pick(req.body,['email','password','name','phone','studentID','department','lineId','roleId'])
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


//登入
app.post('/login',(req,res) =>{
    var body = _.pick(req.body,['email','password']);
    User.findByCredentials(body.email, body.password).then((user) =>{
        return user.generateToken().then((token)=>{
            res.header('authToken', token).send();
        }).catch((e) =>{
            res.status(403).send("Token error");
        })
    }).catch((e) =>{
        res.ststus(403).send(e);
    })
})

//Token驗證
app.get('/ckeckme', authenticate, (req,res) =>{
    var user = req.user;
    var objUser = user.toJson();
    var roleId = user.roleId;
    console.log(objUser);
    console.log(req.user);
   
    // if(roleId === "teacher"){
    //     resolve(user)
    // }else{
    //     reject("你不是老師喔!");
    // }

    console.log(roleId);
    res.send(objUser);
})

app.listen(3000, () => {
    console.log(moment().tz("Asia/Taipei").format());
    console.log("http//localhost:3000"); 
    
})