const express = require('express');
const config = require('config');
const {graphqlHTTP }= require('express-graphql');
const schema = require('../schema/schema')
const app = express();
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://admin:admin@cluster0.pe6cq.mongodb.net/lost-and-found')
 
mongoose.connection.once('open', () => {
 
   console.log('connected to database');
 
});

 
 
//This route will be used as an endpoint to interact with Graphql,
 
//All queries will go through this route.
 
app.use('/graphql', graphqlHTTP({
 
   //directing express-graphql to use this schema to map out the graph
 
   schema,
 
   //directing express-graphql to use graphiql when goto '/graphql' address in the browser
 
   //which provides an interface to make GraphQl queries
 
   graphiql:true
 
}));
 

 
 
app.listen(4000, () => {
 
   console.log('Listening on port 4000');
 
});
