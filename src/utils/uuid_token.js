// 引入uuid
import {v4 as uuidv4} from 'uuid';
// uuidv4()
// 生成一个随机字符串，且每次执行不能发生变化，游客身份永久存储
export const getUUID=()=>{
    let uuid_token=localStorage.getItem("UUIDTOKEN")
    // console.log(uuid_token);
    if(!uuid_token){
        // 生成游客临时身份
        uuid_token=uuidv4()
        localStorage.setItem('UUIDTOKEN',uuid_token)
        console.log(uuid_token);
    }
    return uuid_token
    
}