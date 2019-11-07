import React, { Component } from 'react';
import {graphql} from 'react-apollo';//bind apollo to component
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
    displayBooks(){
        var data = this.props.data;
        if(data.loading){
            // console.log('data loading')
            return (<div>Loading books..</div>);
        }else{
            
            // console.log('data loaded ***************', data.loading, data.books, typeof data.books)//data loaded *************** undefined undefined
          var book1={name: 'ok'};
          var book2 = {name: 'tt'};
        //   var books =[book1, book2];
        // //   console.log(data.books);
            var string=   data.books.map(book => {
            //    console.log(typeof book, 'book type', book);
                var temp =  (<li id={book.id} key={book.id} > {book.name} </li>);
                /*
                                console.log(temp)
                                {$$typeof: Symbol(react.element), type: "li", key: "5dc3182ff42801256a88f9eb", ref: null, props: {…}, …}
                $$typeof: Symbol(react.element)
                key: "5dc3182ff42801256a88f9eb"
                props: {id: "5dc3182ff42801256a88f9eb", children: Array(3)}
                ref: null
                type: "li"
                _owner: FiberNode {tag: 1, key: null, elementType: ƒ, type: ƒ, stateNode: BookList, …}
                _store: {validated: false}
                _self: BookList {props: {…}, context: {…}, refs: {…}, updater: {…}, _reactInternalFiber: FiberNode, …}
                _source: {fileName: "/Users/wlau@tibco.com/code/tutorial/reactRedux/gra…ent/src/components/BookList/BookList.component.js", lineNumber: 29}
                __proto__: Object
                */
                return  temp;
            })
            // console.log('data loaded ******_+_+_+_*********', string)
            return (string);
        }
    }
    render() {
    //    console.log(this.displayBooks(), 'booklist');
        return (
            <div>
                <ul id="book-list">
                    {this.displayBooks()}
                </ul>
            </div>
        )
    }
}
export default graphql(getBooksQuery)(BookList);//bind query getBooksQuery to comopnent BookList