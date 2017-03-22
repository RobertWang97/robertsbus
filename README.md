# shuttlebus-node
backend nodejs project to provide restful services to mobile app.

# Node.js Starter Overview

The Node.js Starter demonstrates a simple, reusable Node.js web application based on the Express framework.

## Run the app locally

1. [Install Node.js][]
2. Download and extract the starter code from the Bluemix UI
3. cd into the app directory
4. Run `npm install` to install the app's dependencies
5. Run `npm start` to start the app
6. Access the running app in a browser at http://localhost:6001

[Install Node.js]: https://nodejs.org/en/download/



1. git status
2. git checkout -b xxxx  , git checkout xxx
3. git branch

# ShuttleBus rest services
sameple url -> http://shuttlebus-service.mybluemix.net/shuttlebus

1. every request must have 'client_id' in header with value '94c105cc-f74b-4909-822d-54f6c7b6c9c9'
2. except the /login (http://shuttlebus-service.mybluemix.net/login) path, the request to all other urls must have these in header:

  a. client_id (of course)

  b. username (the username when you registered)

  c. token (got from /login)

3. How to get the token

  a) send POST request to /login with client_id/username/password in header,
  if the username exists, then verify password, if password is correct, return token to you.
  if password is wrong, return the message to you.
  if username does not exist, create an account with username/password and return token to you.
  and then in the response, you'll get the token value.

4. as what I said, include client_id/username/token in all request header.

# Rest APIs
1. Shuttle Bus line
/shuttlebus/line - GET - get all shuttle bus information  -- done
/shuttlebus/line/site/:site - GET - get all shuttle bus information in site -- done
/shuttlebus/line/site/:site/station/:station - GET - get all which has the station. e.g. /shuttlebus/station/万达广场  , 所有路过万达广场的线路
/shuttlebus/line/station/:station - GET - get all which has the station, site will default the user's 'site'
/shuttlebus/line/site/:site/name/:name - GET - get by name, e.g /shuttlebus/site/大连/name/线路1
/shuttlebus/line/name/:name - GET - get by name, site default to user's site

2. Buses
/shuttlebus/buses/site/:site  -- GET -- list all buses in that site
/shuttlebus/buses  -- GET -- list all buses in that site.
/shuttlebus/buses/site/:site/name/:name - GET - get buses of that site/name
/shuttlebus/buses/name/:name - GET - site default to user's site
/shuttlebus/buses/site/:site/station/:station - GET- list all buses with that station stop.
/shuttlebus/buses/station/:station - GET - site defaults to user site
/shuttlebus/line/type -GET - list all types
/shuttlebus/line/type/:type -GET - list line by type
3. user
/user/line - GET - list all user registered lines
/user/line/:line/add - POST - add new line , e.g. /user/line/线路1
/user/line/:line/remove - POST - remove from the line
/user/line/:line/buses - GET - get the buses of user registered lines
/user/info - POST - update user information.
/user/info/:username - POST - get user information.
