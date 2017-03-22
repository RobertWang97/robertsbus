var express = require('express');
var router = express.Router();
//var userService = require('../service/user');
var adminService = require('../service/admin');
var mailService = require('../service/mailService');
var userService = require('../service/user')

//2017-03-22 Robert added router for statistics
router.get('/statistics?:date', function (req, res, next) {

	var fromDate = req.query['from'];
    var toDate = req.query['to'];

    adminService.getStatistics(fromDate, toDate).then(function(data){
      res.send(data);
	});
});

router.get('/audit/info', function(req, res, next) {
	adminService.getUnapprovedList().then(function(data){
      res.send(data);
	});
});

router.post('/audit', function(req, res, next) {
  //body sample data {"username" : "dlcc","status" : "approve","comments" : "ok"}
	var adminname = req.get('username');
	var body = req.body;
  adminService.getByName(adminname).then(function(data){
 //   console.log(data);
  if (data !== '') {
     var username = body.username;
     body.approveadmin = adminname;
     body.auditdate = new Date().toLocaleDateString();
    //  console.log(body);
     userService.addInfo(username, body).then(function(info){
      //  console.log(info);
      //  console.log(body);
      //  console.log(username);
      //  console.log(body.status);
       if(info.ok === true){
         if (body.status !== 'approve'){
           mailService.sendAudit(username).then(function (mail) {
             if (mail === 202) {
              res.send({"message" : "you have audited the status. mail sent to " + username});
             } else {
               res.send({"message" : "you have audited the status, but mail not send unsuccessfully"});
             }
            
           });
          
         } else {
          userService.getInfoByName(username).then(function(userinfo) {
            userService.updateInfo(username, userinfo).then(function (user) {
              if (user.ok === true) {
                console.log("start to delete");
                userService.deleteInfo(username).then(function (del) {
                  console.log(del);
                  if (del.ok === true) {
                    mailService.sendAudit(username).then(function (mail) {
                      if(mail === 202){
                        res.send({"message" : "you have audited the status. mail sent to " + username});
                      } else {
                        res.send({"message" : "you have audited the status, but mail send unsuccessfully"});
                      }
                      
                    })
                  } else {
                    res.send({"message" : "information delete unsuccessfully"})
                  }
                });
              }
              else {
                res.send({"message" : "failed to audit."});
              }
            });
          });
         }
         
       } else {
         res.send({"message" : "failed to audit."});
       }
      //  if(info.status !== 'approve'){
      //    console.log("not approve");
      //    userService.addInfo(username, body).then(function(unapprove){
      //      console.log("not approve");
      //      if(unapprove.ok === true) {
      //        res.send({"message" : "you have audited the status."});
      //      } else {
      //        res.send({"message" : "failed to audit."});
      //      }
      //    });
      //  } else {
      //   userService.updateInfo(username, body).then(function (approve){
      //     if (approve.ok === true) {
      //       console.log(approve);
      //       res.send({"message" : "you have audited the status."});
      //     // userService.deleteInfo(username).then(function (d){
      //     //   if (d.ok === true) {
      //     //     res.send({"message" : "you have audited the status."});
      //     //   }
      //     //   else {
      //     //     res.send({"message" : "information delete unsuccessfully"})
      //     //   }
      //     // });  
      //     } else {
      //       res.send({"message" : "failed to audit."});
      //     }
    	//   });
      //  }
       //adminService.auditUser(username, body).then(function(data){
       //userService.getUserByName(username).then(function (user))
        
     });   
   }else{
      res.send({'message' : 'you do not have authority to audit.'});
   }
  });
});

router.get('/:site', function(req, res, next) {
  var site = req.params['site'];
  adminService.getBySite(site).then(function(data) {
    res.send(data);
  });
});

router.post('/mail', function(req, res, next) {
  var body = req.body;
	body.username.forEach(function(d){
	    var user = d;
      mailService.sendAudit(user).then(function(data){ 
     });
	});
  res.send({'message': 'mail sent'});
});

module.exports = router;
