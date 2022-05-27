const express = require('express');
const passport = require('passport');
const config = require('config');
const {graphqlHTTP }= require('express-graphql');
const schema = require('./schema/schema')
const app = express();
const mongoose = require('mongoose');
const User = require('./schema/users')
const poses = require('./schema/poses')
const cors = require('cors')
const session = require('express-session');
const bodyParser = require('body-parser'); // parser middleware
const cookieParser = require('cookie-parser');
const passportJWT = require("passport-jwt"),
      JWTStrategy = passportJWT.Strategy,
      ExtractJWT  = passportJWT.ExtractJwt
const jwt = require('jsonwebtoken');
var GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;
const {ensureLoggedIn} = require('connect-ensure-login');
mongoose.connect('mongodb+srv://admin:admin@cluster0.pe6cq.mongodb.net/lost-and-found')
 
mongoose.connection.once('open', () => {
 
   console.log('connected to database');
 
});
app.use(
  cors({
    origin: true,
    credentials: true,
    optionsSuccessStatus: 200
}))
app.options('*', cors())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({
  resave: false,
  saveUninitialized: true,
  secret: 'bla bla bla' 
}));;
app.use(cookieParser());
app.use (passport.initialize())
app.use (passport.session())

const generateJwtToken = (user) => {
  const token = jwt.sign(user.toJSON(), "bibibi", {
    expiresIn: '7d',
  });
  return token;
};

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,X-Access-Token,XKey,Authorization"
  );
  next();
});

passport.use(new GoogleStrategy({
  clientID:     "760391650787-v7t392aple8bqpupc35n7elckq6col37.apps.googleusercontent.com",
  clientSecret: "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",
  callbackURL: "http://www.riwch.com/api/callback",
  passReqToCallback   : true
},
function(request, accessToken, refreshToken, profile, done) {
  User.findOrCreate({ googleId: profile.id,user: 0 }, function (err, user) {
    return done(err, user);
  });
}
));

passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: "bibibi",
    },
    (jwtPayload, done) => {
      if (!jwtPayload) {
        return done('No token found...');
      }
      return done(null, jwtPayload);
    }
  )
);

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});
 
//This route will be used as an endpoint to interact with Graphql,
 
//All queries will go through this route.
app.get('/api/login',
  passport.authenticate('google', { scope:
      [ 'email', 'profile' ] }
));

app.use('/api/graphql',graphqlHTTP({ 
   schema,
   graphiql:true
 
}));
app.get('/api/callback',
  passport.authenticate('google', { failureRedirect: '/api/login' }),
  (req, res) => {
    const token = generateJwtToken(req.user);
    res.cookie('jwt', token);
    res.send(token);
  }
);
app.post('/api/post', function(req, res, next) {
    poses.create(req.body)
    res.status(200)
  });

// app.post('/api/post',passport.authenticate('jwt',{ session: false, failureRedirect: '/api/login' }), function(req, res, next) {
//   poses.create(req.body)
//   res.status(200)
// });
  app.get('/api/kuy',passport.authenticate('jwt',{ session: false, failureRedirect: '/api/login' }), function(req, res, next) {
    res.send('kuy')
  });
  app.post('/api/profile',passport.authenticate('jwt',{ session: false, failureRedirect: '/api/login' }), function(req, res, next) {
    res.send(req.user)
  });
  app.get('/api/logout', (req, res) => {
    res.clearCookie('jwt');
    res.redirect('/');
  });

app.listen(4000, () => {
 
   console.log('Listening on port 4000');
 
});
