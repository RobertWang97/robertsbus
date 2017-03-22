var cons = require('../config/constant');
var userService = require('./user');
var helper = require('sendgrid').mail;
var from_email = new helper.Email('shuttlebus@cn.ibm.com');
// var to_email = new helper.Email('test@example.com');
var subject_code = '[ShuttleBus]Your access code';
var subject_audit = '[ShuttleBus]Your profile status';
// var content = new helper.Content('text/plain', 'Hello, Email!');
// var mail = new helper.Mail(from_email, subject, to_email, content);

var sg = require('sendgrid')(cons.SENDGRID_KEY);



var mailService = {
  'sendCode' : function (mail) {
    var to_email = new helper.Email(mail);
    return userService.getCode(mail).then(function(code){
      var content = new helper.Content('text/plain', 'This is your login code : ' + code);
      var mail = new helper.Mail(from_email, subject_code, to_email, content);
      var request = sg.emptyRequest({
        method: 'POST',
        path: '/v3/mail/send',
        body: mail.toJSON(),
      });
      sg.API(request, function(error, response) {
        // console.log(response.statusCode);
        // console.log(response.body);
        // console.log(response.headers);
      });
      return true;
    });
  },
   'sendAudit' : function (username) {
    return userService.getUserByName(username).then(function(d){
      var to_email = new helper.Email(d.emailAddress);
      var content = new helper.Content('text/plain', 'Your profile status : ' + d.status + '\n comments:' + d.comments);
      var mail = new helper.Mail(from_email, subject_audit, to_email, content);
      var request = sg.emptyRequest({
        method: 'POST',
        path: '/v3/mail/send',
        body: mail.toJSON(),
      });
      //return sg.API(request, function(error, response) {
      return sg.API(request).then(function (response){
        return response.statusCode;
      }).catch(function (error) {
        console.log('Error response received ' + error);
        return -1;
      });
    });
  }
};

// mailService.sendCode('jianjunw@cn.ibm.com').then(function(data) {
  // console.log(data);
// });
module.exports = exports = mailService;
