import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import {logout} from '../../redux/actions'
import { Menu,message,Avatar } from 'antd';
import { connect } from 'react-redux'
import { 
  MailOutlined, 
  HomeOutlined, 
  LoginOutlined,
  UserOutlined,
  EditOutlined,
  LogoutOutlined,
  FileAddOutlined,
  BoldOutlined,
  ReadOutlined
} from '@ant-design/icons';

const { SubMenu } = Menu;

class Nav extends Component {
  state = {
    current: '',
  };
  handleClick = e => {
    console.log('click ', e);
    this.setState({ current: e.key });
  };
  componentWillMount() {
    const current = this.props.history.location.pathname;
    this.setState({
      current
    })

  }
  logout=()=>{
    this.props.logout();
    this.props.history.push('/home')
  }
  goToPublicArticle=()=>{
    if(this.props.user && this.props.user.id){
      this.props.history.push('/blogpublic')
    }else{
      message.error('请登录')
    }
  }
  render() {
    const { current } = this.state;
    const {username} =this.props.user
    //console.log(this.props.user)
    return (
      <Menu onClick={this.handleClick} selectedKeys={[current]} mode="horizontal">
        <Menu.Item key="/home" icon={<HomeOutlined />}>
          <Link to='/home'>首页</Link>

        </Menu.Item>
        <Menu.Item key="/blogpublic" icon={<FileAddOutlined />} onClick={this.goToPublicArticle}>
        发表博客

        </Menu.Item>
        <Menu.Item key="/about" icon={<ReadOutlined />}>
          <Link to='/about'>关于博客</Link>

        </Menu.Item>
        

        
        <Menu.Item key="/personal" icon={<UserOutlined />}>
          <Link to='/personal'>关于作者</Link>

        </Menu.Item>
        {
          this.props.user.id ?
            <SubMenu
              key="SubMenu"
              icon={<Avatar src={this.props.user.image} size='small' style={{marginRight:6}}/>}
              title={username}
              style={{ position: 'absolute', right: '4%' }}>
              {/* <Menu.ItemGroup>
                <Menu.Item key="setting:1" icon={<UserOutlined />}>个人中心</Menu.Item>
              
              </Menu.ItemGroup> */}
              <Menu.ItemGroup>
                <Menu.Item key="myblog" icon={<BoldOutlined />}>
                  <Link to='/myblog'>我的博客</Link>
                </Menu.Item>
              
              </Menu.ItemGroup>
              <Menu.ItemGroup>
                
                <Menu.Item key="changepassword" icon={<EditOutlined />}>
                  <Link to='/changepassword'>修改密码</Link>
                </Menu.Item>
              
              </Menu.ItemGroup>
              <Menu.ItemGroup>
                <Menu.Item key="setting:1" icon={<LogoutOutlined />} onClick={this.logout}>退出登录</Menu.Item>
              
              </Menu.ItemGroup>
            </SubMenu> : <Menu.Item icon={<LoginOutlined />} style={{ position: 'absolute', right: '4%' }}>
              <Link to='/login'>登录</Link>

            </Menu.Item>
        }
      </Menu>
    );
  }
}
export default connect(
  state => ({
    user: state.user
  }),
  {logout}
)(withRouter(Nav))