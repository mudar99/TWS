import { Component } from "react"
import Social_Post from "./Social_Post";
import axios from "axios";
import Cookies from 'universal-cookie';

class Puplisher extends Component {

    some_objects = {
        warning:
            <div id="warning" className="mt-2 alert alert-danger" role="alert">
                Empty Info !!
        </div>
    }
    state = {
        clicked: false,
        puplish: false,
        Text: "",
        post_photo: "",
        profile_img: "",
        Posts: [],
        Anonymous: 0,
        Puplic: false,
        Friends: true,
        Status: "Frinds",
    };

    ImgHandler = (e) => {
        this.setState({
            post_photo: e.target.files[0],
        });
    }
    CommentHandler = () => {
        this.setState({
            Text: this._TEXT.value,
        })
    }
    _handleSubmit = (event) => {
        event.preventDefault();
        const post = {
            id: this.state.Posts.length + 1,
            text: this._TEXT.value,
            post_photo: this.state.post_photo,
            img: this.state.profile_img,
            name: this.state.name,
            time: this.state.time
        };
        this.setState({
            Text: this._TEXT.value,
        })
        this.setState({ Posts: this.state.Posts.concat([post]) });
        const cookies = new Cookies();
        let headers = {
            headers: {
                socialmedia: cookies.get('socialmedia'),
                remember_token: cookies.get('remember_token'),
            }
        }
        console.log(this.state.Status + " " + this.state.Anonymous)
        const data = new FormData();
        data.append('contentFile', this.state.post_photo);
        data.append('contentText', this.state.Text);
        data.append('privacy', this.state.Status);
        data.append('hide', this.state.Anonymous);

        axios.post('http://127.0.0.1:8000/SocialMediaApi/v1/createpost', data, headers).then(
            res => {
                console.log(res);
                if (res.data['status'] == true) {
                    window.location.reload();
                }
            }).catch(err => console.error(err));

    }
    // getPost = () => {
    //     return this.state.Posts.map(function (post) {
    //         return (
    //             <Social_Post
    //                 name="dasdas"
    //                 text={post.text}
    //                 post_photo={"/Img/" + post.post_photo}
    //                 key={post.id}
    //                 img="/Img/1.jpg"
    //                 time="22"
    //             />
    //         );
    //     });
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
    render() {

        return (
            <div>

                <form className="puplisher-form " onSubmit={this._handleSubmit} id="PuplishPost">
                    <div className="publisher mb-3 ">
                        <div className="card-header">
                            <div className="btn-group h-25 float-right">
                                <button type="button" className=" btn btn-secondary dropdown-toggle dropdown-toggle-split" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <big>Privacy </big>
                                </button>
                                <div className="dropdown-menu ">
                                    <a onClick={this.ClickedPuplic} className={`dropdown-item ${this.state.Puplic ? "bg-primary text-white" : ""}`} ><i className="fa fa-globe" > </i> Puplic</a>
                                    <a onClick={this.ClickedFriends} className={`dropdown-item ${this.state.Friends ? "bg-primary text-white" : ""}`} ><i className="fa fa-users" > </i> Friends</a>
                                    <a onClick={this.AnonyHandler} className={`dropdown-item ${this.state.Anonymous ? "bg-primary text-white" : ""}`}>Anonymous</a>

                                </div>
                            </div>
                            <ul className="nav nav-tabs card-header-tabs">

                                <li className="nav-item">
                                    <a className="nav-link active bg-info text-white" href="#">Make a publication</a>
                                </li>
                            </ul>
                        </div>
                        <div className="card-body bg-light">
                            <div className="tab-content">
                                <div className="tab-pane fade show active">
                                    <div className="form-group">
                                        <label className="sr-only" htmlFor="message">post</label>
                                        <textarea id="message" className="form-control text-dark bg-white" rows="3" placeholder="What do you want to puplish ?" ref={textarea => (this._TEXT = textarea)} onChange={this.CommentHandler}></textarea>
                                        <label className="form-label text-dark">Pick up an image</label> <br />
                                        <input id="pick-img" type="file" className="text-dark" onChange={this.ImgHandler} />
                                    </div>
                                </div>
                            </div>
                            <button id="share-btn" type="submit" className="btn-share btn btn-info" >share</button>

                            {this.state.clicked ? this.some_objects.warning : ''}

                        </div>

                    </div>

                    {/* {this.state.puplish ? <Social_Post 
        text = {this.state.Text}
        ID = "Unknown"
        time = "5"
        img = "/Img/1.jpg"
        post_photo = {"/Img/" + this.state.imgPath}
        /> : ""} */}

                </form>
            </div>
        );
    }

}
export default Puplisher