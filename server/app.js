const express = require('express');
const graphqlHTTP  = require('express-graphql');
const mongoose = require('mongoose');
// import {mongoose} from 'mongoose';
const cors = require('cors');

mongoose.connect("mongodb://user1:admin123@ds141238.mlab.com:41238/gql-mytest");
mongoose.connection.once('open', ()=>{
    console.log("db connected");
})
const schema = require('./schema/schema')
const app = express();
app.use(cors());
app.use('/graphql', graphqlHTTP({
    schema,
    graphiql:true
}));
app.listen(4000, () => {
    console.log('now listening for requests on port 4000');
});
