import { Component } from "react";
import axios from "axios";
import Cookies from 'universal-cookie';

class FriendUser extends Component {
    deleteHandler = (event) => {
        const cookies = new Cookies();
        let headers = {
            headers: {
                socialmedia: cookies.get('socialmedia'),
                remember_token: cookies.get('remember_token'),
            }
        }
        let params = {
            id_user: this.props.ID,
        }

        axios.post('http://127.0.0.1:8000/SocialMediaApi/v1/managingfrind', params, headers)
            .then(
                res => {
                    console.log(res.data);
                    if (res.data['status'] == true) {
                        window.location.reload()
                    }
                }).catch(err => console.error(err));
    }
    render() {
        return (
            <div>
                <div className="Friend-list">
                    <div className="Friend-user">
                        <div className="row">
                            <div className="">
                                <img src={this.props.img} alt="user" className="ml-4 profile-photo" />
                            </div>
                            <div className="ml-4">
                                <h5><a href="#" className="profile-link">{this.props.name}</a></h5>
                                <p>{this.props.email}</p>
                            </div>
                            <div className=" col-md-12">
                                <button className=" btn-sm btn-danger pull-right" onClick={this.deleteHandler}>Delete</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default FriendUser
