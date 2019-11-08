import {gql} from 'apollo-boost';//for parsing gql

const getBooksQuery = gql`
{
    books{
        name
        id
    }
}`;

const getAuthorsQuery = gql`
{
    authors{
        name
        id
    }
}`;

// const addBookMutation = gql`
//  mutation($name:String, $genre: String, $authorId: String){
//      addBook(name:$name, genre:$genre, authorId:$authorId){
//          name
//          id
//      }
//  }

// `

// const addBookMutation = gql`
//  mutation{
//      addBook(name:"", genre:"", authorId:""){
//          name
//          id
//      }
//  }

// `


const addBookMutation = gql`
 mutation($name: String!, $genre:String!, $authorId: ID!){
     addBook(name:$name, genre: $genre, authorId:$authorId){
         name
         id
     }
 }

`

export {getBooksQuery, getAuthorsQuery, addBookMutation};
