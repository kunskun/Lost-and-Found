const graphql = require('graphql');
const Pose = require('./poses');
const User = require('./users');

const {
   GraphQLObjectType, GraphQLString,
   GraphQLID, GraphQLInt,GraphQLSchema,
   GraphQLList,GraphQLNonNull
} = graphql;

//Schema defines data on the Graph like object types(book type), relation between
//these object types and describes how it can reach into the graph to interact with
//the data to retrieve or mutate the data  

const PoseType = new GraphQLObjectType({
   name: 'Pose',
   //We are wrapping fields in the function as we dont want to execute this ultil
   //everything is inilized. For example below code will throw an error AuthorType not
   //found if not wrapped in a function
   fields: () => ({
       _id: { type: GraphQLID  },
       name: { type: GraphQLString },
       image: { type: GraphQLString },
       status: { type: GraphQLString },
       tag: { type: GraphQLString },
       foundPlace: { type: GraphQLString },
       returnPlace: { type: GraphQLString },
       description: { type: GraphQLString },
   })
});

const AuthorType = new GraphQLObjectType({
   name: 'Author',
   fields: () => ({
       id: { type: GraphQLID },
       name: { type: GraphQLString },
       age: { type: GraphQLInt },
       book:{
           type: new GraphQLList(PoseType),
           resolve(parent,args){
               return Book.find({ authorID: parent.id });
           }
       }
   })
})

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        googleId: { type: GraphQLString },
        user: { type: GraphQLInt },

    })
 })

//RootQuery describe how users can use the graph and grab data.
//E.g Root query to get all authors, get all books, get a particular
//book or get a particular author.
const RootQuery = new GraphQLObjectType({
   name: 'RootQueryType',
   fields: {
       pose: {
           type: PoseType,
           //argument passed by the user while making the query
           args: { id: { type: GraphQLID } },
           resolve(parent, args) {
               //Here we define how to get data from database source
               //this will return the book with id passed in argument
               //by the user
               return Pose.findById(args.id);
           }
       },
       poses:{
           type: new GraphQLList(PoseType),
           resolve(parent, args) {
               return Pose.find({});
           }
       },
       users:{
        type: new GraphQLList(UserType),
        resolve(parent, args) {
            return User.find({});
        }
    },
   }
});

//Very similar to RootQuery helps users to add/update to the database.
const Mutation = new GraphQLObjectType({
   name: 'Mutation',
   fields: {
       addPose:{
           type:PoseType,
           args:{
                name: { type: new GraphQLNonNull(GraphQLString)},
                image: { type: new GraphQLNonNull(GraphQLString) },
                status: { type: new GraphQLNonNull(GraphQLString) },
                tag: { type: new GraphQLNonNull(GraphQLString) },
                foundPlace: { type: new GraphQLNonNull(GraphQLString) },
                returnPlace: { type: new GraphQLNonNull(GraphQLString) },
                description: { type: new GraphQLNonNull(GraphQLString) },
           },
           resolve(parent,args){
               let pose = new Pose({
                   name:args.name,
                   image:args.image,
                   status:args.status,
                   tag:args.tag,
                   foundPlace:args.foundPlace,
                   returnPlace:args.returnPlace,
                   description:args.description
               })
               return pose.save()
           }
       }
   }
});



//Creating a new GraphQL Schema, with options query which defines query
//we will allow users to use when they are making requests.
module.exports = new GraphQLSchema({
   query: RootQuery,
   mutation: Mutation
});