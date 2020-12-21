var express = require('express');
var router = express.Router();
const Record = require('../models/record');
const User = require('../models/user');

router.post('/create', function(req,res,next){
    const newRecord = new Record({
        title : req.body.title,
        date : req.body.date,
        time : req.body.time,
        treatInfo : req.body.treatInfo,
        userIdNum : req.body.userIdNum,
    });

    newRecord.save((err)=>{
        console.log(err);
    });

    res.json({body: "save"});
})

router.get('/read/:id',function(req,res,next){
    // console.log(req.params.id);
    Record.findById(req.params.id).then((record)=>{
        res.json({record:record});
    }).catch((err)=>{
        console.log(err);
    })
});

router.post('/update/:id',function(req,res,next){
    // console.log(req.params.id);
    Record.findByIdAndUpdate(req.params.id, req.body, (err, record)=>{
        res.json({ err : err});
    });
});

router.get('/delete/:id',function(req,res,next){
    // console.log(req.params.id);
    Record.deleteOne({_id : req.params.id}).then((result)=>{
        res.json({ result:"success"});
    });
});

router.get('/search/name/:id/:name',function(req,res,next){
    const param= decodeURIComponent(req.params.name);
    // console.log(param);
    Record.find({userIdNum : req.params.id,title : new RegExp(req.params.name, 'i')}).then((record)=>{
        console.log(record);
        res.json({record:record});
    }).catch((err)=>{
        console.log(err);
    })
});

router.get('/search/content/:id/:name',function(req,res,next){
    const param= decodeURIComponent(req.params.name);
    // console.log(param);
    Record.find({userIdNum : req.params.id,treatInfo :new RegExp(req.params.name, 'i')}).then((record)=>{
        // console.log(record);
        res.json({record:record});
    }).catch((err)=>{
        console.log(err);
    })
});

module.exports = router;
