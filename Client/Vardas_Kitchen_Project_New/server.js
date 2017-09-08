const mongoose = require('mongoose');//import mongoose
mongoose.connect('mongodb://localhost/VardasKitchendb');//the protocol is mongodb and the port will be the default port of mongodb, VardasKitchendb- the name of the DB

var Cat = mongoose.model('Recipe', { name: String });//the schema structure, what is the records structure? recipe-the name of the

var kitty = new Cat({ name: 'Zildjian' });
kitty.save(function (err) {
  if (err) {
    console.log(err);
  } else {
    console.log('meow');
  }
});
