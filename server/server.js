const express = require('express')
const jwt = require('jsonwebtoken')
const app = express()
const mongoose = require('mongoose');
const cors = require('cors');  
const nodemailer = require('nodemailer');
const UserModel = require('./models/User')

// middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.json());
app.use(cors());


mongoose.connect("mongodb+srv://shreyas:5.zK2HTQU_z7Tvw@forgotpassword.p2twimd.mongodb.net/?retryWrites=true&w=majority", { useNewUrlParser: true })
.then(()=> console.log("Mongodb successfully connected"))

const JWT_SECRET = 'some super secret'
var user = null;

app.get('/', (req, res) => {
  res.send("Welcome")
})

app.post('/forgot-password', async (req, res, next) => {
    const {email} = req.body;
    // console.log(email);
    user = await UserModel.findOne({email: email}).exec();
    console.log(user)
    if(user == null){
      res.send('User not registered')
      return
    }
    //user exists and create a one time link valid for 15 mins.
    const secret = JWT_SECRET + user.password
    const payload = {
        email: user.email,
        id: user._id
    }
    const token = jwt.sign(payload, secret, {expiresIn: '15m'})
    const link = `http://localhost:3000/reset-password/${user._id}/${token}`
    console.log(link);

    var transporter = nodemailer.createTransport({
      service: 'outlook',
      auth: {
        user: 'shreyassp17@outlook.com',
        pass: '2491972Ab#'
      }
    });
    
    var mailOptions = {
      from: 'shreyassp17@outlook.com',
      to: email,
      subject: 'Password reset link',
      text: `Your password reset link is ${link}`
    };

    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
        res.send(error);
      } else {
        console.log('Email sent: ' + info.response);
        res.send('Password reset link valid for 15 minutes has been sent to your email. ')
      }
    });
})

// app.get('/reset-password/:id/:token', (req, res) => {
//   const {id, token} = req.params;

//   // check if id exists in database
//   if(id != user._id) {
//       res.send('Invalid id')
//       return;
//   }

//   // we have a valid id and we have a valid user with this id
//   const secret = JWT_SECRET + user.password
//   try{
//       const payload = jwt.verify(token, secret)
//       res.render('reset-password', {email: user.email})
//   }
//   catch(error){
//       console.log(error.message)
//       res.send(error.message)
//   }
// })

app.post('/reset-password/:id/:token', async (req, res, next) => {
  const {id, token} = req.params;
  const {pass1, pass2} = req.body;
  console.log(pass1, pass2);

   // check if id exists in database
   console.log(id, user.id);
   if(id !== user.id) {
      res.send('Invalid id')
      return;
  }

  // we have a valid id and we have a valid user with this id
  const secret = JWT_SECRET + user.password
  

  try {
      const payload = jwt.verify(token, secret)

      // we can simply find the user with the payload email and id and finally update with new password
      //always hash the password before saving
      const User = await UserModel.findById(id)
      User.password = pass2;
      await User.save();
      res.send(User)
      // console.log(User)

  }
  catch(error) {
      console.log(error.message)
      res.send(error.message)
  }
  
})


app.listen(4001, () => console.log("Server started on port 4001"))