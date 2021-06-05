import React, { Component } from 'react';
import callAPI from '../CallAPI/callApi';

class Comment extends Component {
  constructor(props){
    super(props);
    this._deleteComment=this._deleteComment.bind(this)
  }
  render() {
    return (
      <div className="comment">
        <div className="row">
        <div className="col-md-2">
            <div className="form-group">
              <input type="text" disabled className="form-control" value="User Name"/>
              <input type="text" disabled className="form-control" value="Comment Of User" />            
            </div>
          </div>  
          <div className="col-md-10">
            <div className="form-group">
              <input type="text" disabled className="form-control" value={this.props.author}/>
              <input type="text" disabled className="form-control" value={this.props.body} />            
            </div>
          </div>      
        </div>
        <label className="pull-right">{this.props.time}</label>
        <label className="pull-right">{this.props.admin}||</label>
        
        <button className="btn btn-danger btn-sm rounded-0" type="button" data-toggle="tooltip" data-placement="top" title="Delete" onClick={()=>this._deleteComment(this.props.id)}>Delete Comment</button> 
        <div className="clearfix" />
      </div>
   
    );
  }
  _deleteComment=(id)=> {
    if (window.confirm('Bạn Co Thuc Su Muon Xoa')) {
      callAPI(`comments/${id}`, "DELETE", null).then((response) => {
        alert("Xoá thành công!");
        
      });
    } else {
      return;
    }
    
  }

}

export default Comment;