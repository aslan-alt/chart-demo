import {buildSchema} from "graphql/index";

export const schema = buildSchema(`
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
