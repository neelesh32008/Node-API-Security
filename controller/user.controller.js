const user = require('../models/user');
const bcrypt = require('bcrypt'); 
const jwt = require('jsonwebtoken');
var fs = require('fs');

module.exports = {
 create: function(req, res, next) {
    console.log('IMAGE IN: ',req.body);
   var data = fs.readFileSync('./image/pic.jpeg');
  user.create({ name: req.body.name, email: req.body.email, password: req.body.password, img: data }, function (err, result) {
      if (err) 
       next(err);
      else
       res.json({status: "success", message: "User added successfully!!!", data: result});
      
    });
},
authenticate: function(req, res, next) {
  user.findOne({email:req.body.email}, function(err, userInfo){
     if (err) {
      next(err);
     } else {
if(bcrypt.compareSync(req.body.password, userInfo.password)) {
const token = jwt.sign({id: userInfo._id}, req.app.get('secretKey'), { expiresIn: '30m' });
res.json({status:"success", message: "user found!!!", data:{user: userInfo, token:token}});
}else{
res.json({status:"error", message: "Invalid email/password!!!", data:null});
}
     }
    });
 },

}
