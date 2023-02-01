import React, { Component } from "react";
import Replies from "../Replies/Replies";
import axios from "axios";
import Cookies from 'universal-cookie';

class Comment extends Component {
  state = {
    isReplyOn: false,
    Del: false,
    counter: 0,
    EditComment: false,
    editedComment: this.props.body,
    test: false,
  }

  replyHandler = () => {
    this.setState(prevState => ({
      isReplyOn: !prevState.isReplyOn,
    }))

  }
  DeleteComment = () => {
    const cookies = new Cookies();
    let headers = {
      headers: {
        socialmedia: cookies.get('socialmedia'),
        remember_token: cookies.get('remember_token'),
      }
    }
    let params = {
      id_comment: this.props.CommentID,
    }
    axios.post('http://127.0.0.1:8000/SocialMediaApi/v1/deletecomment', params, headers)
      .then(
        res => {
          console.log(res.data);
        }).catch(err => console.error(err));
    this.setState(prevState => ({
      Del: !prevState.Del,
    }))
    this.setState(prevState => ({
      Del: !prevState.Del,
    }))

  }
  editedCommentHan = (e) => {
    this.setState({
      editedComment: e.target.value
    })
  }
  EditComment = () => {
    this.setState({
      EditComment: !this.state.EditComment,
    })
    if (this.state.EditComment === true) {
      const cookies = new Cookies();
      let headers = {
        headers: {
          socialmedia: cookies.get('socialmedia'),
          remember_token: cookies.get('remember_token'),
        }
      }
      let params = {
        id_comment: this.props.CommentID,
        contentText: this.state.editedComment,
      }
      axios.post('http://127.0.0.1:8000/SocialMediaApi/v1/editcomment', params, headers)
        .then(
          res => {
            console.log(res.data);
            this.setState({
              test: res.data['status'],
            });
          }).catch(err => console.error(err));
    }
  }
  render() {
    return (
      <div>
        {this.state.Del !== true ?
          <div className="container-sm Comments bg-white pb-1 mb-2 ">
            <button type="button" onClick={this.DeleteComment} className="btn btn-danger btn-sm float-right m-1" hidden={this.props.status ? false : true}><i className="fa fa-trash" aria-hidden="true"></i></button>
            <button type="button" onClick={this.EditComment} hidden={this.props.editstate ? false : true} className={`btn ${this.state.EditComment ? "" : "btn-light"} btn-sm float-right m-1`}>{this.state.EditComment ? <i className="fa fa-save"></i> : <i className="fa fa-edit"></i>}</button>

            <div className="media p-3">
              <span class="round">
                <img src={this.props.img} alt="user" style={{ width: "40px", borderRadius: "50%" }} class="align-self-start  " />
              </span>
              <div className=" w-100 text-left pl-4 ">
                <h5>{this.props.author}</h5>
                <small>{this.props.Time}</small>
                <hr />
                <div className="shadow-none">{this.state.EditComment ? "" : this.state.test ? this.state.editedComment : this.props.body}
                  {this.state.EditComment ? <textarea className="float-left w-100 p-1" onChange={this.editedCommentHan}>{this.props.body}</textarea> : ""}
                </div>
              </div>
            </div>
            <footer className="text-center">
              {/* <button className="btn text-info mr-1 shadow-none"><i className="fa fa-thumbs-o-up"></i></button>
              <button className="btn text-danger mr-1 ml-1 shadow-none"><i className="fa fa-thumbs-o-down"></i></button> */}
              <button className="btn text-info  mr-1 ml-1 shadow-none" onClick={this.replyHandler}><i className=" fa fa-reply" aria-hidden="true"></i></button>
            </footer>

            <div className={this.state.isReplyOn ? "" : "d-none "}>
              <Replies PostID={this.props.PostID} CommentID={this.props.CommentID} Creator={this.props.author} />
            </div>
          </div>
          : ""}
      </div>
    );
  }
}
export default Comment
