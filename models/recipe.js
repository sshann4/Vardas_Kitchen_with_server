const mongoose = require('mongoose'); // import mongoose

var Schema = mongoose.Schema;

// ----------------------------creates model's schemas--------------------------------------------------
const ingredient_schema = new Schema({amount: Number, ingredient_name: String});//sub schema
// const categories_schema = new Schema({type: [String],"enum": ['ללא-גלוטן','בשרי','מנות-צד','קינוחים','צמחוני','סלטים','ראש-השנה','שבועות','סוכות','חנוכה','פורים','פסח', 'ארוחת-בוקר','ארוחת-צהריים','ארוחת-ערב','מיקרו','תנור','גז','בישול-ארוך']});//sub schema
// '','','','','','',
const recipe_schema = new Schema({
  recipe_name: String ,
  short_desc: String ,
  rate: { type: Number, min: 0, max: 5 },
  ingredients: [ingredient_schema] ,  // Array of subdocuments
  steps: [String],
  is_most_recommended: Boolean,
  ready_in: {
    hours: Number,
    minutes: Number
  },
  difficulty: String,
  which_meal: String,
  category: [String],// Array of subdocuments
  img: String
});



// ----------------------------creates the model in ths DB--------------------------------------------------
module.exports = mongoose.model('Recipe', recipe_schema);//the schema structure, what is the records structure? recipe-the name of the
