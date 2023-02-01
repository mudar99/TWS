import { Component } from "react";
import axios from "axios";
import Cookies from 'universal-cookie';

class Reply extends Component {
    state = {
        Del: false,
        EditReply: false,
        editedReply: this.props.body,
        test: false,
    }
    DeleteReply = () => {
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
    }
    EditReply = () => {
        this.setState({
            EditReply: !this.state.EditReply,
        })
        if (this.state.EditReply === true) {
            const cookies = new Cookies();
            let headers = {
                headers: {
                    socialmedia: cookies.get('socialmedia'),
                    remember_token: cookies.get('remember_token'),
                }
            }
            let params = {
                id_comment: this.props.CommentID,
                contentText: this.state.editedReply,
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
    editedReplyHan = (e) => {
        this.setState({
            editedReply: e.target.value
        })
    }
    render() {
        return (
            <div>
                {this.state.Del !== true ?
                    <div className="Replies mb-2 p-2" style={{ backgroundColor: "#F0F8FF" }} >
                        <button type="button" onClick={this.DeleteReply} className=" btn float-right m-1 shadow-none" hidden={this.props.status ? false : true}><i className="fa fa-trash" aria-hidden="true"></i></button>
                        <button type="button" onClick={this.EditReply} className={`btn shadow-none float-right mt-1 `} hidden={this.props.editstate ? false : true}>{this.state.EditReply ? <i className="btn btn-sm "><i className="fa fa-save"></i></i> : <i className="fa fa-edit"></i>}</button>
                        <div class="media"> <span class="round"> <img src={this.props.img} alt="user" style={{ width: "40px", borderRadius: "50%" }} class="align-self-start mr-4" /> </span>
                            <div class="media-body">
                                <div class="row d-flex">
                                    <h6 class="user">{this.props.author} <small className="text-success">Replyed to {this.props.creator}</small> </h6>
                                </div>

                                <div className="shadow-none">{this.state.EditReply ? "" : this.state.test ? this.state.editedReply : this.props.body}
                                    {this.state.EditReply ? <textarea className="float-left w-100 p-1" onChange={this.editedReplyHan}>{this.props.body}</textarea> : ""}
                                </div>
                            </div>
                        </div>
                        {/* <button className="btn text-info mr-1 shadow-none"><i className="fa fa-thumbs-o-up"></i></button>
                <button className="btn text-danger mr-1 ml-1 shadow-none"><i className="fa fa-thumbs-o-down"></i></button> */}

                    </div>
                    : ""}
            </div>
        )
    }
}
export default Reply




// <div className="row p-2 " >

// <div className="col-md-2 ">
//     <img src={this.props.img} alt="user" style={{ width: "40px", borderRadius: "50%" }} />
// </div>

// <div className="col-md-10 ">
//     <big>{this.props.author} <small className="text-success">Replyed to Author</small></big>
//     <p className=" ml-1 shadow-none">{this.props.body}</p>
//     <button className="btn text-info mr-1 shadow-none"><i className="fa fa-thumbs-o-up"></i></button>
//     <button className="btn text-danger mr-1 ml-1 shadow-none"><i className="fa fa-thumbs-o-down"></i></button>
//     {/* <button onClick = {this.testhandler}>reply</button>
// {this.state.check ? <ReplyForm />:""} */}
// </div>

// </div>