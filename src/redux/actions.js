import{
    RECEIVE_USER,
    SHOW_ERROR_MSG,
    RESET_USER,
    UPDATE_USER,
} from './action-types';
import {reqLogin,changeUserInfo,submitImage} from '../api';
import storageUtils from '../utils/storageUtils';

/**
 * 接收用户的同步的action
 */
export const receiveUser = (user)=>({type:RECEIVE_USER,user})

/* 显示登录失败的错误action
*/
export const showErrorMsg=(errMsg)=>({type:SHOW_ERROR_MSG,errMsg})

/**重置用户信息 */
export const logout = ()=>{
    storageUtils.removeUser();
    return{
        type:RESET_USER
    }
}
/**
 * 修改用户信息
 */
export const updateUser = (user) => ({type:UPDATE_USER,user})




/**
 * 实现登录的异步action
 */
export const login=(username,password)=>{
    return async dispatch=>{
        const result = await reqLogin(username,password);
       // console.log(result)
        if(result.success_code === 200){
            //接受user信息
            const user = result.data[0];
            //console.log(user)
             storageUtils.saveUser(user)
            dispatch(receiveUser(user))
        }else{
            const msg = result.message;
            dispatch(showErrorMsg(msg))

        }
    }
}
/**
 * 更新用户信息
 *
 */
export const updateUserInfo=(username,birthday,location,information,realname,job,sex)=>{
    return async dispatch=>{
        const result = await changeUserInfo(username,birthday,location,information,realname,job,sex);
        if(result.success_code === 200){
            const user  = result.data[0];
            storageUtils.saveUser(user);
            dispatch(updateUser(user))
        }else{
            const msg = result.message;
            dispatch(showErrorMsg(msg));
        }
    }
}

//用户头像更新
export const updateAvatar = (image,username)=>{
    return async dispatch=>{
        const result = await submitImage(image,username);
        if(result.status === 200){
            const user = result.data[0];
            storageUtils.saveUser(user);
            dispatch(updateUser(user));
        }else{
            const msg = result.message;
            dispatch(showErrorMsg(msg));
        }
    }
}