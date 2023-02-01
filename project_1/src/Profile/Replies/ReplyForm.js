import { Component } from "react";
import axios from "axios";
import Cookies from 'universal-cookie';

class ReplyForm extends Component{
    _replyHandler = (event) => {
        event.preventDefault();
    
        let body = this._body;
        const cookies = new Cookies();
        let headers = {
          headers: {
            socialmedia: cookies.get('socialmedia'),
            remember_token: cookies.get('remember_token'),
          }
        }
        let params = {
          contentText: body.value,
          id_comment:this.props.CommentID,
          id_post: this.props.PostID,
        }
        axios.post('http://127.0.0.1:8000/SocialMediaApi/v1/createcomment', params, headers)
          .then(
            res => {
              console.log(res.data);
            }).catch(err => console.error(err));        
        if(body.value.replace(/\s/g, '').length)
        {this.props.addReply(body.value);}
      }
    render() {
        return (
           
         <form className="reply-form " onSubmit={this._replyHandler} >
         <div className="input-group " >
             <input type="text" className="form-control" placeholder = "Reply .." ref={input => (this._body = input)} style = {{backgroundColor : "#F0F8FF"}}></input>
          <button className="btn btn-success btn-sm shadow-none" type="submit" >Reply</button>
       </div>
     </form>
     
        )
    }
    
}
export default ReplyForm