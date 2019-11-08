import React, { Component } from 'react';
import {graphql} from 'react-apollo';//bind apollo to component
import BookDetails from '../BookDetails/BookDetails.component';
// import {gql} from 'apollo-boost';//for parsing gql

//query input
// const getBooksQuery = gql`
// {
//     books{
//         name
//         id
//     }
// }`;
import {getBooksQuery} from '../../queries/query';

class BookList extends Component {

    constructor(props){
        super(props);
        this.state={
            selected:null
        }
    }

    displayBooks(){
        var data = this.props.data;
        if(data.loading){
            // console.log('data loading')
            return (<div>Loading books..</div>);
        }else{
      
            var string=   data.books.map(book => {
                var temp =  (<li onClick={(e)=>{this.setState({selected:book.id })}} id={book.id} key={book.id} > {book.name}  </li>);
                return  temp;
            })
         
            return (string);
        }
    }
    render() {

        return (
            <div>
                <ul id="book-list">
                    {this.displayBooks()}
                </ul>
                <BookDetails bookid ={this.state.selected}/>
            </div>
        )
    }
}
export default graphql(getBooksQuery)(BookList);//bind query getBooksQuery to comopnent BookList