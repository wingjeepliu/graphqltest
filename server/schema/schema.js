const {books, authors} = require('./tempData');
const graphql = require ('graphql');
const _ = require('lodash');
const {GraphQLNonNull, GraphQLList, GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLInt}= graphql;


const Book = require('../models/book');
const Author = require('../models/author');

//fields define in a function because datatypes are depend on each otehr
//the code is run from top to bottom
const BookType= new GraphQLObjectType({
    name:"Book",
    fields: ()=>({
        id:{type: GraphQLID},
        name: {type: GraphQLString},
        genre: {type: GraphQLString},
        author:{
            type:AuthorType,
            resolve: function(parent, args){
                // console.log('parent of book => author', parent);
                // return  _.find(authors,{id: parent.id} )
                return Author.findById(parent.authorId);
                
            }
        }
    })
})

const AuthorType= new GraphQLObjectType({
    name:"Author",
    fields: ()=>({
        id:{type: GraphQLID},
        name: {type: GraphQLString},
        age: {type: GraphQLInt},
        books:{
            type:new GraphQLList(BookType),
            resolve: function(parent, args){
                // console.log('authorit', parent);
                // return  _.filter(books,{authordId: parent.id} )
                return Book.find({authorId: parent.id});
            }
        }
    })
})

/*
type:
args: query input
resolve: function to return data
*/
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields:{
        book:{
            type:BookType,
            args:{id:{type:GraphQLID}},
            resolve(parent, args){
                return Book.findById(args.id)
            //   var book = _.find(books,{id: args.id} );

            //   return  _.find(books,{id: args.id} )
                //code to get data from db/other rsource
                //parent for relationship
                // return books .filter(obj => if);
            }
        },
        author:{
            type:AuthorType,
            args:{id:{type:GraphQLID}},
            resolve: function(parent, args){
            //   return  _.find(authors,{id: args.id} )
                return Author.findById(args.id)
              
            }
        },
        books:{
            type: new GraphQLList(BookType),
            resolve: function(parent, args){
                return Book.find({});
            }
        },
        authors:{
            type: new GraphQLList(AuthorType),
            resolve: function(parent, args){
                // return authors;
                return Author.find({})
            }
        }
    }
})


const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields:{
        addAuthor:{
            type:AuthorType,
            args:{
                name:{type: new GraphQLNonNull( GraphQLString)},
                age:{type: new GraphQLNonNull( GraphQLInt)}
            },
            resolve(parent, args){
                let author = new Author({
                    name: args.name,
                    age: args.age
                });
                return author.save();
            }
        },
        addBook:{
            type:BookType,
            args:{
                name:{type: new GraphQLNonNull( GraphQLString)},
                genre:{type: new GraphQLNonNull( GraphQLString)},
                authorId:{type: new GraphQLNonNull( GraphQLID)}//*** */
            },
            resolve(parent, args){
                let book = new Book({
                    name: args.name,
                    genre: args.genre,
                    authorId: args.authorId
                })
                return book.save();
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query:RootQuery,
    mutation: Mutation 
});