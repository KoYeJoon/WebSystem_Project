var express = require('express');
var router = express.Router();
const Record = require('../models/record');
const User = require('../models/user');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({username : 'yejoon'});
});


router.get('/todolist/read/:id/:date',function(req,res,next){
  Record.find({userIdNum : req.params.id, date : req.params.date}).then((record)=>{
    res.json({record:record});
  }).catch((err)=>{
    console.log(err);
  })
})
router.get('/recordlist/:id',function(req,res,next){
  Record.find({userIdNum : req.params.id}).then((record)=>{
    res.json({record: record});
  }).catch((err)=>{
    console.log(err);
  })
})

module.exports = router;
