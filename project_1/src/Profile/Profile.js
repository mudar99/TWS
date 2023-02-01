import { Component } from 'react';
import Bio from './Bio';
import Footer from '../Main_page/Footer';
import Nav from './Nav';
import Photos_ID from './Photos_ID';
import './Profile_style.css';
import Social_Post from './Social_Post';
import Puplisher from './Puplisher';
import axios from "axios";
import Cookies from 'universal-cookie';



class Profile extends Component {

    state = {
        response: [],
        myposts: [],
        counter: 0,
        checkload: false,
    }

    componentDidMount() {   
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
            id_user: cookies.get('id')
        }
        axios.post('http://127.0.0.1:8000/SocialMediaApi/v1/posts', params, headers)
            .then(
                res => {
                    console.log(res.data);
                    if (res.data['status'] == true) {
                        this.setState({
                            myposts: res.data.posts,
                            checkload: true,
                            counter: this.state.counter + 1,
                        });
                    } else {
                        window.location.href = "./StartUp"
                    }
                }).catch(err => console.error(err));
    }
    // LikeHandler = () => {
    //     document.getElementById('like').classList.toggle("clicked_like");
    // }
    _getPosts() {
        const cookies = new Cookies();
        return this.state.myposts.map(post => {
            return (
                <Social_Post
                    text={post.contentText != null ? post.contentText : ""}
                    name={cookies.get('firstName') + " " + cookies.get('lastName')}
                    time={post.created_at}
                    img={cookies.get('pictureProfile') != null ? 'http://127.0.0.1/SocialMediaBackEnd/storage/app/public/' + cookies.get('pictureProfile') : 'http://127.0.0.1/SocialMediaBackEnd/storage/app/public/Files/UserImages/profile.png'}
                    post_photo={post.contentFile != null ? 'http://127.0.0.1/SocialMediaBackEnd/storage/app/public/' + post.contentFile : ""}
                    Check_Hide={post.hide}
                    Check_FG={post.privacy}
                    Check_id={post.id}
                    Opinion={post.opinion}
                    LikesCount = {post.likesCount}
                    DislikeCount= {post.unlikesCount}
                />
            );
        });
    }
    GetMore = () => {
        this.componentDidMount();
    }
    render() {

        return (
            <div>
                <Photos_ID />
                <Bio />
                <Puplisher />
                <Nav />
                <div className="container-lg">
                    {this._getPosts()}
                    <button id="Get-MPosts" className="btn btn-outline-info text-center" hidden={this.state.checkload == false ? true : false} onClick={this.GetMore}>
                        More <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-clockwise" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z" />
                            <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z" />
                        </svg> </button>
                </div>
                <div className="text-center mb-3 p-5" hidden={this.state.checkload == true ? true : false}>
                        <div className="spinner-border" role="status">
                            <span className="sr-only" >Loading...</span>
                        </div>
                    </div>
                <Footer />

            </div>
        );
    }
}
export default Profile;