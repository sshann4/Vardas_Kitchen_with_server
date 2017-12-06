const User = require('../models/user');

module.exports = (router) => {

  router.post('/register', (req, res) => {
    // check if the user sended all the information needed- username,password and email
    if(!req.body.email){
      res.json({success: false, message:'you must provide an e-mail'});
    }else {
      if(!req.body.username){
        res.json({success: false, message:'you must provide a username'});
      } else {
        if(!req.body.password){
          res.json({success: false, message:'you must provide a password'});
        } else { //if all the information needed exist
          let user = new User({ //creates new user object
            email: req.body.email.toLowerCase(),
            username: req.body.username.toLowerCase(),
            password: req.body.password
          });
          user.save((err) => { //saves the user object to the db
            if(err){
              console.log(err);
              if(err.code === 11000){
                res.json({success: false, message: 'Username or e-mail already exist'});
              } else{
                if(err.errors){ //validation for email failed
                  if(err.errors.email){
                    res.json({success:false,message: err.errors.email.message});
                  }
                } else{
                  res.json({success: false, message: 'could not save user. Error: ',err});
                }
              }
            } else {
              res.json({success: true, message: 'User saved!'});
              res.send('hello');
            }
          });
        }
      }
    }
});

return router;

}
