var express = require('express');
var router = express.Router();
const Record = require('../models/record');
const User = require('../models/user');
const crypto = require('crypto');

router.post('/signup/create',function(req,res,next){
    let inputPassword = req.body.password;
    let salt = Math.round((new Date().valueOf() * Math.random()))+"";
    let hashPassword = crypto.createHash("sha512").update(inputPassword+salt).digest("hex");

    const user = new User({
        id:req.body.id,
        password : hashPassword,
        name : req.body.name,
        salt : salt,
    });
    user.save((err)=>{
        console.log(user);
    })
    // console.log(user);
    res.json({body: "save"});
});


router.post('/signup/confirm',function(req,res,next){
    User.find({id : req.body.id}).then((user)=>{
        if(user.length ===1){
            res.json({success : "fail"});
        }
        else{
            res.json({success : "success"});
        }
    }).catch((err)=>{
        console.log(err);
    })
});

router.post('/login',async function(req,res,next){
    let result = await User.findOne({id : req.body.id});

    if(result===null){
        res.json({success : "fail"});
    }
    else{
        console.log(result);
        let dbPassword = result.password;
        let inputPassword = req.body.password;
        let salt = result.salt;
        let hashPassword = crypto.createHash("sha512").update(inputPassword + salt).digest("hex");

        if(dbPassword===hashPassword){
            console.log("비밀번호 일치");
            if(req.session.loginInfo===undefined){
                req.session.loginInfo = {
                    userIdNum : result._id,
                }
                req.session.save();
                res.json({success : "login", _id : result._id});
            }
        }
        else{
            res.json({success : "fail"});
        }
    }

});


router.get("/logout",function(req,res,next){
    req.session.destroy();
    res.clearCookie('sid');
    res.json({success : "logout 되었습니다."});
})

router.get('/myinfo/:id',function(req,res,next){
    User.findOne({_id : req.params.id}).then((user)=>{
        res.json({user:user});
    }).catch((err)=>{
        console.log(err);
    })
});

router.post('/myinfo/update/:id',function(req,res,next){

    let inputPassword = req.body.password;
    let salt = Math.round((new Date().valueOf() * Math.random()))+"";
    let hashPassword = crypto.createHash("sha512").update(inputPassword+salt).digest("hex");

    const update = {
        password : hashPassword,
        name : req.body.name,
        salt : salt,
    }

    User.findByIdAndUpdate(req.params.id, update, (err, user)=>{
        res.json({ err : err});
    }).catch((err)=>{
        console.log(err);
    });

});

router.get('/myinfo/delete/:id',function(req,res,next){
    // console.log(req.params.id);
    User.deleteOne({_id : req.params.id}).then((result)=>{
        Record.deleteMany({userIdNum : req.params.id}).then((res)=>{
            console.log(res);
            // res.json({result : res});
        }).catch((err)=>{
            console.log(err);
        })
        res.json({result : "success"});
    }).catch((err)=>{
        console.log(err);
    });
});



module.exports = router;