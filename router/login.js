var express = require('express');
var router = express.Router();

var mailService = require('../service/mailService');
var userService = require('../service/user');
var weixinService = require('../service/weixin');

router.get('/mail', function(req, res, next) {
  var mail = req.get('username');
  mailService.sendCode(mail).then(function(data){
    res.send({"message" : "The code was sent to " + mail});
  });
});

router.post('/', function(req, res, next) {
  var username = req.get('username'); // could be real username or wechat code
  var password = req.get('password');
  //console.log(password);
  if (password === undefined) { //wechat login
    weixinService.verify(username).then(function(body) {
      var wxbody = JSON.parse(body);
      if (wxbody.openid === undefined) { //wrong
        res.send({"status" : "200", "message": "failed to weixin"});
      //  res.send({"username" : wxbody.openid,"token" : "token","nickname" : "user.nickname","headimgurl" : "user.headimgurl"});
      } else {//pass
        userService.login(wxbody.openid, '').then(function(user) {
      //    console.log(user);
          if(user.nickname !== undefined){ //&& (user.headimg !== undefined)){
            res.send({"username" : wxbody.openid,"token" : user.token,"nickname" : user.nickname});//,"headimg" : user.headimg});
          }else{
              weixinService.getWeixinInfo(wxbody.openid,wxbody.access_token).then(function (data){
              var wxdata =JSON.parse(data);
              if (wxdata.openid !== undefined){
                var nickname = wxdata.nickname;
                var headimgurl = wxdata.headimgurl;
                weixinService.getHeaderInfo(headimgurl).then(function(header){
                  var info = {"nickname" : nickname};//, "headimg" : header};
                  userService.updateInfo(wxbody.openid,info).then(function(d){
                    if (d.ok === true){
                      res.send({"username" : wxbody.openid,"token" : user.token,"nickname" : wxdata.nickname})//,"headimg" : header})
                    } else {
                      res.send({"message" : "update error"});
                    }
                  });
                });
              } else {
                    res.send({"message" : "get weixin information error"});
                }
            });
          }
   //       res.send({"username" : wxbody.openid,"token" : token});
        });
      }
    });
  } else {
    userService.login(username, password).then(function(data) {
        console.log(data.token);
        if (data === 200) {
          res.send({"status" : "200", "message": "you input wrong password"});
        } else if (data == 201) {
          res.send({"status" : "201", "message" : "failed to create your account"});
        } else {
          res.send({"token" : data.token});
        }
      });
  }

  /*
  userService.getToken(mail, code).then(function(token) {
    if (token === '') {
      res.send({"status" : "failure", "token" : ""});
    } else {
      res.send({"status" : "success", "token" : token});
    }
  });
  */
});

/*
router.post('/weixin',function(req, res, next) {
  //
  var username = req.get('username');
  //var password = req.get('password');
  userService.getUserByName(username).then(function(user){
    if (user === ''){
      res.send({"message": "not logon with weixin"});
    }else{
      if((user.nickname !== undefined) && (user.headimgur !== undefined)){
        res.send({"nickname" : user.nickname, "headimgur" : user.headimgur});
      }else{
        var code = req.body;
        // add then
        weixinService.getWeixinInfo(username,code).then(function(wbody){
          if(wbody === 101){
            res.send({"message" : "101 code error"});
          }else if(wbody === 201){
            res.send({"message":"201 update error"});
          } else if(wbody === 202){
            res.send({"message" : "202 get weixin information error"});
          } else{
            var wxbody = JSON.parse(wbody);
            res.send({"nickname" : wxbody.nickname, "headimgur" : wxbody.headimgur})
          }
        })
      }
    }
  });

})
*/


module.exports = router;
