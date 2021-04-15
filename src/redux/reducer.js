import storageUtils from '../utils/storageUtils';
import {combineReducers} from 'redux';
import {
    RECEIVE_USER,
    SHOW_ERROR_MSG,
    RESET_USER,
    UPDATE_USER
} from './action-types'

/**
 * 用来管理当前登录用户的reducer
 */
const initUser = storageUtils.getUser();

function user(state=initUser,action){
    switch (action.type) {
        case RECEIVE_USER:
            return action.user
        case SHOW_ERROR_MSG:
            return {errmsg:action.errMsg}
        case UPDATE_USER:
            return action.user
        case RESET_USER:
            return {}
        default:
            return state;
    }
}
export default combineReducers({
    user
})