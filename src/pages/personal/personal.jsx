import React, { Component } from 'react';
import { Card, Col, Row, Avatar, Typography } from 'antd'
import vueblogpng from '../../assets/vublog.png'
import wechatpng from '../../assets/wechat.png'
import myblogpng from '../../assets/myblog.png'
import musicbg from '../../assets/musicbg.jpg'
import vueshop from '../../assets/vueshop.png'
import vueshopadmin from '../../assets/vueshopadmin.png'
import webModal from '../../assets/webModal.png';
import reactadmin from '../../assets/reactadmin.png'
import userlogo from '../../assets/logo.jpg'
const { Title, Paragraph } = Typography;
const { Meta } = Card;

export default class Personal extends Component {
    render() {
        return (
            <div>
                <Row>
                    <Col span={22} offset={1}>
                        <Card>
                            <Row>
                                <Col>
                                    <Avatar
                                        src={userlogo}
                                        size={80}
                                    />
                                </Col>
                                <Col style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', marginLeft: 10 }}>
                                    <h4 style={{fontSize:20}}>JeslieHe</h4>
                                    <p>一个97年的前端小白！Web前端开发工程师。需要的东西需要自己去争取。</p>
                                </Col>
                            </Row>
                            <Row style={{ marginTop: 20 }}>
                                <Col>
                                    <Title level={4}>个人简介</Title>
                                    <Paragraph>
                                        一个97年的前端小白，大学的时候半路出家的程序员，刚开始接触开发的时候会比较麻烦，学习的路上也走过较多的弯路。不过学习还是要不断的约束自己，
                                        入门看视频敲代码，做一些简单的案列巩固，后面学起来就计较轻松了，平时喜欢一边听歌，一边打代码开发，
                                        比较喜欢积累以及整理前端开发的代码素材。学过了技术栈有vue、node、mysql，React、Uni-app,能够熟练的编写项目，
                                        不过还是需要不断地学习巩固，现在工作上的主要运用的是原生js和JQ来实现代码业务功能。
                                </Paragraph>

                                </Col>
                            </Row>
                            <Row style={{ marginTop: 20 }}>
                            <Title level={4}>个人实例项目</Title>
                                <Col>
                                    <Row>
                                        <Col span={6}>
                                        <Card
                                        hoverable
                                        
                                        cover={
                                        <img 
                                        alt="example" 
                                        src={vueblogpng} 
                                       
                                        />}
                                    >
                                        <Meta title="vueBlog" description="http://42.194.193.249:6600" />
                                    </Card>
                                        </Col>
                                        <Col span={6} offset={3}>
                                        <Card
                                        hoverable
                                        
                                        cover={
                                        <img 
                                        alt="example" 
                                        src={wechatpng} 
                                       
                                        />}
                                    >
                                        <Meta title="简单的多用户聊天" description="http://42.194.193.249:6400/" />
                                    </Card>
                                        </Col>
                                        <Col span={6} offset={3}>
                                        <Card
                                        hoverable
                                        
                                        cover={
                                        <img 
                                        alt="example" 
                                        src={myblogpng} 
                                       
                                        />}
                                    >
                                        <Meta title="纯原生JS个人主页" description="http://42.194.193.249:3240" />
                                    </Card>
                                        </Col>
                                    </Row>
                                    

                                </Col>
                                <Col style={{marginTop:10}}>
                                   
                                    <Row>
                                        <Col span={6}>
                                        <Card
                                        hoverable
                                        
                                        cover={
                                        <img 
                                        alt="example" 
                                        src={webModal} 
                                       
                                        />}
                                    >
                                        <Meta title="前端开发常见模板整理" description="http://xxxxx" />
                                    </Card>
                                        </Col>
                                        <Col span={6} offset={3}>
                                        <Card
                                        hoverable
                                        
                                        cover={
                                        <img 
                                        alt="example" 
                                        src={vueshop} 
                                       
                                        />}
                                    >
                                        <Meta title="vue移动端商城" description="http://42.194.193.249:3260/" />
                                    </Card>
                                        </Col>
                                        <Col span={6} offset={3}>
                                        <Card
                                        hoverable
                                        
                                        cover={
                                        <img 
                                        alt="example" 
                                        src={vueshopadmin} 
                                       
                                        />}
                                    >
                                        <Meta title="vue商城后台管理" description="http://xxxxxxx" />
                                    </Card>
                                        </Col>
                                    </Row>
                                    <Row style={{marginTop:10}}>
                                    <Col span={6}>
                                        <Card
                                        hoverable
                                        
                                        cover={
                                        <img 
                                        alt="example" 
                                        src={reactadmin} 
                                       
                                        />}
                                    >
                                        <Meta title="React商城后台管理" description="http://xxxxx" />
                                    </Card>
                                        </Col>
                                    <Col span={6} offset={3}>
                                        <Card
                                        hoverable
                                        
                                        cover={
                                        <img 
                                        alt="example" 
                                        src={musicbg} 
                                       
                                        />}
                                    >
                                        <Meta title="仿网易云音乐播放器" description="http://42.194.193.249:3010/" />
                                    </Card>
                                        </Col>
                                    </Row>

                                </Col>
                            </Row>
                        </Card>
                    </Col>
                </Row>
            </div>
        )
    }
}