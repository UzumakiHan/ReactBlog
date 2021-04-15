import React, { Component } from 'react';
import { Typography, Row, Col, Card } from 'antd';

const { Title, Paragraph } = Typography;




export default class About extends Component {

  render() {

    return (
      <Row>
        <Col span={22} offset={1}>
          <Card>
            <Typography style={{ fontSize: 18 }}>


              <Title level={2}>ReactBlog介绍</Title>
              <Paragraph>
                ReactBlog博客的设计理念:主要运用了前后端的分离思想，实现了个人注册、个人登录功能、文章评论、用户个人资料以及账号信息的修改，
                用户可以很好的管理个人的博客。发布博客，修改博客以及删除博客，实现了多用户博客。
    </Paragraph>
              <Title level={3}>ReactBlog前端运用到的技术</Title>
              <Paragraph>
                1.React
              </Paragraph>
              <Paragraph>
                2.Ant Design
             </Paragraph>
              <Paragraph>
                3.React-redux
              </Paragraph>
              <Title level={3}>ReactBlog后端运用到的技术</Title>
              <Paragraph>
                1.node.js+express
              </Paragraph>
              <Paragraph>
                2.mysql
             </Paragraph>


            </Typography>
          </Card>
        </Col>
      </Row>


    )
  }
}