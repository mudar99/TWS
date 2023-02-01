import { Component } from "react";
import Comment from "./Comment";
import CommentForm from "./CommentForm";
import axios from "axios";
import Cookies from 'universal-cookie';

class Comments extends Component {

  state = {
    showComments: false,
    comments: [],
    counter: 0,
    checkload: false,
    checkStatus : false,
  };
  // Get Comments
  _getComments() {
    return this.state.comments.map(comment => {
      return (
        <Comment
          author={comment.usermodel_id.firstName + " " + comment.usermodel_id.lastName}
          body={comment.contentText}
          PostID={comment.postmodel_id}
          CommentID={comment.id}
          Time={comment.usermodel_id.created_at}
          img={'http://127.0.0.1/SocialMediaBackEnd/storage/app/public/' + comment.usermodel_id.pictureProfile} 
          status = {comment.testDelete}
          editstate = {comment.testEdit}/>
      );
    });
  }

  _handleClick = () => {
    this.setState({
      checkStatus : !this.state.checkStatus,
      showComments: !this.state.showComments,
      checkload: false,
    });
    const cookies = new Cookies();
    let headers = {
      headers: {
        socialmedia: cookies.get('socialmedia'),
        remember_token: cookies.get('remember_token'),
      }
    }
    let params = {
      num: this.state.counter + 1,
      id_post: this.props.PostID,
    }
    axios.post('http://127.0.0.1:8000/SocialMediaApi/v1/comments', params, headers)
      .then(
        res => {
          console.log(res.data);
          if (res.data['status'] == true) {
            this.setState({
              comments: res.data.comments,
              checkload: true,
              counter: this.state.counter + 1,
            });
          }
        }).catch(err => console.error(err));
  }
  GetMoreComments = () => {
    this.setState({
      checkload: false,
    });
    const cookies = new Cookies();
    let headers = {
      headers: {
        socialmedia: cookies.get('socialmedia'),
        remember_token: cookies.get('remember_token'),
      }
    }
    let params = {
      num: this.state.counter + 1,
      id_post: this.props.PostID,
    }
    axios.post('http://127.0.0.1:8000/SocialMediaApi/v1/comments', params, headers)
      .then(
        res => {
          console.log(res.data);
          if (res.data['status'] == true) {
            this.setState({
              comments: res.data.comments,
              checkload: true,
              counter: this.state.counter + 1,
            });
          }
        }).catch(err => console.error(err));
  }
  render() {
    const comments = this._getComments();
    let commentNodes;
    let buttonText = <i className="fa fa-chevron-up"></i>;

    if (this.state.showComments) {
      buttonText = <i className="fa fa-chevron-down"></i>;
    }

    commentNodes = (
      <div className={this.state.showComments ? "" : "d-none"}>
        {comments}
      </div>
    );

    return (
      <div className="comment-box container text-left">
        <CommentForm PostID={this.props.PostID} addComment={this._handleClick} img={this.props.img} />
        <small className="text-muted">
          <br /> {this.state.checkStatus ? "Hide Comments " : "Show Comments"}
          <button className="mb-2 btn shadow-none" onClick={this._handleClick}>
            {buttonText}
          </button>
        </small>
        <div className={this.state.showComments ? "" : "d-none"}>
          <div className="text-center mb-3 p-5" hidden={this.state.checkload == true ? true : false}>
            <div className="spinner-border" role="status">
              <span className="sr-only" >Loading...</span>
            </div>
          </div>
          {commentNodes}
          <div className = "text-center">
        <button className = "btn btn-outline-info btn-sm m-3" onClick={this.GetMoreComments}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-clockwise" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z" />
                            <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z" />
                        </svg> More Comments</button>
        </div>
        </div>
      </div>
    );
  }
}
export default Comments