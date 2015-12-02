"use strict";

let mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    
    Book = new Schema({
        title: String,
        authors: Schema.Types.Mixed,
        thumbnail: String,
        username: String
    });
    
module.exports = mongoose.model("Book", Book);
