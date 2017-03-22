var express = require('express');
var router = express.Router();

var commentService = require('../service/comment');
var user = require('../service/user');
//var userService = require('../service/user');
//var weixinService = require('../service/weixin');

router.post('/', function(req, res, next) {
	var username = req.get('username');
	var body = req.body;
	var comment = body.comment;
	var picture = body.picture;
	var mobileNo = body.mobileNo;
	if (body.comment === undefined){
		res.send({"Message" : "null comment"});
	}else{
		commentService.addComment(username,comment,picture,mobileNo).then(function(data){
	//	userService.addComment(body).then(function(data){
			if (data.ok === true){
				res.send({"Message" : "comment added"});
			}else if (data === -200){
				res.send({"Message" : "Information not approved"});
			} else {
				res.send({"Message" : "fail to add comment"});
			}
		});
	}
});

router.get('/commentinfo', function(req, res, next) {
	commentService.getAllComment().then(function(data){
		res.send(data);
	});
});

module.exports = router;