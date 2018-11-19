var {User} = require("./../models/user.js");

var catchroleId = (req, res ,next) =>{
    var CroleId = req.User.UserSchema.roleId("teacher");
    console.log(CroleId);
}


module.exports = {
    catchroleId
}