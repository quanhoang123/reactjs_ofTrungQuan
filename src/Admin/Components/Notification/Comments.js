import React, {Component} from 'react';


class Comment extends Component {
    render () {
      return(
        <div className="comment">
          <p className="comment-header">{this.props.author}</p>
          <p className="comment-body">- {this.props.body}</p>
          <div className="comment-footer">
            <button className="comment-footer-delete" onClick={this._deleteComment}>Delete Comment</button>
          </div>
        </div>
      );
    }
    _deleteComment() {
      alert("-- DELETE Comment Functionality COMMING SOON...");
    }
  
}

export default Comment;