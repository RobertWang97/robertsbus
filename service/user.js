var cons = require('../config/constant');
var Cloudant = require('cloudant');
var cloudant = Cloudant({url : cons.CLOUDANT, plugin : 'promises'});
var mydb = cloudant.db.use('shuttlebus');

var uuid = require("uuid");
function getRandomNumber () {
  return (Math.round(Math.random() * 10000000) + '0').substr(0,4);
}

var userRepo = {
	'getUserDoc' : function (mail) {
			return mydb.view("User", "all", {'key' : mail, 'include_docs' : true}).then(function(data){
        if (data.rows.length === 1) {
          var d = data.rows[0].doc;
          return d;
        } else {
          return '';
        }
		});
	},
	'getUserByName' : function(username) {
		return mydb.view("User", "getByUserName", {'key' : username, 'include_docs' : true}).then(function(data){
      //  console.log(data.rows.length);
	        if (data.rows.length === 1) {
	          var d = data.rows[0].doc;
	          return d;
	        } else {
	          return '';
	        }
			});
	},
    'add' : function (username) {
      var data = {'mail' : username, 'docType' : 'user',  'code' : getRandomNumber(), 'token' : uuid.v4(), 'site' : '大连'};
      return mydb.insert(data).then(function(d) {
        data.docType = undefined;
        return data;
      });
    },
    'addNew' : function (username, password) {
    	var data = {'username' : username, 'docType' : 'user',  'password' : password, 'token' : uuid.v4(), 'site' : '大连'};
        return mydb.insert(data).then(function(d) {
          data.docType = undefined;
          return data;
        });
    },

    'getInfoByName' : function(username) {
      return mydb.view("User", "userInformation", {'key' : username, 'include_docs' : true}).then(function(data){
        //console.log(data);
        if (data.rows.length === 1) {
          var d = data.rows[0].doc;
          return d;
        } else {
          return '';
        }
      });
    },

    'addInfo' : function (username, info) {
      return userRepo.getInfoByName(username).then(function (user){
        info.updatedate = new Date().toLocaleDateString();
        if (user === '') {
          console.log("new user");
          var data = info;
          data.username = username;
          data.docType = 'userInfo';
          data.status = 'pending';
          console.log(data);
          return mydb.insert(data).then(function(d) {
            return d;
          });
        } else {
          console.log("old user");
          var docUniqueId = user._id;
					var docRevNum = user._rev;
          var docType = user.docType;
          for (var i in info){
            user[i] = info[i];
          }
          user._id = docUniqueId;
          user._rev = docRevNum;
          user.docType = docType;
          return mydb.insert(user).then(function (d){
            return d;
          })
        }
      });
      // var data = info;
      // data.username = username;
      // data.docType = 'userInfo';
      // // return userRepo.getInfoByName(username)
      // return mydb.insert(data).then(function(d) {
      //   return d;
      // });
    },

    'deleteInfo' : function (username) {
      return userRepo.getInfoByName(username).then(function (user) {
        if (user === '') return '';
        else {
          var docUniqueId = user._id;
					var docRevNum = user._rev;
          return mydb.destroy(docUniqueId, docRevNum, function(err, d, header) {
						//
						if (!err) {
							console.log("Successfully deleted doc", docUniqueId);
							return d;
						} else {
							// uncheckin not Successfully.
							console.log(err);
							return err;
						}
					});
        }
      });
    },

    // 'updateUserInfo' : function (username, info) {
    //   return userRepo.getInfoByName(username).then(function (usinfo) {
    //     //
    //     if (usinfo === '') return userRepo.addInfo(username, info);
    //     else{
    //       for (i in info){
    //         usinfo[i] = info[i];
    //       }
    //       return mydb.insert(usinfo);
    //     }
    //   });
    // },

    'addLine' : function (username, line, action) {
    	return userRepo.getUserByName(username).then(function(data){
        var lines = data.lines;
        var nLines = [];
        if (lines !== undefined) {
       //   var nLines = [];
          lines.forEach(function(row) {
          if (row !== line) nLines.push(row);
          });
     //     if (action === 'ADD') nLines.push(line);

   /*       if (action === 'REMOVE') {
            for(var i=0; i<lines.length; i++) {
              if (nLines[i] === line){
                nLines.splice(i,1);
              }
            }
          }*/
    //      data.lines = nLines;
        } else{
          lines = [];
        }
        if (action === 'ADD') nLines.push(line);
        if (action === 'REMOVE') {
          for(var i=0; i<lines.length; i++) {
            if (nLines[i] === line){
              nLines.splice(i,1);
            }
          }
        }
       data.lines = nLines;
       return mydb.insert(data);
    	});
    },

    'updateLine' : function (username, line, action){
       if(action === 'UPDATE'){
        var  info = {"lines" :""} ;
        info.lines =  line;
        return userRepo.updateInfo(username, info);
      }
    },

    'updateStation' : function (username, station){
     var  info = {"station" :""} ;
      info.station =  station;
        return userRepo.updateInfo(username, info);
    },
   'updateScope' : function (username, scope){
        var  info = {"scope" :""} ;
        info.scope =  scope;
        return userRepo.updateInfo(username, info);
    },
    // 补充信息。 station
    'updateInfo' : function (username, info) {
      return userRepo.getUserByName(username).then(function(user) {
    		if (user === '') return '';
        var docUniqueId = user._id;
        var docRevNum = user._rev;
        var docType = user.docType;
        for( var i in info){
            user[i] = info[i];
        }
        user._id = docUniqueId;
        user._rev = docRevNum;
        user.docType = docType;
        console.log(user);
        //info.regtDate = new Date().toLocaleDateString();
        return mydb.insert(user);
        //return user;
    	});
    }
};

var userService = {
  'add' : function (mail) {
    return userRepo.add(mail);
  },
  'login' : function (username, password) {
	  return userRepo.getUserByName(username).then(function(doc) {
		  if ((doc === undefined) || (doc === '')) {
			  //register
			  return userRepo.addNew(username, password).then(function(data) {
				  //console.log(data);
				  if (data.token !== undefined) {
					  return data;
				  } else {
					  return 201;
				  }
			  });
		  } else {
			  var pass = doc.password;
			  if (password === pass) {
				  return doc;
			  } else {
				 return 200;
			  }
		  }
	  });
  },
  'getCode' : function (mail) {
    return userRepo.getUserDoc(mail).then(function(d) {
      if (d.code === undefined) {
        return userService.add(mail).then(function(d1) {
          return d1.code;
        });
      } else {
        return d.code;
      }
    });
  },
  'getSite' : function (username) {
    return userRepo.getUserByName(username).then(function(d) {
      return d.site;
    });
  },
  'getToken' : function (mail, code) {
    return userRepo.getUserByName(mail).then(function(d) {
      if (d.token === undefined) {
        return '';
      } else {
        if (code === d.code) {
          return d.token;
        } else {
          return '';
        }
      }
    });
  },
  'getLines' : function(username){
	  return userRepo.getUserByName(username).then(function(data){
		  return data.lines;
	  });
  },
  'getStation' : function(username){
	  return userRepo.getUserByName(username).then(function(data){
		  return data.station;
	  });
  },
  'addLine' : function(username, line, action) {
	  return userRepo.addLine(username,line,action);
  },
  'updateLine' : function(username, line, action) {
	  return userRepo.updateLine(username,line,action);
  },

  'updateStation' : function(username, station) {
	  return userRepo.updateStation(username,station);
  },

  'updateScope' : function(username, scope) {
	  return userRepo.updateScope(username,scope);
  },

  'verifyToken' : function (username, token) {
    return userRepo.getUserByName(username).then(function(d) {
      if (d.token === undefined) {
        return false;
      } else {
        if (token === d.token) {
          return true;
        } else {
          return false;
        }
      }
    });
  },
  'updateInfo' : function (username, info) {
	  return userRepo.updateInfo(username, info);
  },
  'getUserByName' : function (username) {
    return userRepo.getUserByName(username).then(function(data) {
      return data;
    })
  },
  'getInfoByName' : function (username) {
    return userRepo.getInfoByName(username);
  },
  'addInfo' : function (username,info) {
    return userRepo.addInfo(username, info);
  },
  'deleteInfo' : function (username){
    return userRepo.deleteInfo(username);
  }
};

// userService.add('jianjunw@cn.ibm.com').then(function(data) {
  // console.log(data);
// })
// userService.getToken('jianjunw@cn.ibm.com', '917').then(function(data) {
  // console.log(data);
// });
// userService.verifyToken('jianjunw@cn.ibm.com', '1f417790-4e9-462e-8c83-7255ad918d08').then(function(data) {
  // console.log(data);
// });
module.exports = exports = userService;
