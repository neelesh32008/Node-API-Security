const user = require('../models/user');
const data = require('../models/data');
const multer = require('multer');
const path = require('path');

const upload = multer({
    storage: multer.memoryStorage(), // Init Upload
    limits:{fileSize: 1000000},
    fileFilter: function(req, file, cb){
      checkFileType(file, cb);
    }
  }).single('Image');

      //   Check File Type
      function checkFileType(file, cb){
      // Allowed ext
      const filetypes = /jpeg|jpg|png|gif/;
      // Check ext
      const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
      // Check mime
      const mimetype = filetypes.test(file.mimetype);
  
      if(mimetype && extname){
        return cb(null,true);
      } else {
        cb('Error: Images Only!');
      }
    }

module.exports = {

detail : function (req,res) {
    user.find(function(err,foundUser){
  if(err){
      console.log(err);
  }else {
      console.log(foundUser);
      res.send(foundUser);
  }
    });
   
 },

 upload : function(req,res){
 
 upload(req, res, (err) => {
  
      if (err) {
        res.send(err);
        console.log(err);
  
      } else if (req.file == undefined) {
        req.send('Error: No File Selected!');
      } else {
        console.log(req.file.buffer);
        res.send(req.file.buffer);
        var newItem = new data.Item();
        newItem.img.data = req.file.buffer;
        newItem.img.contentType = 'image/png';
        newItem.save();
      }
    })
},
  
  photos :  function(req,res){
  
     data.Item.findById(req.params.id, (err, result) => {
  
      if (err) return console.log(err)
      else {
        res.contentType('image/jpeg');
        res.send(result.img.data);
        console.log(result.img.data);
      }
  })
  }

}

