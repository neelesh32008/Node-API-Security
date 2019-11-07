
const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema(
    { img: 
        { data: Buffer, contentType: String }
    }
  );


exports.Item =  mongoose.model("Item", itemSchema);