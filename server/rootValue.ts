type User = {
    name:string;
    age:29;
    sex:string;
    salary(city:String):number
}

export const rootValue = {
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