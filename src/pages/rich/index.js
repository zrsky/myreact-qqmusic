import React from 'react'
import { Editor } from 'react-draft-wysiwyg'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import { Card, Button, Modal } from 'antd'
import draftToHtml from 'draftjs-to-html';

export default class Rich extends React.Component{

    state = {
        editorState: '',
        showModal: false,
        contentState: ''
    }

    onEditorStateChange = (editorState)=>{
        this.setState({
            editorState
        })
    }

    onClearState = ()=>{
        this.setState({
            editorState: ''
        })
    }

    onContentStateChange = (contentState)=>{
        this.setState({
            contentState
        })
    }

    getHTMLText = ()=>{
        this.setState({
            showModal: true
        })
    }

    render() {
        return (
            <div>
                <Card style={{textAlign: 'left'}}>
                    <Button style={{marginRight: 20}} type="primary" onClick={this.onClearState}>清空内容</Button>
                    <Button type="primary" onClick={this.getHTMLText}>获取HTML文本</Button>
                </Card>
                <Card title="富文本编辑器">
                    <Editor
                        editorState={this.state.editorState}
                        toolbarClassName="toolbarClassName"
                        wrapperClassName="wrapperClassName"
                        editorClassName="editorClassName"
                        onEditorStateChange={this.onEditorStateChange}
                        onContentStateChange={this.onContentStateChange}
                    />
                </Card>
                <Modal 
                    title="文本内容"
                    visible={this.state.showModal}
                    onCancel={()=>{
                        this.setState({
                            showModal: false
                        })
                    }}
                    footer={null}
                    >
                    {draftToHtml(this.state.contentState)}
                </Modal>
            </div>   
        )
    }
}