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

//get a specific recipe
app.get('/api/specificRecipe/:recName', (req,res)=>{
  // console.log('the right recipe is:', req.params.recName.toString());
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

// get all recipes which has the /:id category
app.get('/api/generalSearch/:val', (req,res)=>{
  console.log('general search for value: ', req.params.val.toString());//Prints the log in the teminal (where the server is running)
  // res.write('text');// adds the 'text' to the body of the response

  //working: {rate: req.params.cat}
  Recipe.find({tags: req.params.val.toString()}, (err,recipes) => {
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


// // ----------------------------create a new doc--------------------------------------------------
function base64_encode(file) {
    // read binary data
    var bitmap = fs.readFileSync(file);
    // convert binary data to base64 encoded string
    return new Buffer(bitmap).toString('base64');
}

// console.log(base64_encode('./Client/Vardas_Kitchen_Project_New/src/assets/desert3.jpg'));

// const recipe = new Recipe({
//   recipe_name: 'סלט חציל וטחינה' ,
//   short_desc: 'טעם אהוב של חציל שרוף בשילוב עם שום וטחינה איכותית' ,
//   rate:  4,
//   ingredients: [
//     {amount: 2,   ingredient_name: 'חצילים בינוניים'},
//     {amount: 3,   ingredient_name: 'פלחי שום'},
//     {amount: 3,   ingredient_name: 'כוסות מים'},
//     {amount: 0.5, ingredient_name: 'טחינה גולמית'},
//     {amount: 1,   ingredient_name: 'כף מלח'},
//     {amount: 3,   ingredient_name: 'כפות חומץ'}],
//
//   steps: ['קוצצים את הבצלים לחתיכות בינוניות', 'מטגנים אותם עד שמקבלים בצע חום-צהבהב', 'מוסיפים את האורז ומטגנים כ-3 דקות נוספות','בינתיים מגרדים את העגבניות בבפומפייה ושומרים על הנוזלים','כשהאורז נהיה לבן והבצל מטוגן היטב מוסיפים את העגבניות המגורדות לסיר על אש בינונית ומערבבים היטב','מוסיפים את התבלינים (מלח,פלפל,פפריקה וסוכר) ומבשלים כ-3 דקות עד לספיגת הנוזלים של העגבניות','כשהנוזלים נספגו מוסיפים את המים ולאחר ערבוב קל סוגרים את הסיר ומבשלים כרבע שעה עד שהמים כמעט לגמרי נספגים', 'סוגרים את האש ומניחים בין המכסה לסיר מגבת עבה ומחכים עוד כ-5 דקות עד שהאדים נספגים.'],
//   is_most_recommended: false,
//   ready_in: {
//     hours: 0,
//     minutes: 30
//   },
//   difficulty: 'קל',
//   category: ['גז','קל'] ,// Array of subdocuments
//   img: base64_encode('./Client/Vardas_Kitchen_Project_New/src/assets/salad8.jpg')
//
// });
//
//
// const recipe = new Recipe({
//   recipe_name: 'אורז עם עגבניות' ,
//   short_desc: 'אורז אדום עם בצל ועגבניות טריות, אדמדם ומבריק. מתכון קליל וטעמים מדהימים שמשדרגים את האורז הלבן הפשוט',
//   rate:  5,
//   ingredients: [
//     {amount: 2,   ingredient_name: 'חצילים בינוניים'},
//     {amount: 3,   ingredient_name: 'פלחי שום'},
//     {amount: 3,   ingredient_name: 'כוסות מים'},
//     {amount: 0.5, ingredient_name: 'טחינה גולמית'},
//     {amount: 1,   ingredient_name: 'כף מלח'},
//     {amount: 3,   ingredient_name: 'כפות חומץ'}],
//
//   steps: [
//     'קוצצים את הבצלים לחתיכות בינוניות',
//     'מטגנים אותם עד שמקבלים בצע חום-צהבהב',
//     מוסיפים את האורז ומטגנים כ-3 דקות נוספות,
//     "בינתיים מגרדים את העגבניות בבפומפייה ושומרים על הנוזלים",
//     "כשהאורז נהיה לבן והבצל מטוגן היטב מוסיפים את העגבניות המגורדות לסיר על אש בינונית ומערבבים היטב",
//     "מוסיפים את התבלינים (מלח,פלפל,פפריקה וסוכר) ומבשלים כ-3 דקות עד לספיגת הנוזלים של העגבניות",
//     "כשהנוזלים נספגו מוסיפים את המים ולאחר ערבוב קל סוגרים את הסיר ומבשלים כרבע שעה עד שהמים כמעט לגמרי נספגים",
//     "סוגרים את האש ומניחים בין המכסה לסיר מגבת עבה ומחכים עוד כ-5 דקות עד שהאדים נספגים."
//
//
//   ],
//   is_most_recommended: false,
//   ready_in: {
//     hours: 0,
//     minutes: 30
//   },
//   difficulty: 'קל',
//   category: ['גז','קל'] ,// Array of subdocuments
//   img: base64_encode('./Client/Vardas_Kitchen_Project_New/src/assets/salad8.jpg')
//
// });
//
//
//    "recipe_name": ,
//    "short_desc": ,
//    "rate": 4,
//    "is_most_recommended": false,
//    "difficulty": "קל",
//    "category": [
//        "גז",
//        "קל"
//    ],
//    "ready_in": {
//        "hours": 0,
//        "minutes": 30
//    },
//    "steps": [
//
//    ],
//    "img": {
//        "data": "",
//        "contentType": ""
//    },
//    "ingredients": [
//        {
//            "amount": 3,
//            "ingredient_name": "בצלים בינוניים",
//            "_id": {
//                "$oid": "59b37c4d515839f8f1586c1a"
//            }
//        },
//        {
//            "amount": 3,
//            "ingredient_name": "עגבניות רכות",
//            "_id": {
//                "$oid": "59b37c4d515839f8f1586c19"
//            }
//        },
//        {
//            "amount": 1,
//            "ingredient_name": "כוסות אורז",
//            "_id": {
//                "$oid": "59b37c4d515839f8f1586c18"
//            }
//        },
//        {
//            "amount": 1.5,
//            "ingredient_name": "כוסות מים",
//            "_id": {
//                "$oid": "59b37c4d515839f8f1586c17"
//            }
//        },
//        {
//            "amount": 1,
//            "ingredient_name": "כף מלח,כף פלפל",
//            "_id": {
//                "$oid": "59b37c4d515839f8f1586c16"
//            }
//        },
//        {
//            "amount": 3,
//            "ingredient_name": "כפות פפריקה",
//            "_id": {
//                "$oid": "59b37c4d515839f8f1586c15"
//            }
//        },
//        {
//            "amount": 1,
//            "ingredient_name": "כף רסק עגבניות",
//            "_id": {
//                "$oid": "59b37c4d515839f8f1586c14"
//            }
//        },
//        {
//            "amount": 1,
//            "ingredient_name": "כף סוכר",
//            "_id": {
//                "$oid": "59b37c4d515839f8f1586c13"
//            }
//        }
//    ],
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

//---------------------------------------adding an image ----------------------------------//

//
// var imgPath = './client/Vardas_Kitchen_Project_New/src/assets/side6.jpg';
// Recipe.find({recipe_name: 'אורז עם עגבניות'}, (err,recipe) => {
//      if(err){
//        console.log(err);
//        res.writeHead(500);
//      } else{
//            console.log('recipe name: ', recipe.recipe_name);
//            recipe.img.contentType = 'image/png';
//            recipe.img.data = fs.readFileSync(imgPath);
//            recipe.save(function (err, a) {
//              if (err) throw err;
//              console.error('saved img to mongo');
//            })
//       }
// });

// app.get('/api/img/:recName', (req,res)=>{
//   // console.log('the right recipe is:', req.params.recName.toString());
//   Recipe.find({recipe_name:  req.params.recName.toString()}, (err,recipes) => {
//        if(err){
//          console.log(err);
//          res.writeHead(500);
//        } else{
//          console.log('recipe name: ', recipe.recipe_name);
//          recipe.img.contentType = 'image/png';
//          recipe.img.data = fs.readFileSync(imgPath);
//          recipe.save(function (err, a) {
//            if (err) throw err;
//            console.error('saved img to mongo');
//          })
//         }
//        res.end();//sends back the res,the client won`t get res if we wont end it
//      });
// });
