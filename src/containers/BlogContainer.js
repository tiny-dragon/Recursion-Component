import React, { Component } from 'react';
import BlogItem from 'components/BlogItem';
import { connect } from 'react-redux';
import * as blogActions from 'store/modules/blog';

class BlogContainer extends Component {
  child_index = 2

  constructor(props) {
    super(props);
    this.state = {
      subject: props.subject,
      content: props.content,
      child_blog_list : props.child_blog_list
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    return { subject: nextProps.subject, content: nextProps.content, child_blog_list: nextProps.child_blog_list };
  }

  handleChange = (e) => {
    this.props.onUpdateItem({index: 0, [e.target.name]: e.target.value})
  }

  handleCreate = () => {
    this.props.onAddItem(0)
  }

  render() {
    const child_blog_list = this.state.child_blog_list;
    const list = child_blog_list.map(
      info => (<BlogItem key={info.index} index={info.index} subject={info.subject} content={info.content} status={info.status} child_blog_list={info.child_blog_list} child_index={info.child_index} />)
    );

    return (
      <div>
        {list}
        <div className="input-panel">
          <div><input placeholder="제목" value={this.state.subject} onChange={this.handleChange} name="subject" /></div>
          <div><textarea placeholder="내용" value={this.state.content} onChange={this.handleChange} name="content"></textarea></div>
          <button onClick={this.handleCreate}>등록</button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  child_index: state.blog.child_index,
  subject: state.blog.subject,
  content: state.blog.content,
  child_blog_list: state.blog.child_blog_list
});

const mapDispatchToProps = (dispatch) => ({
  onAddItem: (item) => dispatch(blogActions.add_item(item)),
  onUpdateItem: (item) => dispatch(blogActions.update_item(item))
})

export default connect(mapStateToProps, mapDispatchToProps)(BlogContainer);