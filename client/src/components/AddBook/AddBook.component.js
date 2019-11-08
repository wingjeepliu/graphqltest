import React , { useState , useEffect} from 'react'

import {graphql} from 'react-apollo';//bind apollo to component// compose not found in react-apollo
import {flowRight as compose} from 'lodash';
// import {gql} from 'apollo-boost';//for parsing gql

import {getAuthorsQuery , addBookMutation} from '../../queries/query';
import CustomInputWithHook from '../CustomeInputWithHook/CustomeInputWithHook.component';
import CustomSelectWithHook from '../CustomeSelectWithHook/CustomeSelectWithHook.component';
function genOptions(args){
 
    if(!args.loading){
        return args.authors.map(author =>{
            return (<option value={author.id} key ={author.id}>{author.name}</option>)
        })
    }else{
        return(<option>Loading Authors..</option>)
    }
}
function genOptionWithBindArgs(args){
    
    return ()=>genOptions(args);
}
// function useInput({ type , id}) {
//     const [value, setValue] = useState("");
//     const input = <input id ={id} value={value} onChange={e => setValue(e.target.value)} type={type} />;
//     return [value, input];
//   }

// function useSelect({ type , id, optFunc}) {
//     const [value, setValue] = useState("");
//     const selectEl = <select id ={id} value={value} onChange={e => setValue(e.target.value)} type={type}>
//         {optFunc()}
//     </select>;
//     return [value, selectEl];
// }

const AddBook= function(args) {
    
    const [name, setName] = CustomInputWithHook({type:'text', id:'name'});
    const [genre, setGenre] = CustomInputWithHook({type:'text', id:'genre'});
   
    // for(var key in args){
    //     console.log(key, args[key],' =========>');
    // }

    const optionGenFunc = genOptionWithBindArgs(args.getAuthorsQuery);
    const [authorId, setAuthor] = CustomSelectWithHook({ id:'genre', optFunc:optionGenFunc});
    useEffect(() => {
        // Update the document title using the browser API
        const book={name, genre, authorId};
        console.log('compoment did mount or update', book);
     
    });
    
    function submitFormHandler(e){
        e.preventDefault();
        const book={name, genre, authorId};
        console.log('form submit', book);
   
    }
    return (
        <form id = "add-book" onSubmit={submitFormHandler}>
            <div className="field">
                <label>Book name:</label>
                {setName}
            </div>
            <div className="field">
                <label>Genre:</label>
               {setGenre}
            </div>
            <div className="field">
                <label>Author:</label>
                    {setAuthor}
            </div>
            <button>+</button>
        </form>
    )
}

// export default graphql(getAuthorsQuery)(AddBook);

//how bind more than 1 query
// export default compose(
//     graphql(getAuthorsQuery, {name:"getAuthorsQuery"}),   
//     graphql(addBookMutation, {name:"addBookMutation"}) 
// )(AddBook);

export default compose(
    graphql(getAuthorsQuery, { name: "getAuthorsQuery" }),
    graphql(addBookMutation, { name: "addBookMutation" })
  )(AddBook);
