import express from 'express'
import {graphqlHTTP} from 'express-graphql'
import cors from 'cors'
import {schema} from "./schema";
import {rootValue} from "./rootValue";
import dotenv from 'dotenv'
import mongoose from 'mongoose'

dotenv.config()
const app = express()

const port = process.env.PORT ?? 8000;

mongoose.set("strictQuery", false);

mongoose.connect(process.env.MONGO_URL??'',).then(res=> {
    // console.log('res-----------')
    // console.log(res)
}).catch((e)=>{
    console.log(e.message);
})

const UserSchema = new mongoose.Schema({
    name: String,
    age:Number
});

const User = mongoose.model('user',UserSchema)
// @ts-ignore
User.find({},(e,doc)=>{
    if(e){
        console.log(e);
        return
    }
    console.log('doc-------');
    console.log(doc);

})
app.use(cors({
    origin: function (origin, callback) {
        if(['http://localhost:3000'].includes(origin??'')){
            callback(null, true)
        }else{
            callback(new Error('Not allowed by CORS'))
        }
    }
}))
app.use(express.json())
app.use('/graphql', graphqlHTTP({schema, rootValue}))

app.listen(port, () => {
    console.log(`listening ${port}`)
})