import { Component } from "react"
import axios from "axios";
import Cookies from 'universal-cookie';


class Bio extends Component {

    state = {
        user_info: [],
        certificate: [],
        region: "",
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

        axios.all([
            axios.post('http://127.0.0.1:8000/SocialMediaApi/v1/mycertificate', "", headers),
            axios.post('http://127.0.0.1:8000/SocialMediaApi/v1/myregion', "", headers)
        ]).then(
            res => {
                console.log(res);
                if ((res[0].data['status'] == true) && (res[1].data['status'] == true)) {
                    this.setState({
                        certificate: res[0].data.certificate,
                        region: res[1].data.region.name,
                    });
                } else {
                    window.location.href = "./StartUp"
                }
            }).catch(err => console.error(err));

        axios.post('http://127.0.0.1:8000/SocialMediaApi/v1/me', "", headers)
            .then(
                res => {
                    console.log(res.data);
                    this.setState({ user_info: res.data.user });
                    if (res.data['status'] == true) {
                        this.setState({
                            user_info: res.data.user,
                        });
                        cookies.set('id', this.state.user_info['id'], { path: '/', domain: 'localhost', secure: true, httponly: true });
                        cookies.set('firstName', this.state.user_info['firstName'], { path: '/', domain: 'localhost', secure: true, httponly: true });
                        cookies.set('lastName', this.state.user_info['lastName'], { path: '/', domain: 'localhost', secure: true, httponly: true });
                        cookies.set('pictureWall', this.state.user_info['pictureWall'], { path: '/', domain: 'localhost', secure: true, httponly: true });
                        cookies.set('pictureProfile', this.state.user_info['pictureProfile'], { path: '/', domain: 'localhost', secure: true, httponly: true });
                        this.setState({
                            checkload: true,
                        });
                    } else {
                        window.location.href = "./StartUp"
                    }
                }).catch(err => console.error(err));
    }
    Email_info = () => {
        document.getElementById('tab_1').style.display = "none";
        document.getElementById('tab_2').style.display = "block";
        document.getElementById('tab_3').style.display = "none";
        document.getElementById('li_1').style.backgroundColor = "#dbe3e3";
        document.getElementById('li_2').style.backgroundColor = "cadetblue";
        document.getElementById('li_3').style.backgroundColor = "#dbe3e3";
    }
    More_info = () => {
        document.getElementById('tab_1').style.display = "none";
        document.getElementById('tab_2').style.display = "none";
        document.getElementById('tab_3').style.display = "block";
        document.getElementById('li_1').style.backgroundColor = "#dbe3e3";
        document.getElementById('li_2').style.backgroundColor = "#dbe3e3";
        document.getElementById('li_3').style.backgroundColor = "cadetblue";
    }
    About_info = () => {
        document.getElementById('tab_1').style.display = "block";
        document.getElementById('tab_2').style.display = "none";
        document.getElementById('tab_3').style.display = "none";
        document.getElementById('li_1').style.backgroundColor = "cadetblue";
        document.getElementById('li_2').style.backgroundColor = "#dbe3e3";
        document.getElementById('li_3').style.backgroundColor = "#dbe3e3";
    }
    render() {
        return (
            <div>
                
                <div className="container Bio mb-2 bg-light" >
                    
                    <div className="tabs ">
                        <ul className="text-center">
                            <li id="li_1" onClick={this.About_info} style={{ backgroundColor: "cadetblue" }}>About Me</li>
                            <li id="li_2" onClick={this.Email_info}>Certificates</li>
                            <li id="li_3" onClick={this.More_info}>More</li>
                        </ul>
                    </div>
                    <div className="text-center mb-3 p-5" hidden={this.state.checkload == true ? true : false}>
                    <div className="spinner-border" role="status">
                        <span className="sr-only" >Loading...</span>
                    </div>
                </div>
                    <div className="content p-2">
                        <div className="tab_content " id="tab_1" style={{ display: "block" }}>
                            {this.state.user_info['about']}
                        </div>
                        <div className="tab_content" id="tab_2">
                            <ul id="cert" className="list-group list-group-flush">
                                {this.state.certificate.map((certificateone) => {
                                    return (<li id="1_cer" className="list-group-item">{certificateone.name}</li>)
                                })
                                }
                            </ul>
                        </div>
                        <div className="tab_content" id="tab_3"hidden={this.state.checkload == false ? true : false}>
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item">
                                    Email : <span id="Email">{this.state.user_info['email']}</span>
                                </li>
                                <li className="list-group-item">
                                    Birthday : {" "}
                                    {this.state.user_info['birth']}
                                </li>
                                <li className="list-group-item">
                                    Work : <span id="Work">{this.state.user_info['work']}</span>
                                </li>
                                <li className="list-group-item">
                                    Country : <span id="Country">{this.state.region}</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default Bio