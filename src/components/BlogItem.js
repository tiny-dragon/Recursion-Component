import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as blogActions from 'store/modules/blog';

class BlogItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            index: props.index,
            subject: props.subject,
            content: props.content,
            status: props.status,
            child_blog_list: props.child_blog_list,
            child_index: props.child_index
        };
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        return { index: nextProps.index, subject: nextProps.subject, content: nextProps.content, status: nextProps.status, child_blog_list: nextProps.child_blog_list };
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (nextState.index === this.state.index &&
            nextState.subject === this.state.subject &&
            nextState.content === this.state.content &&
            nextState.status === this.state.status &&
            nextState.child_blog_list === this.state.child_blog_list &&
            nextState.child_index === this.state.child_index &&
            nextProps.index === this.props.index &&
            nextProps.subject === this.props.subject &&
            nextProps.content === this.props.content &&
            nextProps.status === this.props.status &&
            nextProps.child_blog_list === this.props.child_blog_list &&
            nextProps.child_index === this.props.child_index)
            return false
        return true
    }
    
    handleDelete = () => {
        this.props.onDeleteItem(this.state.index)
    }

    handleReply = () => {
        this.props.onAddItem(this.state.index);
    }

    handleStatusToggle = () => {
        const status = this.state.status;
        this.props.onUpdateItem({index: this.state.index, status: !status});
    }

    handleChange = (e) => {
        this.props.onUpdateItem({index: this.state.index, [e.target.name]: e.target.value})
    }

    render() {
        const style = {
            paddingLeft: '20px'
        }
        const child_blog_list = this.state.child_blog_list;
        const list = child_blog_list.map(
            info => (<BlogItem key={info.index} index={info.index} subject={info.subject} content={info.content} status={info.status} child_blog_list={info.child_blog_list} child_index={info.child_index} 
                            onAddItem={this.props.onAddItem} onUpdateItem={this.props.onUpdateItem} onDeleteItem={this.props.onDeleteItem} />)
        );
        let blog_item = null
        if (this.state.status === true)
            blog_item = (
                <div>
                    <div className="input-panel">
                        <div><input placeholder="제목" value={this.state.subject} onChange={this.handleChange} name="subject" /></div>
                        <div><textarea placeholder="내용" value={this.state.content} onChange={this.handleChange} name="content"></textarea></div>
                        <button onClick={this.handleStatusToggle}>등록</button>
                    </div>
                    <div style={style}>
                        {list}
                    </div>
                </div>
            )
        else
            blog_item = (
                <div className="show-panel">
                    <div className="subject">
                        <b>{this.props.subject}</b>
                        <button onClick={this.handleStatusToggle}>edit</button>
                        <button onClick={this.handleDelete}>delete</button>
                        <button onClick={this.handleReply}>reply</button>
                    </div>
                    <div className="content">{this.props.content}</div>
                    <div style={style}>
                        {list}
                    </div>
                </div>
            )
        return (
            <div>
                {blog_item}
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = (dispatch) => ({
    onAddItem: (item) => dispatch(blogActions.add_item(item)),
    onUpdateItem: (item) => dispatch(blogActions.update_item(item)),
    onDeleteItem: (item) => dispatch(blogActions.delete_item(item)),
})

export default connect(mapStateToProps, mapDispatchToProps)(BlogItem);