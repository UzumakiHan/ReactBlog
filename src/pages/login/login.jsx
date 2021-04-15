import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from '../../redux/actions';
import { reqRegister } from '../../api'
import {
    Form,
    Input,
    Button,
    message
} from 'antd';
import {
    UserOutlined,
    KeyOutlined
} from '@ant-design/icons';
import logo from './images/logo.png';
import './login.css';
const Item = Form.Item;
/**
 * 登录的路由组件
 */
class Login extends Component {
    constructor(props) {
        super(props);
        this.usernameInput = React.createRef();
        this.passwordInput = React.createRef();
        this.state = {
            pageTitle: '登录',
            linkText: '注册',
         
        }
    }

    /*
用户名/密码的的合法性要求
1). 必须输入
2). 必须大于等于 4 位
3). 必须小于等于 12 位
4). 必须是英文、数字或下划线组成
*/
    onFinish = async (values) => {
        const { pageTitle } = this.state;
        const { username, password } = values;
        if (pageTitle == '登录') {
            this.props.login(username, password);
            //  console.log(this.props.user);
            if (this.props.user.errmsg) {
                message.error(this.props.user.errmsg)
            }
        } else {
            const result = await reqRegister(username, password);
            //console.log(result);
            if (result.success_code === 200) {
                message.success(result.message)
            } else {
                message.error(result.message)
            }

        }
        this.refs.loginForm.resetFields()
        
    };

    onFinishFailed = (errorInfo) => {
       // console.log('Failed:', errorInfo);
    };
    //去登录界面
    goToLogin = () => {
        this.refs.loginForm.resetFields()
        const { pageTitle } = this.state;
        if (pageTitle == '登录') {
            this.setState({
                pageTitle: '注册',
                linkText: '登录'
            })
        } else {
            this.setState({
                pageTitle: '登录',
                linkText: '注册'
            })
        }

    }
    render() {
        const user = this.props.user;
        const { pageTitle, linkText } = this.state;
        //console.log(user)
        if (user && user.id) {
            return <Redirect to='/home' />
        }
        return (
            <div className='login'>
                <header className='login-header'>
                    <img src={logo} alt="logo" />
                    <h1>React Blog</h1>
                </header>
                <section className='login-content'>
                    <h3>用户{pageTitle}</h3>
                    <Form onFinish={this.onFinish}

                        ref='loginForm'
                        onFinishFailed={this.onFinishFailed} className='login-form'>
                        <Item name="username" rules={[
                            { required: true, whitespace: true, message: '必须输入用户名' },
                            { min: 4, message: '用户名必须大于 4 位' },
                            { max: 12, message: '用户名必须小于 12 位' },
                        ]}>
                            <Input placeholder="用户名" prefix={<UserOutlined />} ></Input>
                        </Item>
                        <Item name="password" rules={[
                            {
                                required: true,
                                message: '必须输入密码!',
                            },
                            { min: 4, message: '用户名必须大于 4 位' },
                            { max: 12, message: '用户名必须小于 12 位' },

                        ]}>
                            <Input type="password" placeholder="密码" prefix={<KeyOutlined />}  />

                        </Item>
                        <Item>
                            <Button type='primary' htmlType='submit' className='login-form-button'>{pageTitle}</Button>
                        </Item>
                        <Link
                            style={{ textAlign: 'right', width: '100%', display: 'inline-block' }}
                            onClick={this.goToLogin}
                        >去{linkText}</Link>
                    </Form>
                </section>
            </div>
        )
    }
}
export default connect(
    state => ({ user: state.user }),
    { login }
)(Login)