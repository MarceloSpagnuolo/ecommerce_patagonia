const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const routes = require('./routes/index.js');
const cors = require('cors');
const passport = require("./routes/passport");
const cookieSession = require("cookie-session")



require('./db.js');

const server = express();

server.name = 'API';

server.use(express.static('src'));  //acceso publico al directorio src
server.use(cors());
server.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
server.use(bodyParser.json({ limit: '50mb' }));
server.use(cookieParser());
server.use(morgan('dev'));
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // update to match the domain you will make the request from
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

server.use(passport.initialize());

server.all('*', function(req,res,next) {
  passport.authenticate('bearer', function(error,user){
    if(error) return next(error);
    if(user) {
      req.user=user
    }
    return next();
  })(req,res,next)
})


server.use('/', routes);

// Error catching endware.
server.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

//multer
server.use(express.static('./src/images/cervezas'));


module.exports = server;
