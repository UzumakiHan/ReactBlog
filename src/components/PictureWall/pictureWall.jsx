import React, { Component } from 'react';
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import { Upload, Modal, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { BASE_IMG_URL } from '../../utils/constants';
import {blogUserImage} from '../../api';
import {updateAvatar} from '../../redux/actions'
function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}
 class PictureWall extends Component {
    static propTypes = {
        imgs: PropTypes.array,
        username:PropTypes.string.isRequired
    }
    
    constructor(props) {
       // console.log(this.props.imgs)
        super(props);
        let fileList = [];
        const { imgs } = this.props;
        if (imgs && imgs.length > 0) {
            fileList = imgs.map((img, index) => ({
                uid: -index, // 每个file都有自己唯一的id
                name: img, // 图片文件名
                status: 'done', // 图片状态: done-已上传, uploading: 正在上传中, removed: 已删除
                url: BASE_IMG_URL + img
            }))
        }
        this.state = {
            previewVisible: false,
            previewImage: '',
            fileList
        };
    }
/*
  获取所有已上传图片文件名的数组
   */
  getImgs  = () => {
    return this.state.fileList.map(file => file.name)
  }

    handleCancel = () => this.setState({ previewVisible: false });

    handlePreview = async file => {

        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }

        this.setState({
            previewImage: file.url || file.preview,
            previewVisible: true,
            previewTitle: file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
        });
    };
    handleChange = async ({ file, fileList }) => {
       // console.log(file)
        if (file.status === 'done') {
            const result = file.response;
           // console.log(result)
            if (result.status === 0) {
                message.success('修改图片成功');
                const { name, url } = result.data
                file = fileList[fileList.length - 1]
                file.name = name
                file.url = url;
                this.props.updateAvatar(result.data.url,this.props.username);
                const blogResult = await blogUserImage(result.data.url,this.props.username);
                //console.log(blogResult)
            } else {
                message.error('上传图片失败');
            }
        } else if (file.status === 'removed') {
            // const result = await reqDelImg(file.name);
            // if (result.status === 0) {
            //     message.success('删除图片成功')
            // } else {
            //     message.error('删除图片失败')
            // }
        }
        this.setState({ fileList });
    }

    // handleChange = ({ fileList }) => this.setState({ fileList });

    render() {
        const { previewVisible, previewImage, fileList, previewTitle } = this.state;
        const uploadButton = (
            <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>更改头像</div>
            </div>
        );
        return (
            <>
                <Upload
                    action="/updateAvatar"
                    listType="picture-card"
                    accept='image/*'  /*只接收图片格式*/
                    name='image' /*请求参数名*/
                    fileList={fileList}
                    onPreview={this.handlePreview}
                    onChange={this.handleChange}
                >
                    {fileList.length > 3 ? null : uploadButton}
                </Upload>
                <Modal
                    visible={previewVisible}
                    title={previewTitle}
                    footer={null}
                    onCancel={this.handleCancel}
                >
                    <img alt="example" style={{ width: '100%' }} src={previewImage} />
                </Modal>
            </>
        );
    }
}
export default connect(
    state=>({
        user:state.user
    }),
    {updateAvatar}
    
)(PictureWall)