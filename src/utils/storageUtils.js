import store from 'store';
const USER_KEY = 'user_key';

/*包含 n 个操作 local storage 的工具函数的模块 */

export default{
    saveUser(user){
        store.set(USER_KEY,user);
    },
    getUser(){
        return store.get(USER_KEY) || {}
    },
    removeUser(){
        store.remove(USER_KEY);
    }
}