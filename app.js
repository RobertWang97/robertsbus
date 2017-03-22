/*eslint-env node*/

//------------------------------------------------------------------------------
// node.js starter application for Bluemix
//------------------------------------------------------------------------------

// This application uses express as its web server
// for more info, see: http://expressjs.com
var express = require('express');
var cors = require('cors');
var path = require('path');
//var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var userService = require('./service/user');
var todos = require('./router/todos');
var bus = require('./router/shuttlebus');
var login = require('./router/login');
var user = require('./router/user');
var checkin = require('./router/checkin');
var admin = require('./router/admin');
var comment = require('./router/comment');

// for webapplication
var webapp = require('./router/webapp');

// cfenv provides access to your Cloud Foundry environment
// for more info, see: https://www.npmjs.com/package/cfenv
var cfenv = require('cfenv');
var appId = '94c105cc-f74b-4909-822d-54f6c7b6c9c9';


// create a new express server
var app = express();

// set the view engine to ejs
app.set('view engine', 'ejs');


//enable cors
app.use(cors());

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());




app.set('views', './views');
app.set('view engine', 'ejs')
//serve the files out of ./public as our main files
app.use(express.static(__dirname + '/public'));

app.use('/web', webapp);


/*
app.use(function(req, res, next){
  var cid = req.get('client_id');
  if (cid !== appId) {
    res.status(401).send({message : 'wrong client id'});
    return;
  } else {
    var url = req.originalUrl;
    var user = req.get('username');
    if (user === undefined) {
      res.status(401).send({message : 'missing username in header'});
      return;
    }
    if (url === '/login') {
      next();
    } else {
      var token = req.get('token');
      if (token === undefined){
        res.status(401).send({message : 'missing token in header'});
        return;
      } else {
        userService.verifyToken(user, token).then(function(data) {
          console.log(data);
          if (data) next ();
          else {
            res.status(401).send({message : 'wrong token'});
            return;
          }
        });
      }
    }
  }
});
*/


app.use('/login', login);
app.use('/todos', todos);
app.use('/shuttlebus', bus);
app.use('/user', user);
app.use('/checkin', checkin);
app.use('/admin',admin);
app.use('/comment',comment);

// get the app environment from Cloud Foundry
var appEnv = cfenv.getAppEnv();

// start server on the specified port and binding host
app.listen(appEnv.port, '0.0.0.0', function() {
  // print a message when the server starts listening
  console.log("server starting on " + appEnv.url);
});
