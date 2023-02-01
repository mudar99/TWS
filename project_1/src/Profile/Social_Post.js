import { Component } from "react"
import React from 'react';
import Comments from "./Comments/Comments";
import axios from "axios";
import Cookies from 'universal-cookie';

class Social_Post extends Component {

    state = {
        PostText: this.props.text,
        isCommentOn: false,
        isEditOn: false,
        isImgEdited: false,
        isLikeOn: false,
        DisLike: false,
        SaveDone: false,
        Puplic: false,
        Friends: false,

        imgPath: "",
        newText: this.props.text,
        Anonymous: this.props.Check_Hide,
        Status: this.props.Check_FG,
    };
    componentDidMount() {
        if (this.props.Opinion == "Like") {
            this.setState({
                isLikeOn: true
            })
        }
        if (this.props.Opinion == "Unlike") {
            this.setState({
                DisLike: true
            })
        }
        if (this.state.Status === "Frinds") {
            this.setState({
                Friends: true
            })
        }
        else if (this.state.Status === "General") {
            this.setState({
                Puplic: true
            })
        }
    }
    LikeHandler = (e) => {
        e.preventDefault();
        this.setState(prevState => ({
            isLikeOn: !prevState.isLikeOn,
            DisLike: false,
        }));
        const cookies = new Cookies();
        let headers = {
            headers: {
                socialmedia: cookies.get('socialmedia'),
                remember_token: cookies.get('remember_token'),
            }
        }
        let params = {
            id_post: this.props.Check_id,
            opinion: "Like"
        }
        axios.post('http://127.0.0.1:8000/SocialMediaApi/v1/createlike', params, headers)
            .then(
                res => {
                    console.log(res.data);
                }).catch(err => console.error(err));
    }
    DisLikeHandler = (e) => {
        this.setState(prevState => ({
            DisLike: !prevState.DisLike,
            isLikeOn: false
        }));
        const cookies = new Cookies();
        let headers = {
            headers: {
                socialmedia: cookies.get('socialmedia'),
                remember_token: cookies.get('remember_token'),
            }
        }
        let params = {
            id_post: this.props.Check_id,
            opinion: "Unlike"
        }
        axios.post('http://127.0.0.1:8000/SocialMediaApi/v1/createlike', params, headers)
            .then(
                res => {
                    console.log(res.data);
                }).catch(err => console.error(err));
    }
    CommentHandler = (e) => {
        this.setState(prevState => ({
            isCommentOn: !prevState.isCommentOn
        }));
    }
    CommentValue = (e) => {
        this.setState({
            Comment: e.target.value
        })
    }
    EditHandler = () => {
        this.setState(prevState => ({
            isEditOn: !prevState.isEditOn
        }));
    }
    textarea_edit = (e) => {
        this.setState({
            newText: e.target.value,
        })

    }
    EditImg = (e) => {
        this.setState({
            imgPath: e.target.files[0],
        });

    }
    saveEdit = (e) => {
        e.preventDefault();
        this.setState(prevState => ({
            isEditOn: false,
            //PostText: this.state.newText,
            SaveDone: !prevState.SaveDone,
        }))
        const cookies = new Cookies();
        let headers = {
            headers: {
                socialmedia: cookies.get('socialmedia'),
                remember_token: cookies.get('remember_token'),
            }
        }

        const data = new FormData();
        data.append('id_post', this.props.Check_id);
        if (this.state.imgPath != "")
            data.append('contentFile', this.state.imgPath);
        data.append('contentText', this.state.newText);
        data.append('privacy', this.state.Status);
        data.append('hide', this.state.Anonymous);

        axios.post('http://127.0.0.1:8000/SocialMediaApi/v1/editpost', data, headers)
            .then(
                res => {
                    console.log(res.data);
                    if (res.data['status'] == true) {
                        window.location.reload();
                    }
                }).catch(err => console.error(err));
    }
    cancelEdit = () => {
        this.setState({
            isEditOn: false,
        })
    }
    // AnonyHandler = () => {
    //     this.setState(prevState => ({
    //         Anonymous: !prevState.Anonymous
    //     }));

    // }
    // ClickedPuplic = () => {
    //     this.setState(prevState => ({
    //         Puplic: !prevState.Puplic,
    //         Friends: false,
    //     }));
    // }
    // ClickedFriends = () => {
    //     this.setState(prevState => ({
    //         Friends: !prevState.Friends,
    //         Puplic: false,
    //     }));
    // }
    AnonyHandler = () => {

        if (this.state.Anonymous == 0) {
            this.setState({
                Anonymous: 1
            });
        } else {
            this.setState({
                Anonymous: 0
            });
        }

    }
    ClickedPuplic = () => {
        this.setState(prevState => ({
            Puplic: !prevState.Puplic,
            Friends: false,
            Status: "General"
        }));
    }
    ClickedFriends = () => {
        this.setState(prevState => ({
            Friends: !prevState.Friends,
            Puplic: false,
            Status: "Frinds",
        }));
    }
    DeletePost = () => {
        const cookies = new Cookies();
        let headers = {
            headers: {
                socialmedia: cookies.get('socialmedia'),
                remember_token: cookies.get('remember_token'),
            }
        }
        console.log(this.props.Check_id);
        let params = {
            id_post: this.props.Check_id,
        }
        axios.post('http://127.0.0.1:8000/SocialMediaApi/v1/deletepost', params, headers)
            .then(
                res => {
                    console.log(res.data);
                    if (res.data['status'] == true) {
                        window.location.reload();
                    }
                }).catch(err => console.error(err));
    }
    DelImage = () => {
        const cookies = new Cookies();
        let headers = {
            headers: {
                socialmedia: cookies.get('socialmedia'),
                remember_token: cookies.get('remember_token'),
            }
        }
        let params = {
            id_post: this.props.Check_id
        }

        axios.post('http://127.0.0.1:8000/SocialMediaApi/v1/deletefile', params, headers)
            .then(
                res => {
                    console.log(res.data);
                }).catch(err => console.error(err));
    }
    render() {
        return (

            <div className={`social_post container-fluid p-0 mb-3  `} >

                <div className="post rounded bg-light ">

                    <div className="container post-header ">
                        <div className="col-xs img_header p-1">
                            <img src={this.props.img} />
                        </div>

                        <div className="ID_header text-dark w-100 text-center pl-3 pt-3">
                            <h5 className="float-left text-info">{this.props.name}</h5>
                            <label className="row col-sm "><small className="fa fa-clock-o" style={{ fontSize: "17px" }}> {this.props.time}</small></label>
                        </div>


                        <div className="btn-group h-25 m-2">
                            <button type="button" onClick={this.EditHandler} hidden = {this.props.status} className="btn btn-secondary" data-toggle="modal" data-target="#Edit_Modal" >Edit</button>
                            <button type="button" onClick={this.DeletePost} hidden = {this.props.status} className="btn btn-danger btn-sm float-right " ><i className="fa fa-trash" aria-hidden="true"></i></button>
                            <button type="button" className=" btn btn-secondary dropdown-toggle dropdown-toggle-split" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <big>Privacy </big>
                            </button>
                            <div className="dropdown-menu  ">
                                <ul>
                                    <li onClick={this.ClickedPuplic} className={`dropdown-item disabled ${this.state.Puplic || this.props.Check_FG == "General" ? "bg-primary text-white" : ""}`} ><i className="fa fa-globe" > </i> Puplic</li>
                                    <li onClick={this.ClickedFriends} className={`dropdown-item disabled ${this.state.Friends || this.props.Check_FG == "Frinds" ? "bg-primary text-white" : ""}`} ><i className="fa fa-users" > </i> Friends</li>
                                    <li onClick={this.AnonyHandler} className={`dropdown-item disabled ${this.state.Anonymous || this.props.Check_Hide == 1 ? "bg-primary text-white" : ""}`}>Anonymous</li>
                                </ul>

                            </div>
                        </div>
                    </div>


                    <div className="post-body container">
                        <p id="post-text" className="post-text p-3 mt-2">
                            {this.state.PostText}
                        </p>

                    </div>

                    <div className="post-media text-center">
                        <img id="social-post-image" className="social-post-image container pb-3" src={this.props.post_photo} />

                    </div>

                    <div className="post-footer container text-center p-2 pb-4">

                        <button onClick={this.LikeHandler} id="like" type="button" className={`btn btn-outline-info btn-sm mr-2 ${this.state.isLikeOn ? "bg-info text-white" : ""}`}>
                            <i className="fa fa-thumbs-o-up "> {this.props.LikesCount}</i> Like
                        </button>

                        <button onClick={this.CommentHandler} id="comment" type="button" className={`btn btn-outline-info btn-sm mr-2 ml-2 ${this.state.isCommentOn ? "bg-info text-white" : ""}`}>
                            <i className="fa fa-comment-o"></i> Comment
                        </button>

                        <button onClick={this.DisLikeHandler} id="share" type="button" className={`btn btn-outline-danger btn-sm mr-2 ml-2 ${this.state.DisLike ? "bg-danger text-white" : ""}`}>
                            <i className="fa fa-thumbs-o-down"> {this.props.DislikeCount}</i> Dislike
                        </button>

                        <div className={this.state.isCommentOn ? "" : "d-none"}>
                            <Comments img={this.props.img} PostID={this.props.Check_id} />
                        </div>

                    </div>

                </div>


                {this.state.isEditOn ?

                    <div id="Edit_Modal" className="modal fade bd-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true" data-backdrop="static">
                        <div className="modal-dialog modal-lg">
                            <div className="modal-content">

                                <div >

                                    {/* //////////////////////////////////////////////// */}
                                    <div className="rounded bg-light">

                                        <div className="container post-header ">
                                            <div className="col-xs img_header w-25 h-100 p-1">
                                                <img src={this.props.img} />
                                            </div>

                                            <div className="ID_header text-dark w-100 text-center pl-3 pt-3">
                                                <h3 className="float-left text-info">{this.props.name}</h3>
                                                <label className="row col-sm "><small className="fa fa-clock-o" style={{ fontSize: "17px" }}> {this.props.time} <big>Hours</big></small></label>
                                            </div>


                                            <div className="btn-group h-25 m-2">
                                                <button type="button" className=" btn btn-secondary dropdown-toggle dropdown-toggle-split" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                    <big>Privacy </big>
                                                </button>
                                                <div className="dropdown-menu Privacy">
                                                    <a onClick={this.ClickedPuplic} className={`dropdown-item ${this.state.Puplic ? "bg-primary text-white" : ""}`} ><i className="fa fa-globe" > </i> Puplic</a>
                                                    <a onClick={this.ClickedFriends} className={`dropdown-item ${this.state.Friends ? "bg-primary text-white" : ""}`} ><i className="fa fa-users" > </i> Friends</a>
                                                    <a onClick={this.AnonyHandler} className={`dropdown-item ${this.state.Anonymous ? "bg-primary text-white" : ""}`}>Anonymous</a>
                                                </div>
                                            </div>
                                        </div>


                                        <div className="post-body container">

                                            {/* for Edit post text */}
                                            <div id="x-post-text" className="form-group">
                                                <label className="bg-info text-dark w-100 p-2 mt-2" style={{ fontSize: "20px" }}>Editing Your Text :</label>
                                                <textarea onChange={this.textarea_edit} id="textarea_edit" className="form-control p-3 mt-2 w-100" defaultValue={this.state.PostText}>
                                                </textarea>

                                            </div>

                                            <label id="edit-post-media" className=" p-3 m-1">
                                                Edit Img :
                                                </label>
                                            <input onChange={this.EditImg} id="EditImg" className="bg-primary ml-2 " type="file" />
                                            <button className="btn btn-outline-danger float-right m-3" hidden={this.props.post_photo == "" ? true : false} onClick={this.DelImage}><i className="fa fa-trash" aria-hidden="true"> Img</i></button>


                                        </div>

                                        {/* <div className="post-media text-center">

                                            <img id="edited-image" className="social-post-image container pb-3" src={this.props.post_photo} />

                                        </div> */}

                                        <div className="post-footer container text-center p-2 pb-4">

                                            <div className="container">


                                                <div className="row">
                                                    <button onClick={this.saveEdit} id="save" type="button" className="col-md-2 btn btn-outline-primary btn-sm " data-dismiss="modal">
                                                        <i className="fa fa-save"></i> Save
                                                    </button>
                                                    <p className="col-md-8"></p>
                                                    <button type="button" className="col-md-2 btn btn-outline-danger btn-sm " onClick={this.cancelEdit} data-dismiss="modal">Cancel</button>


                                                </div>
                                            </div>

                                        </div>

                                    </div>


                                    {/* //////////////////////////////////////////////// */}

                                </div>
                            </div>
                        </div>
                    </div>
                    : ""}

            </div>


        );
    }

}

export default Social_Post