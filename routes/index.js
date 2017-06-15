var express = require('express');
var router = express.Router();
var fs = require("fs");
var nodemailer = require("nodemailer");
// var gutil = require('gulp-util');
var http = require("http");
var MongoClient = require('mongodb').MongoClient,
    assert = require('assert');
var ObjectId = require('mongodb').ObjectID;
var url = 'mongodb://127.0.0.1:27017/sbsdata';
/* GET home page. */
//var smtpTransport = require('nodemailer-smtp-transport');


var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'surbhij.sbsgroup@gmail.com',
    pass: '9993345249'
  }
});


router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});



router.get('/get-mainData', function(req,res){
  MongoClient.connect(url,function(err,db){
    assert.equal(err,null);
     db.collection('testimonials').find({}).sort({ $natural: -1 }).limit(5).toArray(function(error, dataOne){
          console.log(dataOne);
         db.collection('services').find({}).toArray(function(error, dataTwo){
            console.log(dataTwo);
           db.collection('portfolio').find({}).sort({ $natural: -1 }).limit(9).toArray(function(error,dataThree){
              console.log(dataThree);
            res.json({
                dataOne: dataOne,
                dataTwo: dataTwo,
                dataThree :dataThree
            });
            db.close();
         });
     });
    });

   })
});



router.get('/get-testimonial' ,function(req, res, next) { 

MongoClient.connect(url,function(err,db){
    assert.equal(err,null);
    var collection = db.collection('testimonials');
    collection.find({}).toArray(function(err,docs){
       assert.equal(err,null);
          console.log(docs);
     //res.setHeader('Content-Type', 'application/json');
          res.json(docs);
      db.close();
    }); 
});

});

router.get('/get-portfolio' ,function(req, res, next) { 

MongoClient.connect(url,function(err,db){
    assert.equal(err,null);
    var collection = db.collection('portfolio');
    collection.find({}).toArray(function(err,docs){
    assert.equal(err,null);
     console.log(docs);
     //res.setHeader('Content-Type', 'application/json');
   res.json(docs);
    db.close();
    }); 
});

});

router.post('/sendmail',function(req,res,next){
   console.log("gdjs");

	var mailOptions = {
    from: req.body.email, // sender address
    to: 'surbhij.sbsgroup@gmail.com', // list of receivers
    subject: 'Email Example', // Subject line
    text: req.body.message //, // plaintext body
    // html: '<b>Hello world ✔</b>' // You can choose to send an HTML body instead
};
  console.log(mailOptions);
    transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {


    res.end("mail sent");
   // console.log('Email sent: ' + info.response);


  }
});


})


router.get('/get-data/:uid',function(req, res, next) {
 
    
MongoClient.connect(url,function(err,db){
    assert.equal(err,null);
    var collection = db.collection('portfolio');
    collection.find({'_id':ObjectId(req.params.uid)}).toArray(function(err,docs){
    assert.equal(err,null);
     //res.setHeader('Content-Type', 'application/json');
   res.json(docs);
   //res.sendStatus(200);
    db.close();
    }); 
});




});




module.exports = router;
