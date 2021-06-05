import React, {Component} from 'react';



class CommentForm extends Component {
  _admin=[];
  getUser=()=>{                
    this._admin=JSON.parse(localStorage.getItem("AdminActive"));     
    return this._admin;
  }
    render() {
      return (
        <form className="comment-form" onSubmit={this._handleSubmit.bind(this)}>
          <div className="comment-form-fields">
            <input disabled  id ="username1" value={this.getUser()} className="form-control"/>
            <textarea placeholder="Comment" className="form-control" rows="6" required ref={(textarea) => this._body = textarea}></textarea>
          </div>
          <div className="comment-form-actions">
            <button type="submit" className="btn btn-danger btn-sm rounded-0 pull-right">Reply Comment</button>
          </div>
        </form>
      );
    } // end render
    
    _handleSubmit(event) { 
      event.preventDefault();   // prevents page from reloading on submit
      let author = document.getElementById('username1').value;   
      let content = this._body;
      this.props.addComment(author, content.value);
    }
  } // end CommentForm component
export default CommentForm;