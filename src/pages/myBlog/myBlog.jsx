import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import { Select, Row, Col, Card, Tag, Pagination, Avatar, message, Empty, Button, Form, Input, Modal} from 'antd'
import {
  EyeOutlined,
  UserOutlined,
  TagOutlined,
  GithubOutlined,
  BoldOutlined,
  EditOutlined,
  FormOutlined,
  DeleteOutlined
} from '@ant-design/icons'
import { getOwnBlog, deleteArticle } from '../../api';
import {updateUserInfo} from '../../redux/actions'
import { PAGE_SIZE } from '../../utils/constants'
import monment from 'moment';
import PictureWall from '../../components/PictureWall/pictureWall'
import './myBlog.css';
const { Meta } = Card;
const { Option } = Select;
class MyBlog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ownBlog: [],
      total: 0,
      isShow: false,
      imgs:[]
    }
    this.userForm = React.createRef();
    this.pw = React.createRef()
   
  }
  componentDidMount() {
    this.getOwnBlog(1);

  }
  //分页获取文章
  getOwnBlog = async (pageNum) => {
    const author = this.props.user.username;
    this.pageNum = pageNum;
    const result = await getOwnBlog(author, pageNum, PAGE_SIZE);
    // console.log(result)
    if (result.success_code === 200) {
      this.setState({
        ownBlog: result.data.list,
        total: result.data.total
      })
    }
  }
  //去我的github
  goToMyNet = (href) => {
    window.open(href)
  }
  //删除文章
  deleteBlog = async (id) => {
    const result = await deleteArticle(id);
    if (result.success_code === 200) {
      message.success(result.message);
      this.getOwnBlog(1);
    } else {
      message.error(result.message)
    }
  }
  openUserModal = () => {
    this.setState({
      isShow: true
    })
  }
  handleCancel = () => {

    this.setState({
      isShow: false
    })
    this.getOwnBlog(1);
  }

  changeUserInfo = async () => {
    this.setState({
      isShow: false
    });
    const username = this.userForm.current.getFieldValue('username');
    const realname = this.userForm.current.getFieldValue('realname');
    const job = this.userForm.current.getFieldValue('job');
    const location = this.userForm.current.getFieldValue('location');
    const birthday = this.userForm.current.getFieldValue('birthday');
    const information = this.userForm.current.getFieldValue('information');
    const sex = this.sex;
    this.props.updateUserInfo(username,birthday,location,information,realname,job,sex);
    //console.log(username,realname,job,location,birthday,information,sex)
  }
  handleChange = (value) => {
    this.sex = value
   
  }
  render() {
    const { ownBlog, total, isShow,imgs } = this.state;
    const { username, image, information, job, location,realname,birthday } = this.props.user
    this.sex = this.props.user.sex
   // console.log(this.props.user)
    // console.log(ownBlog)

    return (
      <div>

        <Row>
          <Col span={22} offset={1} >
            <Row >
              <Col span={17} className='blog-wrap' xs={24} sm={24} md={17}>
                {
                  ownBlog.length > 0 ?
                    <div>
                      {
                        ownBlog.map(blog => {
                          return (
                            <Card
                              title={<span
                                onClick={() => this.props.history.push('/blogdetail', blog)}
                                className='blog-title'
                              >{blog.title}</span>}
                              extra={monment(blog.currentime).format('YYYY-MM-DD HH:mm:ss')}
                              style={{ width: '100%', marginBottom: 8 }}

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
                                <span className='icon-hover' onClick={() => this.props.history.push('/blogpublic', blog)}>
                                  <FormOutlined />
                                  <span style={{ marginLeft: 4 }}>编辑</span>
                                </span>
                                <span className='icon-hover' onClick={() => this.deleteBlog(blog.id)}>
                                  <DeleteOutlined />
                                  <span style={{ marginLeft: 4 }}>删除</span>
                                </span>
                              </p>
                            </Card>
                          )
                        })
                      }
                    </div> :
                    <Empty
                      image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                      imageStyle={{
                        height: 60,
                      }}
                      description={
                        <span>
                          暂无数据
                  </span>
                      }
                    >
                      <Link to='/blogpublic'><Button type="primary">编写第一篇文章</Button></Link>

                    </Empty>
                }



                {
                  ownBlog.length > 0 ? <Pagination
                    current={this.pageNum}
                    total={total}
                    defaultPageSize={PAGE_SIZE}
                    onChange={this.getOwnBlog}
                  /> : null
                }
              </Col>
              <Col span={6} offset={1} sm={0} md={6} xs={0}>
                <Card
                  style={{ width: '100%' }}
                  cover={
                    <img
                      alt="example"
                      src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                    />
                  }
                  actions={[

                    <EditOutlined key="change" onClick={this.openUserModal} title='修改资料' />,
                    <GithubOutlined key="edit"  onClick={() => this.goToMyNet('https://github.com/Jane-He628')} />,
                    <BoldOutlined key="ellipsis" onClick={() => this.goToMyNet('https://blog.csdn.net/Hhjian524?spm=1000.2115.3001.5113')} />,
                  ]}

                >
                  <Meta
                    avatar={<Avatar src={image} />}
                    title={username}
                    description={information}
                  />
                  <Row style={{ marginTop: 10 }}>
                    <Col span={20} style={{ textAlign: 'left', marginLeft: 48, color: 'rgba(0, 0, 0, 0.45)' }}>
                      {job}
                    </Col>
                  </Row>
                  <Row style={{ marginTop: 10 }}>
                    <Col span={20} style={{ textAlign: 'left', marginLeft: 48, color: 'rgba(0, 0, 0, 0.45)' }}>
                      {location}
                    </Col>
                  </Row>
                </Card>

              </Col>
            </Row>
          </Col>
        </Row>
        {
          isShow ? (
            <Modal
              visible={isShow}
              title="修改个人信息"
              okText="确定"
              cancelText="取消"
              onCancel={this.handleCancel}
              onOk={this.changeUserInfo}
            >
              <Form
              
              labelCol={{
                span: 4 
              }}
              wrapperCol={{
                span:18
              }}
                ref={this.userForm}
                
                name="form_in_modal"
                preserve={false}

              >
                <Form.Item label='头像' >
                 
                <PictureWall ref={this.pw} imgs={imgs} username={username}/>
                </Form.Item>
                <Form.Item
                  label='用户名'
                  name="username"
                  initialValue={username}

                >
                  <Input disabled />
                </Form.Item>
                <Form.Item
                  label='实名'
                  name="realname"
                  initialValue={realname}

                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label='从事行业'
                  name="job"
                  initialValue={job}

                >
                  <Input />
                </Form.Item>
                <Form.Item
                
                  label='性别'
                  name="sex">
                  <Select defaultValue={ this.sex}  onChange={this.handleChange}>
                    <Option value="男">男</Option>
                    <Option value="女">女</Option>

                  </Select>
                </Form.Item>
                <Form.Item
                  label='地区'
                  name="location"
                  initialValue={location}

                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label='生日'
                  name="birthday"
                  initialValue={birthday}

                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label='个人简介'
                  name="information"
                  initialValue={information}

                >
                  <Input.TextArea />
                </Form.Item>
              </Form>
            </Modal>
          ) : null
        }
      </div>
    )
  }
}
export default connect(
  state => ({
    user: state.user
  }),
  {updateUserInfo}
)(MyBlog)