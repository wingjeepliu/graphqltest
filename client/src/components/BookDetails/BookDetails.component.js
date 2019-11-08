import React, { useState } from 'react';
import {graphql} from 'react-apollo';//bind apollo to component
import {getBookQuery} from '../../queries/query';

const BookDetails = function (args) {
    console.log(args, 'arg in book details');
    const displayBookDetails  =function(){
        const {book} = args.data;//defactor
        console.log(book, args.data, '-------------------------------');
        if(book){
            return(
                <div>
                    <h2>{book.name}</h2>
                    <p>{book.genre}</p>
                    <p>{book.author.name}</p>
                    <p>Other books from this author</p>
                    <ul>
                        {book.author.books.map(item=>{
                            return <li key={item.id}>{item.name}</li>
                        })}
                    </ul>
                </div>
            )
        }else{
            return(<div>No Book found</div>)
        }
    };
    return displayBookDetails();
    return (
        <div id="book-details">
            <p>Ouput book here</p>
        </div>
    )
}

export default graphql(getBookQuery, {
    options:(props)=> {
        console.log(props, '-----------');
        /*     <BookDetails bookid ={this.state.selected}/> */
        return {
            variables:{
                id:props.bookid
            }
        }
    }
} )(BookDetails);
