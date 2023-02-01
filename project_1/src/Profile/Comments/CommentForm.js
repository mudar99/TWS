import { Component } from "react";
import axios from "axios";
import Cookies from 'universal-cookie';
import Comments from "./Comments";

class CommentForm extends Component {
  state = {
    Comment: "",
    Author: ""
  }
  _handleSubmit = (event) => {
    event.preventDefault();
    let body = this._body;
    this.setState({
      Comment: body.value,
    })
    const cookies = new Cookies();
    let headers = {
      headers: {
        socialmedia: cookies.get('socialmedia'),
        remember_token: cookies.get('remember_token'),
      }
    }
    let params = {
      contentText: body.value,
      id_post: this.props.PostID,
    }
    axios.post('http://127.0.0.1:8000/SocialMediaApi/v1/createcomment', params, headers)
      .then(
        res => {
          console.log(res.data);
        }).catch(err => console.error(err));

    if (body.value.replace(/\s/g, '').length) { this.props.addComment(body.value); }
  }
  render() {
    return (
      <form className="comment-form " onSubmit={this._handleSubmit}>
        <div class="media my-3">
          <img src={this.props.img} alt="user" style={{ width: "50px", borderRadius: "50%" }} />
          <div class="media-body">
            <div class="row d-flex">
            </div>
            <textarea className="form-control ml-1 shadow-none textarea" placeholder="Write your comment .." ref={textarea => (this._body = textarea)}></textarea>
          </div>

        </div>
        <div className="comment-form-actions text-right ">
          <button className="btn btn-info btn-sm shadow-none" type="submit">Post comment</button>
        </div>

      </form>
    );
  }


}
export default CommentForm