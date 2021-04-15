import React, { Component } from 'react';
import { connect} from 'react-redux';
import {Redirect,withRouter} from 'react-router-dom'
import { Card, Row, Col, Steps, Button, message, Input } from 'antd';
import { EyeTwoTone, EyeInvisibleOutlined } from '@ant-design/icons';
import md5 from 'md5';
import {changePassword} from '../../api';
import {logout} from '../../redux/actions'
import './changePassword.css'
const { Step } = Steps;
class ChangePassword extends Component {
    constructor(props) {
        super(props)
        this.state = {
            current: 0,
            currentPwd: '',
            newPwd: '',
            comfirmPwd: ''
        }
        this.currentPwd = React.createRef();
        this.newPwd = React.createRef();
        this.comfirmPwd = React.createRef();
    }
    next = () => {
        const { current } = this.state;
        if (current === 0) {
           // console.log(md5(this.currentPwd.current.state.value));
            if (md5(this.currentPwd.current.state.value) == this.props.user.password) {
                this.currentpwd = this.currentPwd.current.state.value
                message.success('密码输入正确')
                this.setState(state => ({
                    current: state.current + 1,
                    currentPwd: this.currentPwd.current.state.value
                }))
            } else {
                message.error('密码输入错误')
            }
            this.currentPwd.current.state.value = ''
        } else if (current === 1) {
            if(this.newPwd.current.state.value == ''){
                message.error('密码不能为空')
            }else{
               // console.log(this.newPwd.current.state.value);
                this.changePwd = this.newPwd.current.state.value
                this.setState(state => ({
                    current: state.current + 1,
    
                }))
                this.newPwd.current.state.value = ''
            }
           

        }





    };
    prev = () => {

        this.setState(state => ({
            current: state.current - 1
        }));

    };
    changePassword = async () => {
        // const { newPwd } = this.state;
        if(this.comfirmPwd.current.state.value == ''){
            message.error('密码不能为空')
        }else{
            if(this.comfirmPwd.current.state.value !== this.changePwd){
                message.error('两次密码不一致，请重新输入')
            }else{
                const result = await changePassword(this.props.user.id,this.comfirmPwd.current.state.value)
              if(result.success_code === 200){
                  message.success(result.message+',请重新登录');
                  this.props.logout();
                  this.props.history.push('/login')
                //   <Redirect to='/login'/>

              }else{
                  message.error(result.message)
              }
            }
            
        }
       
    }
    render() {
        const { current} = this.state;
        const steps = [
            {
                title: '请输入原来密码',
                content: (
                    <Row>
                        <Col span={18} offset={3}>
                            <Input.Password placeholder="请输入原来密码" size="large" ref={this.currentPwd} iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)} />
                        </Col>
                    </Row>
                ),
            },
            {
                title: '请输入修改的密码',
                content: (
                    <Row>
                        <Col span={18} offset={3}>
                            <Input.Password placeholder="请输入修改密码" size="large" ref={this.newPwd} iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)} />
                        </Col>
                    </Row>
                ),
            },
            {
                title: '确定密码',
                content: (
                    <Row>
                        <Col span={18} offset={3}>
                            <Input.Password placeholder="确认密码" size="large" ref={this.comfirmPwd} iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)} />
                        </Col>
                    </Row>
                ),
            },
        ];

        return (
            <Row>
                <Col span={22} offset={1}>
                    <Card>
                        <Steps current={current}>
                            {steps.map(item => (
                                <Step key={item.title} title={item.title} />
                            ))}
                        </Steps>
                        <div className="steps-content">{steps[current].content}</div>
                        <div className="steps-action">
                            {current < steps.length - 1 && (
                                <Button type="primary" onClick={this.next}>
                                    下一步
            </Button>
                            )}
                            {current === steps.length - 1 && (
                                <Button type="primary" onClick={this.changePassword}>
                                    确定修改
            </Button>
                            )}
                            {current > 0 && (
                                <Button style={{ margin: '0 8px' }} onClick={this.prev}>
                                    上一步
            </Button>
                            )}
                        </div>
                    </Card>
                </Col>
            </Row>
        )
    }
}

export default connect(
    state => ({
        user: state.user
    }),
    {logout}
)(withRouter(ChangePassword))