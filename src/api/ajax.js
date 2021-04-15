import axios from 'axios';
import { message } from 'antd';
import resolve from 'resolve';
/*能发送 ajax 请求的函数模块
包装 axios
函数的返回值是 promise 对象
axios.get()/post()返回的就是 promise 对象
返回自己创建的 promise 对象:
统一处理请求异常
异步返回结果数据, 而不是包含结果数据的 response
*/
export default function ajax(url, data={},method='GET'){
    return new Promise((resolve,reject)=>{
        let promise;
        if(method == 'GET'){
            promise = axios.get(url,{params:data});
        }else{
            promise = axios.post(url,data);
        }
        promise.then(res=>{
            resolve(res.data);
        }).catch(err=>{
            message.error('请求错误：'+err.message);
        })
    })
}