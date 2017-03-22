var Cloudant = require('cloudant')
var cloudant = Cloudant("https://0645c816-96c8-44f5-b677-efe9b531f5b2-bluemix:b1fdaa7a3f209ad976b2b5fbf6625945c5a6d6657f9fc059e62385ebc39882b6@0645c816-96c8-44f5-b677-efe9b531f5b2-bluemix.cloudant.com");
var mydb = cloudant.db.use('todo');
var todos = {
  'getAll' : function() {
    return "this is all";
  },
  'insert' : function (data) {
    mydb.insert(data, function(err, body){
      if (!err) console.log(body);
    })
  }
};

module.exports = exports = todos;
