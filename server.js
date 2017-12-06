//general imports
const mongoose = require('mongoose'); // import mongoose
const express = require('express'); // import express
const bodyParser = require('body-parser'); // import body parser- turn the response into jason file
const fs = require('fs');//helps dealing with files (like JSON.stringify etc)

const app = express();//creating express application
const router = express.Router();

const Recipe = require('./models/recipe');//recipe schema
const authentication = require('./models/authentication')(router);

//the protocol is mongodb and the port will be the default port of mongodb, VardasKitchendb- the name of the DB
mongoose.connect('mongodb://varda_db:varda_db@ds131384.mlab.com:31384/vardas_kitchen_project_db',  { useMongoClient: true });

//Returns middleware that only parses urlencoded bodies and only looks at requests where the Content-Type header matches the type option. This parser accepts only UTF-8 encoding of the body and supports automatic inflation of gzip and deflate encodings.
app.use(bodyParser.urlencoded({ extended: false}));//body-parser extract the entire body portion of an incoming request stream and exposes it on req.body.
//when extended is false the type of value in key:value is a String or an Array

//Returns middleware that only parses json and only looks at requests where the Content-Type header matches the type option. This parser accepts any Unicode encoding of the body and supports automatic inflation of gzip and deflate encodings.
app.use(bodyParser.json());//middleware that works before the server handels the POST,GET req turns the body to Object of jason file
app.use('/', express.static('./Client/Vardas_Kitchen_Project_New/dist'))//the dist folder will contain the production files,after performing the build, replacing GET req to each of the files
app.use('/authentication',authentication);// my own midleware to handel registration req


console.log("server is activated");


//-----------------------------req handler--------------------------------//

//get a specific recipe by its name
app.get('/api/specificRecipe/:recName', (req,res)=>{
  Recipe.find({recipe_name: req.params.recName.toString()}, (err,recipes) => {
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



// get all recipes which has the /:cat category
app.get('/api/search/:cat', (req,res)=>{
  console.log('all search results for', req.params.cat.toString());//Prints the log in the teminal (where the server is running)
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



// get all recipes which has the a propriate value in its tag list
app.get('/api/generalSearch/search/:val', (req,res)=>{
  console.log('general search for value: ', req.params.val.toString());//Prints the log in the teminal (where the server is running)
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
      res.writeHead(204);//204- succecfull response
    }
    res.end();
  });

});


//listen to port 3000, this way the app knows that this is a http protocol.
app.listen(3000);


//----------------------------create a new doc for upload an image to DB--------------------------------------------//
// function base64_encode(file) {
//     // read binary data
//     var bitmap = fs.readFileSync(file);
//     // convert binary data to base64 encoded string
//     return new Buffer(bitmap).toString('base64');
// }
