const express = require('express');
const config = require('config');
const {graphqlHTTP }= require('express-graphql');
const schema = require('../schema/schema')
const app = express();
 

 
 
//This route will be used as an endpoint to interact with Graphql,
 
//All queries will go through this route.
 
app.use('/graphql', graphqlHTTP({
 
   //directing express-graphql to use this schema to map out the graph
 
   schema,
 
   //directing express-graphql to use graphiql when goto '/graphql' address in the browser
 
   //which provides an interface to make GraphQl queries
 
   graphiql:true
 
}));
 

 
 
app.listen(config.get('port'), () => {
 
   console.log('Listening on port ' + config.get('port'));
 
});
