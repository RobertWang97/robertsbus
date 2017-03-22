var cons = require('../config/constant');
var Cloudant = require('cloudant');
var cloudant = Cloudant({url : cons.CLOUDANT, plugin : 'promises'});
var mydb = cloudant.db.use('shuttlebus');
var user = require('./user');

var commentRepo ={
    'getAllComment': function(){
        return mydb.view("Comment", "commentByDate", {'include_docs' : true}).then(function(data){
            var comm = [];
            data.rows.forEach(function(d){
                var doc = d.doc;
                doc._id = undefined;
				doc._rev = undefined;
				doc.docType = undefined;
                comm.push(doc);
            });
            return comm;
        });
    },

    'getCommentByDate': function(date){
        //add
        return mydb.view("Comment", "commentByDate", {'key' : date, 'include_docs' : true}).then(function(data){
            var comm = [];
            data.rows.forEach(function(d){
                var doc = d.doc;
                doc._id = undefined;
				doc._rev = undefined;
				doc.docType = undefined;
                comm.push(doc);
            });
            return comm;
        });
    },
    'getCommentByName': function(username){
        //add
        return mydb.view("Comment", "commentByName", {'key' : username, 'include_docs' : true}).then(function(data){
            var comm = [];
            data.rows.forEach(function(d){
                var doc = d.doc;
                doc._id = undefined;
				doc._rev = undefined;
				doc.docType = undefined;
                comm.push(doc);
            });
            return comm;
        });
    },
    'addComment' : function (username,comment,picture,mobileNo) {
        var datenow = new Date();
        // var year = datenow.getFullYear();
        // var month = datenow.getMonth() + 1;
        // var day = datenow.getDate();
        // var hour = datenow.getHours();
        // var minutes = datenow.getMinutes();
        // var seconds = datenow.getSeconds();
        var date = datenow.toLocaleDateString();
        var time = datenow.toLocaleTimeString();
        //console.log(date);
        //var data = {'docType' : 'comment', 'site' : '大连','date': date, 'time' : time, 'username' : username,'serNo' : serNo,'phone' : phone, 'mail' : mail, 'comment': comment};  
        var data = {};
        data.docType = 'comment';
        data.site = '大连';
        data.username = username;
        data.date = date;
        data.time = time;
        data.comment = comment;
        data.picture = picture;
        data.mobileNo = mobileNo;
        return user.getUserByName(username).then(function (user){
            if (user.serNo === undefined || user.emailAddress === undefined){
                return -200;
            }
            data.serNo = user.serNo;
            data.emailAddress = user.emailAddress;
            if(mobileNo !== undefined){
                data.mobileNo = mobileNo;
            } else {
                data.mobileNo = user.mobileNo;
            }
            
            return mydb.insert(data).then(function(d){
                return d;
            });
        });
    },
    /*
    'updateComment' : function (username,comment,action){
        //
        
        return getCommentByName(username).then(function(comm){
            comments=[];
            if (comm.length !== 0) {
             //   comments = comm;
                comm.forEach(function(c){
                    comments.push(comm);
                })
            }
            if (action === 'REMOVE') {
                // update
            }
            return mydb.insert(comments).then(function(data){
                data.docType = undefined;
                return data;
            })
        })
    }
    */
}
var commentService ={
    'getCommentByDate': function(date){
        console.log(date);
        return commentRepo.getCommentByDate(date).then(function(data){
            // return data;
            return data.sort(function (a,b){
                var x = a.time;
                var y = b.time;
                if (x < y) return 1;
				if (x > y) return -1;
				return 0;
            });
        });
    },
    'getAllComment' : function(){
        //
        return commentRepo.getAllComment().then(function(data){
            // return data;
            return data.sort(function (a,b){
                var x = a.date + ' ' + a.time;
                var y = b.date + ' ' + b.time;
                if (x < y) return 1;
				if (x > y) return -1;
				return 0;
            })
        });
    },
    'addComment': function(username,comment,picture,mobileNo){
        return commentRepo.addComment(username,comment,picture,mobileNo);
    }
};
module.exports = exports = commentService;