import React from 'react';
import BookList from './components/BookList/BookList.component';
import AddBook from './components/AddBook/AddBook.component';
import {ApolloProvider} from 'react-apollo';
import AppoloClient  from 'apollo-boost';

//appolo client setup

const client= new AppoloClient({
  uri:'http://localhost:4000/graphql'
})
function App() {
  return (
    <ApolloProvider client={client}>
    <div id='main' className="App">
      <h1>Ninja's Reading List</h1>
      <BookList/>
      <AddBook/>
    </div>
    </ApolloProvider>
  );
}

export default App;
