import { Component } from "react";
import Reply from "./Reply";
import ReplyForm from "./ReplyForm";
import axios from "axios";
import Cookies from 'universal-cookie';

class Replies extends Component {

  state = {
    showReplies: false,
    Replies: [],
    counter: 0,
    checkload: false,
    checkStatus : false,
  };

  _handleClick = () => {
    this.setState({
      checkStatus : !this.state.checkStatus,
      showReplies: !this.state.showReplies,
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
      id_comment: this.props.CommentID,
    }
    axios.post('http://127.0.0.1:8000/SocialMediaApi/v1/replies', params, headers)
      .then(
        res => {
          console.log(res.data);
          if (res.data['status'] == true) {
            this.setState({
              Replies: res.data.replies,
              checkload: true,
              counter: this.state.counter + 1,
            });
          }
        }).catch(err => console.error(err));
  }
  // Get Replies
  _getReplies() {

    return this.state.Replies.map(reply => {
      return (
        <Reply
          creator={this.props.Creator}
          author={reply.usermodel_id.firstName + " " + reply.usermodel_id.lastName}
          body={reply.contentText}
          PostID={reply.postmodel_id}
          CommentID={reply.id}
          Time={reply.usermodel_id.created_at}
          img={'http://127.0.0.1/SocialMediaBackEnd/storage/app/public/' + reply.usermodel_id.pictureProfile} 
          status = {reply.testDelete}
          editstate = {reply.testEdit} />
      );
    });
  }


  GetMoreReplies = () => {
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
      id_comment: this.props.CommentID,
    }
    axios.post('http://127.0.0.1:8000/SocialMediaApi/v1/replies', params, headers)
      .then(
        res => {
          console.log(res.data);
          if (res.data['status'] == true) {
            this.setState({
              Replies: res.data.replies,
              checkload: true,
              counter: this.state.counter + 1,
            });
          }
        }).catch(err => console.error(err));
  }
  render() {
    const Replies = this._getReplies();
    let replyNodes;
    let buttonText = <i className="fa fa-chevron-up"></i>

    if (this.state.showReplies) {
      buttonText = <i className="fa fa-chevron-down"></i>;
    }
    if (this.state.showReplies) {
      replyNodes = (
        <div className="reply-list">
          {Replies}
        </div>
      );
    }
    return (
      <div className="reply-box ">
        <ReplyForm PostID={this.props.PostID} addReply={this._handleClick} img={this.props.img} CommentID={this.props.CommentID} />

        <small className="text-muted">
          <br /> {this.state.checkStatus ? "Hide Replies " : "Show Replies"}
          <button className="mb-2 btn shadow-none" onClick={this._handleClick}>
            {buttonText}
          </button>
        </small>
        <div className={this.state.showReplies ? "" : "d-none"}>
          <div className="text-center mb-3 p-5" hidden={this.state.checkload == true ? true : false}>
            <div className="spinner-border" role="status">
              <span className="sr-only" >Loading...</span>
            </div>
          </div>
          {replyNodes}
          <div className = "text-center">
        <button className = "btn btn-outline-dark btn-sm m-3" onClick = {this.GetMoreReplies}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-clockwise" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z" />
                            <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z" />
                        </svg> More Replies</button>
        </div>
        </div>

      </div>
    );
  }

  // _addReply = (body) => {
  //   const reply = {
  //     id: this.state.Replies.length + 1,
  //     body
  //   };
  //   this.setState({ Replies: this.state.Replies.concat([reply]) });
  // }
}
export default Replies