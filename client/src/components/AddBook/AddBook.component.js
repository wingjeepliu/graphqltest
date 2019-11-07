import React , { useState , useEffect} from 'react'

import {graphql} from 'react-apollo';//bind apollo to component
// import {gql} from 'apollo-boost';//for parsing gql

import {getAuthorsQuery } from '../../queries/query';
import CustomInputWithHook from '../CustomeInputWithHook/CustomeInputWithHook.component';
import CustomSelectWithHook from '../CustomeSelectWithHook/CustomeSelectWithHook.component';
function genOptions(args){
   
    if(!args.data.loading){
        return args.data.authors.map(author =>{
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
  
    const optionGenFunc = genOptionWithBindArgs(args);
    const [author, setAuthor] = CustomSelectWithHook({ id:'genre', optFunc:optionGenFunc});
    useEffect(() => {
        // Update the document title using the browser API
       console.log('compoment did mount or update', name,genre , author);
    });
    
    
    return (
        <form id = "add-book">
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
export default graphql(getAuthorsQuery)(AddBook);
