import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Row, Col, Form, Input, Button, message,
    Modal
} from 'antd';
import RichTextEditor from './rich-text-editor';
import moment from 'moment';
import { publicArticle, editArticle } from '../../api'
class BlogAddOrUpdate extends Component {
    constructor(props) {
        super(props);
        this.editor = React.createRef();
        this.inputVal = React.createRef();
        this.modalForm = React.createRef();
        this.state = {
            isShow: false,
            title: '',
            content: '',
            label: '',
            mold: '',
            id: 0
        }
    }
    onFinish = values => {
       // console.log('Success:', values);
    };

    onFinishFailed = errorInfo => {
       // console.log('Failed:', errorInfo);
    };
    showPublicModal = () => {
        this.setState({
            isShow: true
        })
    }
    handleCancel = () => {
        this.setState({
            isShow: false
        })
    }
    pubilcBlog = async () => {
        const { id } = this.state;
        const title = this.inputVal.current.state.value;
        const content = this.editor.current.getDetail();
        const label = this.modalForm.current.getFieldValue('blogTag');
        const mold = this.modalForm.current.getFieldValue('blogType')
        const currentime = moment().format('YYYY-MM-DD HH:mm:ss');
        const author = this.props.user.username
        const { image } = this.props.user;
        if (title == '' || content == '' || label == '' || mold == '') {
            message.error('请填写全部信息');
        } else {
            this.setState({
                isShow: false
            })
            if (id) {
                //console.log(id, title, content, label, mold, currentime)
                const result = await editArticle(id, title, content, label, mold, currentime);
                // console.log(result)
                if (result.success_code === 200) {
                    message.success(result.message);
                    this.props.history.replace('/myblog')
                } else {
                    message.error(result.message)
                }
            } else {
                const result = await publicArticle(title, content, label, mold, currentime, author, image);
                if (result.success_code === 200) {
                    message.success(result.message);
                    this.props.history.replace('/myblog')
                } else {
                    message.error(result.message)
                }
            }

        }
    }
    componentWillMount() {
        this.initBlog()
    }
    initBlog = () => {
      //  console.log(this.props.location.state);

        // console.log(new Buffer(content).toString())
        if (this.props.location.state == undefined) {
            this.setState({
                id: 0,
                title: '',
                content: '',
                label: '',
                mold: ''
            })

        } else {
            const { id, title, content, label, mold } = this.props.location.state;
            this.setState({
                id,
                title,
                content: new Buffer(content).toString(),
                label,
                mold
            })
        }
    }
    render() {


        const { isShow, title, content, label, mold } = this.state;

        // console.log()
        return (
            <div>
                <Row >
                    <Col span={22} offset={1}>
                        <Row>
                            <Col span={19} offset={1}>
                                <Input placeholder='请输入题目' size={"large"} ref={this.inputVal} value={title} />
                            </Col>
                            <Col span={3} style={{ marginLeft: 8 }}>
                                <Button type='primary' size='large' onClick={this.showPublicModal}>发表博客</Button>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Row style={{ marginTop: 10 }}>
                    <Col span={22} offset={1}>
                        <RichTextEditor detail={content} ref={this.editor} />
                    </Col>
                </Row>
                {
                    isShow ? (
                        <Modal
                            visible={isShow}
                            title="发表博客"
                            okText="确定"
                            cancelText="取消"
                            onCancel={this.handleCancel}
                            onOk={this.pubilcBlog}
                        >
                            <Form
                                ref={this.modalForm}
                                layout="vertical"
                                name="form_in_modal"
                                preserve={false}

                            >
                                <Form.Item
                                    label='文章标签'
                                    name="blogTag"
                                    initialValue={label}

                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                    label='文章类型'
                                    name="blogType"
                                    initialValue={mold}

                                >
                                    <Input />
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
    })
)(BlogAddOrUpdate)