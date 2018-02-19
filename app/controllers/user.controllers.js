var path = require('path');
const user = require("../models/user.model");
const forgetModel = require("../models/forget.model");
const jwt    = require('jsonwebtoken');
const express = require("express");
const nodemailer = require("nodemailer");
const xoauth2 = require('xoauth2');
const smtpTransports = require('nodemailer-smtp-transport');
const jwtConfig = require("../../config/jwt.config");

exports.register = (req, res)=>{
    console.dir(req.body);
    user.count({email: req.body.email}, (err, result)=>{
     
        if(result){
            res.json({
                error: true,
                message: 'email already exist',
         });
        } else{

            user.count({username: req.body.username}, (err, result)=>{
                
        if(result){
            res.json({
                error: true,
                message :'username already exist',
         })
        }
         else{
            user.create(req.body)
            
            .then(small=> {
                
                    res.status(200).json({
                        success: true,
                        message: 'You have successfully  registered',
                        id: small._id
                    });
                
            })            
            .catch(err=> {
                console.error('Oh No', err)
              });
        
    }

    });
    
    
};
    })
}

exports.login = (req, res)=>{
user.findOne({ 
    email :req.body.email
}, (err, user)=>{
    if(err){
        console.dir(err);
                    res.status(500).json({
                        error: err,
                 });
    }else{
        if (!user) {
            res.json({ success: false, message: 'Authentication failed. Wrong credentials.' });
          } else if (user) {
      
            // check if password matches
            user.comparePassword(req.body.password, (err, success)=>{
            if(err){
                res.json({ success: false, message: 'Authentication failed. Wrong credentials.' });
            } 
            if(success){
                const payload = {
                    userId: user._id,
                    username : user.username,
                    firstname : user.firstname,
                    lastname : user.lastname,
                    avatar : user.avatar,
                    email : user.email 
                  };
                  console.dir(payload);
                      jwt.sign({ user: payload   }, jwtConfig.secret, {expiresIn: '3h'}, (err, token)=>{
                            // return the information including token as JSON
                            if(err){
                                res.json({
                                    success: false,
                                    error : err
                                });
                            }
                      res.json({
                        success: true,
                        message: 'You have logged in successfully',
                        token: token
                      });
                      });
              
                      
                    } 
    });


};
};
});
}

exports.forget = (req, res)=>{
    
    let text = [];
    let data = "";
    user.findOne({email:req.body.email}, (err, results) =>{
       
        var userEmail = results.email;
      
       if(!err){

        forgetModel.find({userid: results._id}, (err, users)=>{
           
            if(users){
                users.forEach(element => {
                forgetModel.findOneAndRemove({userid: element.userid}, (err, u)=>{
                    
                });
                    
                });
            }
        });
      var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    
      for (var i = 0; i < 300; i++){
        text[i] = possible.charAt(Math.floor(Math.random() * possible.length));
      }
      text = text.join('');
      
      forgetModel.create({userid:results._id, code : text}, (err, done)=>{
          if(!err){

            var smtpTransport = nodemailer.createTransport(smtpTransports({
                service: 'gmail',
                auth: {
                   xoauth2 : xoauth2.createXOAuth2Generator({
                    user : 'bytenaija@gmail.com',
                    clientId : jwtConfig.GM_Client_ID,
                    clientSecret : jwtConfig.GM_Client_Secret,
                    refreshToken : jwtConfig.GM_Refresh_token
                   })
                },
                tls: {
                    rejectUnauthorized: false
                }

            }));
          var  textHtml= '<h2>Password Reset Request</h2> <p>Dear Crimemap User,</p><p> We have received your request to reset your password. Please click the link below to complete the reset:</p> <p><a href="http://localhost:3000/api/user/forget/' + results._id + '/' + text + '"><button>Reset My Password</button></a></p>'
            textHtml += '<p>If you need additional assistance, or you did not make this change, please contact bytenaija@gmail.com.</p>' 
            textHtml += '<p>if the button above does not work, copy the link below into your browser<br> http://localhost:3000/api/user/forget/' + results._id + '/' + text + '</p>';
            textHtml += '<p>The Crimemap Team</p>';

           
            var mailOptions = {
                to: userEmail,
                from: 'bytenaija@gmail.com',
                subject: 'Password Recovery',
                html : textHtml
            };
            smtpTransport.sendMail(mailOptions, function(err){
                if(err){
                    console.dir(err);
                    res.status(500).json({err});
                }else{

                    res.status(200).json({
                        message: 'An email has been sent to ' + userEmail + ' with further instructions.'
                        
                    });

                }
            });


          }
      }
    )
}else{
    res.json({
        message: "We have sent you an email to reset your password user: " + req.params.userId,
    
    })
}      
    });
    
   
};

exports.getUser = (req, res)=>{
    user.find({})
    .exec()
    .then(results =>{
        res.json(results);
    });
};


exports.verifyToken = (req, res, next)=>{
   
    const bearerHeader = req.headers.authorization;
    
    if(typeof bearerHeader === 'undefined'){
                res.status(403).json({forbidden:"forbidden", login:false});
    }else{
        const bearer =  bearerHeader.split(" ");
        const token = bearer[1];
        console.dir(token);
        req.token = token;
        next();
    }
   
}

exports.verifyForgetCode = (req, res)=>{
    const forgetCode = req.params.codeId;
    const user_id = req.params.userId;

    console.dir(user_id);
    console.dir(forgetCode);

    forgetModel.findOne({userid : user_id, code : forgetCode}, (err, result)=>{
        if(err){
            res.status(500).json({
                error:true,
                message : err
            });
        }else{
            if(result){
                forgetModel.findOneAndRemove({userid: result.userid}, (err, u)=>{
                    res.status(200).json({
                        success:true,
                        message : "The code is valid",
                        userId : user_id
                    });
                    
                });
            }else{
                res.status(403).json({
                    success:false,
                    message : "The request code does not exist or has expired. Try resetting your password again"
                });
            }
            
        }
    });

};

exports.changePassword = (req, res)=>{
    const user_id = req.params.userId;
    user.findById(user_id, (err, result)=>{
        if(result){
            console.dir(result);
            result.password = req.body.password;
            result.save((err, result, num)=>{
                if(err){
                    res.status(500).json({
                        error:true,
                        message : err
                    });
                }else{
                    if(result){
                        res.status(200).json({
                            success : true,
                            message: "You have successfully changed your password"
                        });
                    }else{
                        res.status(403).json({
                            success : false,
                            message: "We could not change your password, try resetting it again."
                        });
                    }
                }
            })
        }
    });
};

exports.uploadAvatar = (req, res)=>{
   // console.dir(req.file);
    file = req.file.path;
    res.json({
        file
    }
    )
};

exports.getImage = (req, res) =>{
    console.dir(req.params.userId);
user.findById(req.params.userId)
.exec()
.then(result =>{
    res.sendFile(path.join(__dirname, "..", "..",result.avatar));
})

.catch(err =>{
    console.log(err);
});
}