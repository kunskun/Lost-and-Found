const express = require('express');
const passport = require('passport');
const config = require('config');
const {graphqlHTTP }= require('express-graphql');
const schema = require('./schema/schema')
const app = express();
const mongoose = require('mongoose');
const User = require('./schema/users')
const cors = require('cors')
const session = require('express-session');
const bodyParser = require('body-parser'); // parser middleware
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
app.use (passport.initialize())
app.use (passport.session())

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
  callbackURL: "/oauth2/redirect/google",
  passReqToCallback   : true
},
function(request, accessToken, refreshToken, profile, done) {
  User.findOrCreate({ googleId: profile.id }, function (err, user) {
    return done(err, user);
  });
}
));
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});
 
//This route will be used as an endpoint to interact with Graphql,
 
//All queries will go through this route.
app.get('/login', passport.authenticate('google', {
  scope: [ 'email' ]
}));  
app.use('/graphql', ensureLoggedIn(),graphqlHTTP({ 
   schema,
   graphiql:true
 
}));
app.get('/oauth2/redirect/google',
  passport.authenticate('google', { failureRedirect: '/login', failureMessage: true }),
  function(req, res) {
    res.send('pass');
  });
  app.get('/kuy',ensureLoggedIn(), function(req, res, next) {
    res.send('kuy')
  });
app.get('/logout', function(req, res, next) {
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
});

app.listen(4000, () => {
 
   console.log('Listening on port 4000');
 
});
