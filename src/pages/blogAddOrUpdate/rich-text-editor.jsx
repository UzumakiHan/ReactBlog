import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, ContentState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
export default class RichTextEditor extends Component {
    static propTypes = {
        detail: PropTypes.string
    }
    state = {
        editorState: EditorState.createEmpty(), // 创建一个没有内容的编辑对象
    }
    constructor(props) {
        super(props);
        //根据传入的html文本初始化
        const detail = this.props.detail;
        let editorState;
        if (detail) {// 如果传入才需要做处理
            const blocksFromHtml = htmlToDraft(detail);
            const { contentBlocks, entityMap } = blocksFromHtml;
            const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
            editorState = EditorState.createWithContent(contentState)
            this.state = {
                editorState,
            }
        } else {
            this.state = {
                editorState: EditorState.createEmpty(), // 创建一个没有内容的编辑对象
            }
        }

    }
    onEditorStateChange = (editorState) => {
        this.setState({
            editorState
        })
    }
    
    getDetail = () => {
        return draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()));
    }
    render() {
        const { editorState } = this.state;
        return (
            <Editor
                editorState={editorState}
                editorStyle={{ height: 350, border: '1px solid #eee', padding: '0 30px',backgroundColor:'#fff' }}
                onEditorStateChange={this.onEditorStateChange} 
               
                />
        )
    }
}