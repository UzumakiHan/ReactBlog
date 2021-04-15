import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Row, Col, Card, Calendar, Comment, Avatar, Form, Button, Tag, Input, Tooltip, List, message } from 'antd';
import {
    UserOutlined,
    TagOutlined,
    EyeOutlined,
    ArrowLeftOutlined,
    FieldTimeOutlined
} from '@ant-design/icons'
import './blogDetail.css';
import monment from 'moment';
import { updateReadCount, publicComment, getcommit } from '../../api'
const { TextArea } = Input;
const Editor = ({ onChange, onSubmit, submitting, value }) => (
    <>
        <Form.Item>
            <TextArea rows={4} onChange={onChange} value={value} />
        </Form.Item>
        <Form.Item>
            <Button htmlType="submit" loading={submitting} onClick={onSubmit} type="primary">
                发表评论
        </Button>
        </Form.Item>
    </>
);
class BlogDetail extends Component {
    state = {
        comments: [],
        submitting: false,
        value: '',

    }
    onPanelChange = (value, mode) => {
       // console.log(value, mode);
    }
    handleChange = e => {
        this.setState({
            value: e.target.value,
        });
    };
    handleSubmit = async () => {
        const { image, author, id } = this.props.location.state;
        const { username, status } = this.props.user;
        const commentime = monment().format('YYYY-MM-DD')
        const { value } = this.state;
        if (value == '') {
            message.error('评论不能为空')
        } else {
            const result = await publicComment(image, author, id, username, status, value, commentime);
            if (result.success_code === 200) {
                //console.log(result)
                this.setState({
                    value: '',
                });
                message.success('评论成功')
            } else {
                message.error(result.message)
            }
        }
    }
    componentDidMount() {
        this.updateReadCount();
        this.getcommit();
    }
    //更新阅读数
    updateReadCount = async () => {
        const { readcount, id } = this.props.location.state;
        // readcount = parseInt(readcount) + 1;
        const result = await updateReadCount(parseInt(readcount) + 1, id);
        // console.log(result)
    }
    //获取对应的评论
    getcommit = async () => {
        const { id } = this.props.location.state;
        const result = await getcommit(id);
        if (result.success_code === 200) {
            this.setState({
                comments: result.message
            })
           // console.log(result.message)
        }

    }
    replyComment = (comment) => {
       // console.log(comment)
    }
    render() {
        //console.log(this.props.location.state)
        const { image } = this.props.user
        // console.log(this.props.user);
        const { submitting, value, comments } = this.state;
        const { title, author, currentime, label, readcount, content } = this.props.location.state
// console.log(new Buffer(content))
        const extra = (
            <div className='extra-div'>
                <span><UserOutlined style={{ marginRight: 4 }} />{author}</span>
                <span><TagOutlined style={{ marginRight: 4 }} /> <Tag color="magenta">{label}</Tag></span>
                <span><EyeOutlined style={{ marginRight: 4 }} />{parseInt(readcount) + 1}</span>
                <span><FieldTimeOutlined style={{ marginRight: 4 }} />{monment(currentime).format('YYYY-MM-DD')}</span>
            </div>
        )
        const cardTitle = (
            <span>
                <ArrowLeftOutlined
                    style={{ color: '#1890ff', marginRight: 6, cursor: 'pointer' }}
                    title='返回'
                    onClick={() => this.props.history.goBack()}
                />
                <span>{title}</span>
            </span>
        )
        const data = [
            {
                actions: [<span key="comment-list-reply-to-0">Reply to</span>],
                author: 'Han Solo',
                avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                content: (
                    <p>
                        We supply a series of design principles, practical patterns and high quality design
                        resources (Sketch and Axure), to help people create their product prototypes beautifully and
                        efficiently.
                </p>
                ),
                datetime: (
                    <Tooltip title={monment().subtract(1, 'days').format('YYYY-MM-DD HH:mm:ss')}>
                        <span>{monment().subtract(1, 'days').fromNow()}</span>
                    </Tooltip>
                ),
            }
        ];

        return (
            <div>
                <Row>
                    <Col span={22} offset={1} >
                        <Row >
                            <Col span={17} className='blog-wrap' xs={24} sm={24} md={17}>
                                <Card title={cardTitle} extra={extra} style={{ width: '100%', marginBottom: 8 }}>
                                    <p dangerouslySetInnerHTML={{ __html: new Buffer(content) }}></p>
                                </Card>
                                <Card title='评论区'>
                                    <Comment
                                        avatar={
                                            <Avatar
                                                src={image}
                                                alt="Han Solo"
                                            />
                                        }
                                        content={
                                            <Editor
                                                onChange={this.handleChange}
                                                onSubmit={this.handleSubmit}
                                                submitting={submitting}
                                                value={value}
                                            />
                                        }
                                    />
                                    <List
                                        className="comment-list"
                                        header={`${comments.length} replies`}
                                        itemLayout="horizontal"
                                        dataSource={comments}
                                        renderItem={item => (
                                            <li>
                                                <Comment
                                                    actions={[<span key="comment-list-reply-to-0" onClick={() => this.replyComment(item)}>回复</span>]}
                                                    author={item.bloguser}
                                                    avatar={item.blogimg}
                                                    content={item.blogcomment}
                                                    datetime={<Tooltip title={monment(item.commentime).format('YYYY-MM-DD')}>
                                                        <span>{monment(item.commentime).format('YYYY-MM-DD')}</span>
                                                    </Tooltip>}
                                                />
                                            </li>
                                        )}
                                    />
                                </Card>
                            </Col>
                            <Col span={6} offset={1} sm={0} md={6} xs={0}>
                                <Card>
                                    <Calendar fullscreen={false} onPanelChange={this.onPanelChange} />
                                </Card>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </div>
        );
    }
}
export default connect(
    state => ({
        user: state.user
    })
)(BlogDetail)