import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import App from './App';
import {Provider} from 'react-redux';
import store from './redux/store'
// 如果 local 中保存了 user, 将 user 保存到内存中 


ReactDOM.render((
    <Provider store={store}><App/></Provider>
), document.getElementById('root'))


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

