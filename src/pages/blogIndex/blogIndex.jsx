import React, { Component } from 'react';
import {Redirect,Route,Switch} from 'react-router-dom';
import {connect} from 'react-redux'
import { Layout } from 'antd';
import Nav from '../../components/Nav/nav';
import Home from '../home/home';
import About from '../about/about'
 import BlogDetail from '../blogDetail/blogDetail'
import BlogAddOrUpdate from '../blogAddOrUpdate/blogAddOrUpdate';
import MyBlog from '../myBlog/myBlog';
import ChangePassword from '../changePassword/changePassword';
import NotFound from '../notFound/notFound';
import Personal from '../personal/personal'
const { Header,  Content } = Layout;

class BlogIndex extends Component {

    render() {
        // const user = this.props.user;
        // if (!user.id) {
        //     return <Redirect to='/login' />
        // }
        return (
            <div>
                <Layout >
                    <Header style={{backgroundColor:'#fff'}}>
                        <Nav />
                    </Header>
                    <Layout>
                    <Content style={{paddingTop:20,paddingBottom:20}}>
                        <Switch>
                            <Redirect from='/' to='/home' exact />
                            <Route path='/home' component={Home}></Route>
                            <Route path='/about' component={About}></Route>
                            <Route path='/blogdetail' component={BlogDetail}></Route>
                            <Route path='/blogpublic' component={BlogAddOrUpdate}></Route>
                            <Route path='/myblog' component={MyBlog}></Route>
                            <Route path='/changepassword' component={ChangePassword}></Route>
                            <Route path='/personal' component={Personal}></Route>

                            <Route component={NotFound}></Route>
                        </Switch>
                    </Content>
                    </Layout>
                   
                </Layout>
            </div>
        )
    }
}
export default connect(
    state=>({
        user:state.user
    })
)(BlogIndex)