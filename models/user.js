const mongoose = require('mongoose');
const validator = require('validator');
const moment = require('moment-timezone');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const {ObjectID} = require('mongodb');

var UserSchema = new mongoose.Schema({
    email:{
        type : String,
        required: true,
        trim: true,
        minlength: 1,
        unique: true,
        validator: {
            validator:(value)=>{validator.isEmail(value)},
            message:'不是合法信箱'
        }
    },
    password:{
        type: String,
        required: true,
        minlength: 6
    },
    name:{
        type: String,
        required: true,
        minlength: 1
    },
    phone:{
        type: String,
        required: true,
        minlength: 10
    },
    time:{
        type: Date
    },
    studentID:{
        type: String,
        required: true
    },
    department:{
        type: String,
        required: true
    },
    lineId:{
        type:String
    },
    roleId:{
        type: String,
        required: true
    },
    tokens:[{
        access:{
            type: String,
            required: true,
        },
        token:{
            type:String,
            required:true
        }
    }]

})

UserSchema.methods.generateToken = function(){
    var user = this;
    var access = user.roleId;
    var token =  jwt.sign({_id:user._id.toHexString(),access},'abc123').toString();
    console.log("1");
    user.tokens.push({access,token});
    return user.save().then(()=>{
        console.log("2");
        return token
        console.log("3");
    })
}

UserSchema.pre('save', function(next){
    var user =this;
    if(user.isModified('password')){
        bcrypt.hash(user.password,10).then(hash =>{
            user.password = hash;
            next(); 
        })      
    }else{
        next();
    }   
})

var User = mongoose.model('user', UserSchema);

module.exports = {
    User
}