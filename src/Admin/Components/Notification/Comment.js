import React, { Component } from 'react';
// import axios from 'axios';
import CommentForm from './CommentForm';
import Comment from './Comments';
import axios from 'axios';
import callAPI from '../CallAPI/callApi';

class Comments extends Component {
    _admin=[];
    constructor() {
        super();
        this.state = {
          showComments: false,
          comments:[],
          content:'',
          _user1:[],
          _user:[],
          
        };
      }
      _getComments=()=> {  
        axios({
            method: 'GET',
            url: 'https://data-json-server.herokuapp.com/api/comments',
            data: null
        }).then(res => {
            this.setState({ 
                comments: res.data,            
                // id:res.data.length,
            });       
            // console.log(this.state.comments.length);
        }).catch(err => { });
        return this.state.comments.map(comment => (
          this.state._user1=comment.user,
          comment.user.map(us=>{
            return (
              <Comment 
                author={us.name}
                admin={comment.admin}
                body={comment.content}
                time={comment.time}
                key={comment.id} />
            ); 
          })
          
        ));
      }
      componentDidMount(){
        this._getComments();
      }

      render () {
        // console.log(this.state._user1)
        const comments = this._getComments();
        let commentNodes;
        let buttonText = 'Show Comments';       
        if (this.state.showComments) {
          buttonText = 'Hide Comments';
          commentNodes = <div className="comment-list">{comments}</div>;
        }    
        return(
            <div className="comment-box"> 
                <CommentForm addComment={this._addComment.bind(this)}/>
                    <button className="btn btn-danger btn-sm rounded-0" id="comment-reveal" onClick={this._handleClick.bind(this)}>
                    {buttonText}
                    </button>            
                  <div className="nav-item dropdown">
                    <a className="nav-link" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      <i className="material-icons">notifications</i>
                      <span className="notification">{this._getCommentsTitle(comments.length)}</span>
                      <p className="d-lg-none d-md-block">
                        Some Actions
                      </p>
                    </a>               
                  </div>
                {commentNodes}
            </div>  
        );
      } // end render
      getToday=()=>{
        var date = new Date();
        var data="";
        return data +=  date.toLocaleDateString();
      }
      _addComment=(author, body)=> {       
        const comment = {
          user:this.state._user1,
          time:this.getToday(),
          admin:author,
          content:body
        };
        callAPI(`comments`,'POST',comment).then(res=>{             
            this._getComments();  
            window.location.reload();
        })
        // this.setState({ 
        //     comments: this.state.comments.concat([comment]) }); // *new array references help React stay fast, so concat works better than push here.
      }
      
      _handleClick() {
        this.setState({
          showComments: !this.state.showComments
        });
      }

      _getCommentsTitle(commentCount) {
        if (commentCount === 0) {
          return '0';
        } else if (commentCount === 1) {
          return "1";
        } else {
          return `${commentCount} `;
        }
      }
    } // end CommentBox component
    
    
    
  
export default Comments;