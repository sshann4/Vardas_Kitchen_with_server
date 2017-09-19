const mongoose = require('mongoose'); // import mongoose
const express = require('express'); // import express
const bodyParser = require('body-parser'); // import body parser- turn the response into jason file
const Recipe = require('./models/recipe');
var fs = require('fs');

//'mongodb://127.0.0.1/VardasKitchendb'
mongoose.connect('mongodb://varda_db:varda_db@ds131384.mlab.com:31384/vardas_kitchen_project_db',  { useMongoClient: true });//the protocol is mongodb and the port will be the default port of mongodb, VardasKitchendb- the name of the DB
const app = express();//creationg express application

app.use('/', express.static('./Client/Vardas_Kitchen_Project_New/dist'))//the dist folder will contain the production files,after performing the build, replacing GET req to each of the files
app.use(bodyParser.json());//middleware that works before the server handels the POST,GET req turns the body to Object of jason file

// // ----------------------------create a new doc--------------------------------------------------
function base64_encode(file) {
    // read binary data
    var bitmap = fs.readFileSync(file);
    // convert binary data to base64 encoded string
    return new Buffer(bitmap).toString('base64');
}

const recipe = new Recipe({
  recipe_name: 'סלט חציל וטחינה' ,
  short_desc: 'טעם אהוב של חציל שרוף בשילוב עם שום וטחינה איכותית' ,
  rate:  4,
  ingredients: [
    {amount: 2,   ingredient_name: 'חצילים בינוניים'},
    {amount: 3,   ingredient_name: 'פלחי שום'},
    {amount: 3,   ingredient_name: 'כוסות מים'},
    {amount: 0.5, ingredient_name: 'טחינה גולמית'},
    {amount: 1,   ingredient_name: 'כף מלח'},
    {amount: 3,   ingredient_name: 'כפות חומץ'}],

  steps: ['קוצצים את הבצלים לחתיכות בינוניות', 'מטגנים אותם עד שמקבלים בצע חום-צהבהב', 'מוסיפים את האורז ומטגנים כ-3 דקות נוספות','בינתיים מגרדים את העגבניות בבפומפייה ושומרים על הנוזלים','כשהאורז נהיה לבן והבצל מטוגן היטב מוסיפים את העגבניות המגורדות לסיר על אש בינונית ומערבבים היטב','מוסיפים את התבלינים (מלח,פלפל,פפריקה וסוכר) ומבשלים כ-3 דקות עד לספיגת הנוזלים של העגבניות','כשהנוזלים נספגו מוסיפים את המים ולאחר ערבוב קל סוגרים את הסיר ומבשלים כרבע שעה עד שהמים כמעט לגמרי נספגים', 'סוגרים את האש ומניחים בין המכסה לסיר מגבת עבה ומחכים עוד כ-5 דקות עד שהאדים נספגים.'],
  is_most_recommended: false,
  ready_in: {
    hours: 0,
    minutes: 30
  },
  difficulty: 'קל',
  category: ['גז','קל'] ,// Array of subdocuments
  img: base64_encode('./Client/Vardas_Kitchen_Project_New/src/assets/salad8.jpg')

});

recipe.save((err) => {
  if (err) {
    console.log(err);
  } else {
    Recipe.find((err,recipes) => {
      if(err){
        console.log(err);
      }
      else{
        console.log(recipes);
      }
    })
  }
});
