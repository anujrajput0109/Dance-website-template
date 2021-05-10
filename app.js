const express =require("express");
const path =require("path");
const bodyparser =require("body-parser");
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/DanceContactFormDetails', {useNewUrlParser: true, useUnifiedTopology: true});
const app=express();
const port=80;


const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("Connection is made");
});


//Define mongoose Schema
const userDetailSchema = new mongoose.Schema({
    name: String,
    phone: Number,
    email: String,
    address: String,
    desc: String
  });
// coverting schema to model
const userDetails = mongoose.model('userDetails', userDetailSchema);


// express specific stuff
app.use('/static',express.static('static'));
app.use(express.urlencoded());



// pug specific stuff
app.set('view engine','pug');
app.set('views',path.join(__dirname,'views'));

//Serving end points
app.get('/',(req,res)=>{
    const con='Const con';
    const params={'title':'Pubg is best game','content':con};
    res.status(200).render('index.pug',params);
});
app.get('/contact',(req,res)=>{
    res.status(200).render('contact.pug');
});
//post request for contact form details
app.post('/contact',(req,res)=>{
    var myData= new userDetails(req.body);
    myData.save().then(()=>{
        res.send("This has been saved to database");
    }).catch(()=>{
        res.status(400).send("Item was not sent to database")
    })
});



//Start the server
app.listen(port,()=>{
    console.log(`The application has started successfully on port ${port}`);
});