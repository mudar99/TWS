import { Component } from 'react';
import Footer from './Footer';
import './Main_style.css';
import Puplisher from '../Profile/Puplisher';
import SideNav from './SideNav';
import Social_Post from "../Profile/Social_Post";
import Nav from './Nav';
import Cards from './Cards';
import P_Suggestions from './P_Suggestions';
import FriendList from './FriendList';
import axios from "axios";
import Cookies from 'universal-cookie';

class Main_page extends Component {

    state = {
        user_info: [],
        MainPosts: [],
        checkload: false,
    }

    AD_Texts = {
        Text_1: "has as its primary task to provide detailed and accurate information about mobile phones and their features. While browsing GSMArena.com, you may come across links to online stores that sell phones and other electronics, but those are external entities and GSMArena.com is not affiliated with them. GSMArena.com DOES NOT sell phones or anything else and we do not endorse any particular store",
        Text_2: "It has paid out over $400,000,000 to members. There are countless members who have earned as much as $12,000 using Swagbucks. Swagbucks is even a safe way for teens to make a little pocket money",
        Text_3: "Online reviews of W3Schools are generally positive, with most users recommending it as a resource for beginners. In general, Sitejabber reviewers felt that W3Schools was a great free resource for beginners learning HTML, CSS, and JavaScript.",
        Text_4: "Stack Overflow is a question and answer site for professional and enthusiast programmers. It is a privately held website, the flagship site of the Stack Exchange Network, created in 2008 by Jeff Atwood and Joel Spolsky. It features questions and answers on a wide range of topics in computer programming.",
        Text_5: "A Computer Science portal for geeks. It contains well written, well thought and well explained computer science and programming articles, quizzes and more."
    }
    AD_titles = {
        Title_1: "GSMArena",
        Title_2: "Swagbucks",
        Title_3: "W3Scools",
        Title_4: "StackOverFlow",
        Title_5: "GeeksforGeeks",
    }
    AD_links = {
        Link_1: "https://www.gsmarena.com/",
        Link_2: "https://www.swagbucks.com/",
        Link_3: "https://www.w3schools.com/",
        Link_4: "https://stackoverflow.com/",
        Link_5: "https://www.geeksforgeeks.org/",
    }
    componentDidMount() {
        this.setState({
            checkload: false
        });
        const cookies = new Cookies();
        let headers = {
            headers: {
                socialmedia: cookies.get('socialmedia'),
                remember_token: cookies.get('remember_token'),
            }
        }
        let params = {
            myshow: [],
        }
        axios.all([
            axios.post('http://127.0.0.1:8000/SocialMediaApi/v1/me', "", headers),
            axios.post('http://127.0.0.1:8000/SocialMediaApi/v1/mainposts', params, headers),
        ]).then(
            res => {
                console.log(res);
                if (res[0].data['status'] == true) {
                    this.setState({ user_info: res[0].data.user, });
                    cookies.set('id', this.state.user_info['id'], { path: '/', domain: 'localhost', secure: true, httponly: true });
                    cookies.set('firstName', this.state.user_info['firstName'], { path: '/', domain: 'localhost', secure: true, httponly: true });
                    cookies.set('lastName', this.state.user_info['lastName'], { path: '/', domain: 'localhost', secure: true, httponly: true });
                    cookies.set('pictureWall', this.state.user_info['pictureWall'], { path: '/', domain: 'localhost', secure: true, httponly: true });
                    cookies.set('pictureProfile', this.state.user_info['pictureProfile'], { path: '/', domain: 'localhost', secure: true, httponly: true });
                } else {
                    window.location.href = "./StartUp"
                }
                if (res[1].data['status'] == true) {
                    this.setState({
                        MainPosts: res[1].data.mainposts,
                        checkload: true,
                    });
                }
            }).catch(err => console.error(err));

    }
    Loading = (size) => {
        return (
            <div className="container">
                <div className="spinner-grow text-primary m-1" style={{ width: size, height: size }} role="status">
                    <span className="sr-only">Loading...</span>
                </div>
                <div className="spinner-grow text-secondary m-1" style={{ width: size, height: size }} role="status">
                    <span className="sr-only">Loading...</span>
                </div>
                <div className="spinner-grow text-success m-1" style={{ width: size, height: size }} role="status">
                    <span className="sr-only">Loading...</span>
                </div>
                <div className="spinner-grow text-danger m-1" style={{ width: size, height: size }} role="status">
                    <span className="sr-only">Loading...</span>
                </div>
                <div className="spinner-grow text-warning m-1" style={{ width: size, height: size }} role="status">
                    <span className="sr-only">Loading...</span>
                </div>
                <div className="spinner-grow text-info m-1" style={{ width: size, height: size }} role="status">
                    <span className="sr-only">Loading...</span>
                </div>

                <div className="spinner-grow text-dark m-1" style={{ width: size, height: size }} role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        )
    }
    _getMainPosts() {
        return this.state.MainPosts.map(post => {
            return (
                <Social_Post
                    status={true}
                    text={post.contentText != null ? post.contentText : ""}
                    name={post.hide == 0 ? post.usermodel.firstName + " " + post.usermodel.lastName : " "}
                    time={post.created_at}
                    img={post.hide == 0 ? 'http://127.0.0.1/SocialMediaBackEnd/storage/app/public/' + post.usermodel.pictureProfile
                        : 'http://127.0.0.1/SocialMediaBackEnd/storage/app/public/Files/Virtual/profile.png'
                    }
                    post_photo={post.contentFile != null ? 'http://127.0.0.1/SocialMediaBackEnd/storage/app/public/' + post.contentFile : ""}
                    Check_id={post.id}
                    Check_Hide={post.hide}
                    Check_FG={post.privacy}
                    key={post.id}
                    Opinion={post.opinion}
                    LikesCount = {post.likesCount}
                    DislikeCount= {post.unlikesCount}
                />
            );
        });
    }
    GetMore = () => {
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
            myshow: this.state.MainPosts,
        }
        axios.post('http://127.0.0.1:8000/SocialMediaApi/v1/mainposts', params, headers).then(
            res => {
                console.log(res.data);
                if (res.data['status'] == true) {
                    this.setState({
                        MainPosts: res.data.mainposts,
                        checkload: true,
                    });
                }
            }).catch(err => console.error(err));
    }
    render() {
        const Posts = this._getMainPosts();
        return (
            <div>
                <Nav />
                <ul className=" Cards">
                    < P_Suggestions />
                    < li id="Q1">
                        <Cards
                            img="/Img/gsmarena.png"
                            text={this.AD_Texts.Text_1}
                            title={this.AD_titles.Title_1}
                            link={this.AD_links.Link_1} />
                    </ li>
                    < li id="Q2">
                        <Cards img="/Img/swagbucks.png"
                            text={this.AD_Texts.Text_2}
                            title={this.AD_titles.Title_2}
                            link={this.AD_links.Link_2} />
                    </ li>
                    < li id="Q3"><Cards img="/Img/w3schools.jpg"
                        text={this.AD_Texts.Text_3}
                        title={this.AD_titles.Title_3}
                        link={this.AD_links.Link_3} />
                    </ li>
                    < li id="Q4"><Cards img="/Img/stackoverflow.jpg"
                        text={this.AD_Texts.Text_4}
                        title={this.AD_titles.Title_4}
                        link={this.AD_links.Link_4} />
                    </ li>
                    < li id="Q5"><Cards img="/Img/GeeksforGeeks.png"
                        text={this.AD_Texts.Text_5}
                        title={this.AD_titles.Title_5}
                        link={this.AD_links.Link_5} />
                    </ li>
                </ul>
                <div className="container-fluid ">
                    <Puplisher />
                    {Posts}
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
                <SideNav />
                <Footer />
            </div>
        );
    }
}
export default Main_page;