const mongoose = require('mongoose'); // import mongoose
const express = require('express'); // import express
const bodyParser = require('body-parser'); // import body parser- turn the reaponse into jason file
const Recipe = require('./models/recipe');


mongoose.connect('mongodb://127.0.0.1/VardasKitchendb');//the protocol is mongodb and the port will be the default port of mongodb, VardasKitchendb- the name of the DB
const app = express();//creationg express application

app.use(express.static('./Client/Vardas_Kitchen_Project_New/dist'))//the dist folder will contain the production files,after performing the build, replacing GET req to each of the files
app.use(bodyParser.json());//middleware that works before the server handels the POST,GET req turns the body to Object of jason file

//get a specific recipe
app.get('/api/specificRecipe/:recName', (req,res)=>{
  console.log('the right recipe is:', req.params.recName.toString());
  Recipe.find({recipe_name:  req.params.recName.toString()}, (err,recipes) => {
       if(err){
         console.log(err);
         res.writeHead(500);
       } else{
        //  res.write(JSON.stringify(recipes));
         res.json(recipes);//will work the same as the previous line, the middlewere of the body-parser adds some functions to the res, contains also the "end" function.
       }
       res.end();//sends back the res,the client won`t get res if we wont end it
     });
});


// get all recipes which has the /:id category
app.get('/api/search/:cat', (req,res)=>{
  console.log('all search results for', req.params.cat.toString());//Prints the log in the teminal (where the server is running)
  // res.write('text');// adds the 'text' to the body of the response

  //working: {rate: req.params.cat}
  Recipe.find({category: req.params.cat.toString()}, (err,recipes) => {
       if(err){
         console.log(err);
         res.writeHead(500);
       } else{
        //  res.write(JSON.stringify(recipes));
         res.json(recipes);//will work the same as the previous line, the middlewere of the body-parser adds some functions to the res, contains also the "end" function.
       }
       res.end();//sends back the res,the client won`t get res if we wont end it
     });
});



app.post('/api/post', (req,res)=> {
  const recipe = new Recipe(req.body);
  //   {recipe_name: 'אורז עם עגבניות' ,
  //   short_desc: 'אורז אדום עם בצל ועגבניות טריות, אדמדם ומבריק. מתכון קליל וטעמים מדהימים שמשדרגים את האורז הלבן הפשוט' ,
  //   rate:  4,
  //   ingredients: [
  //     {amount: 3,   ingredient_name: 'בצלים בינוניים'},
  //     {amount: 3,   ingredient_name: 'עגבניות רכות'},
  //     {amount: 1,   ingredient_name: 'כוסות אורז'},
  //     {amount: 1.5, ingredient_name: 'כוסות מים'},
  //     {amount: 1,   ingredient_name: 'כף מלח,כף פלפל'},
  //     {amount: 3,   ingredient_name: 'כפות פפריקה'},
  //     {amount: 1,   ingredient_name: 'כף רסק עגבניות'},
  //     {amount: 1,   ingredient_name: 'כף סוכר'}],  // Array of subdocuments
  //   steps: ['קוצצים את הבצלים לחתיכות בינוניות', 'מטגנים אותם עד שמקבלים בצע חום-צהבהב', 'מוסיפים את האורז ומטגנים כ-3 דקות נוספות','בינתיים מגרדים את העגבניות בבפומפייה ושומרים על הנוזלים','כשהאורז נהיה לבן והבצל מטוגן היטב מוסיפים את העגבניות המגורדות לסיר על אש בינונית ומערבבים היטב','מוסיפים את התבלינים (מלח,פלפל,פפריקה וסוכר) ומבשלים כ-3 דקות עד לספיגת הנוזלים של העגבניות','כשהנוזלים נספגו מוסיפים את המים ולאחר ערבוב קל סוגרים את הסיר ומבשלים כרבע שעה עד שהמים כמעט לגמרי נספגים', 'סוגרים את האש ומניחים בין המכסה לסיר מגבת עבה ומחכים עוד כ-5 דקות עד שהאדים נספגים.'],
  //   is_most_recommended: false,
  //   ready_in: {
  //     hours: 0,
  //     minutes: 30
  //   },
  //   difficulty: 'קל',
  //   category: ['גז','קל'] ,// Array of subdocuments
  // });

  recipe.save((err) => {
    if (err) {
      res.writeHead(500);
    } else {
      res.writeHead(204);//204- succecfull response with no nody
    }
    res.end();
  });

});

//listen to port 3000, this way the app knows that this is a http protocol.
app.listen(3000);



//
// // ----------------------------create a new doc -for checking--------------------------------------------------
// const recipe = new Recipe({
//   recipe_name: 'אורז עם עגבניות' ,
//   short_desc: 'אורז אדום עם בצל ועגבניות טריות, אדמדם ומבריק. מתכון קליל וטעמים מדהימים שמשדרגים את האורז הלבן הפשוט' ,
//   rate:  4,
//   ingredients: [
//     {amount: 3,   ingredient_name: 'בצלים בינוניים'},
//     {amount: 3,   ingredient_name: 'עגבניות רכות'},
//     {amount: 1,   ingredient_name: 'כוסות אורז'},
//     {amount: 1.5, ingredient_name: 'כוסות מים'},
//     {amount: 1,   ingredient_name: 'כף מלח,כף פלפל'},
//     {amount: 3,   ingredient_name: 'כפות פפריקה'},
//     {amount: 1,   ingredient_name: 'כף רסק עגבניות'},
//     {amount: 1,   ingredient_name: 'כף סוכר'}],  // Array of subdocuments
//   steps: ['קוצצים את הבצלים לחתיכות בינוניות', 'מטגנים אותם עד שמקבלים בצע חום-צהבהב', 'מוסיפים את האורז ומטגנים כ-3 דקות נוספות','בינתיים מגרדים את העגבניות בבפומפייה ושומרים על הנוזלים','כשהאורז נהיה לבן והבצל מטוגן היטב מוסיפים את העגבניות המגורדות לסיר על אש בינונית ומערבבים היטב','מוסיפים את התבלינים (מלח,פלפל,פפריקה וסוכר) ומבשלים כ-3 דקות עד לספיגת הנוזלים של העגבניות','כשהנוזלים נספגו מוסיפים את המים ולאחר ערבוב קל סוגרים את הסיר ומבשלים כרבע שעה עד שהמים כמעט לגמרי נספגים', 'סוגרים את האש ומניחים בין המכסה לסיר מגבת עבה ומחכים עוד כ-5 דקות עד שהאדים נספגים.'],
//   is_most_recommended: false,
//   ready_in: {
//     hours: 0,
//     minutes: 30
//   },
//   difficulty: 'קל',
//   category: ['גז','קל'] ,// Array of subdocuments
// });
//
// recipe.save((err) => {
//   if (err) {
//     console.log(err);
//   } else {
//     Recipe.find((err,recipes) => {
//       if(err){
//         console.log(err);
//       }
//       else{
//         console.log(recipes);
//       }
//     })
//   }
// });
//
// // {recipe_name: 'אורז עם עגבניות'},
