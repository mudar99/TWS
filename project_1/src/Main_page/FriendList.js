import { Component } from "react";
import FriendUser from "./FriendUser";
import axios from "axios";
import Cookies from 'universal-cookie';

class FriendList extends Component {
    state = {
        Friends: [],
        checkload: false,
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
        axios.post('http://127.0.0.1:8000/SocialMediaApi/v1/frinds', null, headers)
            .then(
                res => {
                    console.log(res.data);
                    if (res.data['status'] == true) {
                        this.setState({
                            Friends: res.data.frinds,
                            checkload: true,
                        });
                    }
                }).catch(err => console.error(err));
    }
    _getFriends() {
        return this.state.Friends.map(friend => {
            return (
                <FriendUser
                    name={friend.firstName + " " + friend.lastName}
                    email={friend.email}
                    ID={friend.id}
                    img={'http://127.0.0.1/SocialMediaBackEnd/storage/app/public/' + friend.pictureProfile} />
            );
        });
    }
    render() {
        const Friends = this._getFriends();
        return (
            <div>
                <div className="container mt-1">
                    <h4 className="p-2">Friends List
                        <button className="float-right btn btn-outline-dark" data-dismiss="modal">X</button>
                    </h4>
                    <div className="row ">
                        <div className="col-lg-12 ">
                            {Friends}

                            <div className="text-center mb-3 p-5" hidden={this.state.checkload == true ? true : false}>
                                <div className="spinner-border" role="status">
                                    <span className="sr-only" >Loading...</span>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

        )
    }
}
export default FriendList