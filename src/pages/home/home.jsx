import React, { Component } from 'react';
import { Row, Col, Card, Tag, Pagination, Avatar, List, Typography, Divider } from 'antd'
import {
  EyeOutlined,
  UserOutlined,
  TagOutlined,
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined
} from '@ant-design/icons'
import { getAllBlog, getHotArticle } from '../../api';
import { PAGE_SIZE, LIMIT_COUNT } from '../../utils/constants'
import monment from 'moment'
import './home.css';
const { Meta } = Card;
export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allBlog: [],
      hotblog: [],
      total: 0
    }
  }
  componentDidMount() {
    this.getAllBlog(1);
    this.getHotArticle();
  }
  //分页获取文章
  getAllBlog = async (pageNum) => {
    this.pageNum = pageNum;
    const result = await getAllBlog(pageNum, PAGE_SIZE);
    //console.log(result)
    if (result.success_code === 200) {
      this.setState({
        allBlog: result.data.list,
        total: result.data.total
      })
    }
  }
  //获取热门文章
  getHotArticle = async () => {
    const result = await getHotArticle(LIMIT_COUNT);
    // console.log(result);
    if (result.success_code === 200) {
      this.setState({
        hotblog: result.data
      })
    }
  }
  render() {
    const { allBlog, total, hotblog } = this.state;
    //console.log(hotblog)

    return (
      <div>

        <Row>
          <Col span={22} offset={1} >
            <Row >
              <Col span={17} className='blog-wrap' xs={24} sm={24} md={17}>
                {
                  allBlog.map(blog => {
                    return (
                      <Card
                        title={blog.title}
                        extra={monment(blog.currentime).format('YYYY-MM-DD HH:mm:ss')}
                        style={{ width: '100%', marginBottom: 8, cursor: 'pointer' }}
                        onClick={() => this.props.history.push('/blogdetail', blog)}
                      >
                        <p
                          className='blog-content'
                          dangerouslySetInnerHTML={{ __html: new Buffer(blog.content) }}

                        >

                        </p>
                        <p>
                          <span>
                            <EyeOutlined />
                            <span style={{ marginLeft: 4 }}>{blog.readcount}</span>
                          </span>
                          <span style={{ margin: '0 8px' }}>
                            <UserOutlined />
                            <span style={{ marginLeft: 4 }}>{blog.author}</span>
                          </span>
                          <span>
                            <TagOutlined />
                            <Tag color="magenta" style={{ marginLeft: 4 }}>{blog.label}</Tag>
                          </span>
                        </p>
                      </Card>
                    )
                  })
                }


                {
                  allBlog.length > 0 ? <Pagination
                    current={this.pageNum}
                    total={total}
                    defaultPageSize={PAGE_SIZE}
                    onChange={this.getAllBlog}
                  /> : null
                }

              </Col>
              <Col span={6} offset={1} sm={0} md={6} xs={0}>
                {/* <Card
                  style={{ width: '100%' }}
                  cover={
                    <img
                      alt="example"
                      src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                    />
                  }
                  actions={[
                    <SettingOutlined key="setting" />,
                    <EditOutlined key="edit" />,
                    <EllipsisOutlined key="ellipsis" />,
                  ]}
                >
                  <Meta
                    avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                    title="Card title"
                    description="This is the description"
                  />
                </Card> */}
                <List
                  header={<div>热门文章</div>}
                  bordered
                  dataSource={hotblog}
                  style={{ backgroundColor: '#fff' }}
                  renderItem={(item, index) => (
                    <List.Item style={{ cursor: 'pointer' }} onClick={() => this.props.history.push('/blogdetail', item)}>
                      <Typography.Text >{index + 1}</Typography.Text> {item.title}
                    </List.Item>
                  )}
                />
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    )
  }
}