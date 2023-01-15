import express from 'express'
import {graphqlHTTP} from 'express-graphql'
import {buildSchema} from 'graphql'
import cors from 'cors'

const app = express()


app.use(cors({
    origin: function (origin, callback) {
        if(['http://localhost:3000'].includes(origin??'')){
            callback(null, true)
        }else{
            callback(new Error('Not allowed by CORS'))
        }
    }
}))

const schema = buildSchema(`
    type Account {
        name:String
        sex:String
        age:Int
        salary(city:String):Int
    }
    type Query {
      hello:String
      account(id:Int):Account
      getClassMates(classNo:Int!):[String]
    }
`)

type User = {
    name:string;
    age:29;
    sex:string;
    salary(city:String):number
}

const rootValue = {
    hello: () => {
        return `hello world`
    },
    account: ({id}:{id?:number}) => {
        const users:{[key:string]:User} = {
            1:{
                name: 'jingsong',
                age: 29,
                sex: '男',
                salary:()=>{
                    return 111
                }
            }
        }
        return users?.[id??0] ?? {}
    },
    getClassMates: ({classNo}: { classNo?: string }) => {
        const mates:{[key:string]:string[]} = {
            31: ['小明', '小红'],
            30: ['张三', '李四']
        }
        return mates?.[classNo??''] ?? []
    }
}

app.use('/graphql', graphqlHTTP({schema, rootValue, graphiql: true}))

app.listen(8000, () => {
    console.log('listening 8000')
})