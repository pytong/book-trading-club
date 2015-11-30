"use strict";

let mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    
    Book = new Schema({
        name: String,
        isbn: { type: Number },
        owner: String
    });
    
module.exports = mongoose.model("Book", Book);
