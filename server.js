const express= require('express');
const app =express();
app.use(express.json());
require('dotenv').config({ path: './config.env' });


// connect database
const mongoose = require('mongoose');
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((res) => console.log('DB is connected'))
  .catch((err) => console.log(err));

  //import our model 
const User = require('./Models/User');


//it will be better and more cleaner to our code to  create new folder for routers but checkpoint  asked to put routers here so..
const router = express.Router();

//we will use Put a new user that contain a first name last name and an age as we specified in the schema
// the data that we will add we will take from the req body in the postman
app.use('/user',router.post('/addinguser', (req, res) => {
  const newUser = req.body;
  const newPerson = new User(newUser);
  newPerson
    .save()
    .then(() => res.send('user register'))
    .catch((err) => res.status(400).json(err.message));
}));


//we will display all the users bu using find()
app.use('/user',router.get('/allusers', (req, res) => {
    User.find()
      .then((data) => res.json(data))
      .catch((err) => res.status(400).json(err.message));
  }));

//find a user by id and update it! 
app.use('/user',router.put('/updateuser/:id', (req, res) => {
  const updateData = req.body;
  User.findByIdAndUpdate(req.params.id, updateData)
    .then((data) => res.json('user is updated'))
    .catch((err) => res.status(400).json(err.message));
}));

//find a user by id and delete it! 
app.use('/user',router.delete('/deleteuser/:id', (req, res) => {
  
  User.findByIdAndDelete(req.params.id)
    .then((data) => res.json('job done!,user deleted'))
    .catch((err) => res.status(400).json(err.message));
}));



const PORT = process.env.PORT || 5000;
app.listen(PORT, (err) =>
  err ? console.log(err) : console.log('server is running on port', PORT)
);  