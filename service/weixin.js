
var querystring = require('querystring');
var request = require('request');
var user = require('./user');
var http = require("http");

// var appid =  "wx6fbc902da2ae9f87";
var appid =  "wx68eb4402975db540";
// var secret = "6e4554376e46c439c387c3104c85699c";
var secret = "2089c66cef16c602c6e1202aed0cf7d2";
var grant_type = "authorization_code";


var weixinRepo = {
    "getWeixinInfo" : function(openid,access_token){
                var data = querystring.stringify({
                    access_token: access_token,
                    openid: openid
                });
                return new Promise((resolve,reject) => {
                    request.get('https://api.weixin.qq.com/sns/userinfo?' + data,(err, res, body) => {
                        //console.log(data);
                        if (res) {
                            resolve(body);
                        } else{
                            reject(err);
                        }
                    });
                });
    },
    "getHeaderInfo" : function(url){
        return  new Promise(function(resolve,reject){
            http.get(url,function(res){
                var imgData = "";
                res.setEncoding("binary");
                res.on("data",function(data){
                    imgData+=data;
                });
                res.on("end",function(){
                    resolve(imgData);
                }).on("error",function(err){
                    reject(err);
                })
            });
        });
    },
};
var weixinService = {
    "verify" : function (code) {
        console.log(code);
        var data = querystring.stringify({
            appid: appid,
            secret : secret, 
            grant_type: grant_type,
            code : code

        });
      
        return new Promise((resolve, reject) => {
            request.get( 'https://api.weixin.qq.com/sns/oauth2/access_token?' + data, (err, res, body) => {
                if (res) {
                    resolve(body);
                } else {
                    reject(err);
                }
            });

        });
    },
    "getWeixinInfo" : function(openid,access_token){
        return weixinRepo.getWeixinInfo(openid,access_token);
    },
    "getHeaderInfo" : function(url){
        return weixinRepo.getHeaderInfo(url);
    }
};
module.exports = exports = weixinService;