import { Component } from "react";
import axios from "axios";
import Cookies from 'universal-cookie';

class Profile_Requests extends Component {
    state = {
        isAcceptable: false,
        isDeleted: false,
        AddFriend: false,
        Visit: false,
    }
    acceptHandler = (e) => {
        const cookies = new Cookies();
        let headers = {
            headers: {
                socialmedia: cookies.get('socialmedia'),
                remember_token: cookies.get('remember_token'),
            }
        }
        if (this.props.blue === "Accept") {
            let params = {
                id_frind: this.props._idfriend,
            }

            axios.post('http://127.0.0.1:8000/SocialMediaApi/v1/acceptorderfrind', params, headers)
                .then(
                    res => {
                        console.log(res.data);
                    }).catch(err => console.error(err));

            this.setState(prevState => ({
                isAcceptable: !prevState.isAcceptable
            }));

            e.target.innerHTML = `<i className="fa fa-check"></i> Confirmed`
            e.target.disabled = "true"
        }
        if (this.props.blue === "Add Friend") {
            let params = {
                id_user: this.props._id,
            }

            axios.post('http://127.0.0.1:8000/SocialMediaApi/v1/managingfrind', params, headers)
                .then(
                    res => {
                        console.log(res.data);
                    }).catch(err => console.error(err));
            this.setState(prevState => ({
                AddFriend: !prevState.AddFriend
            }));
        }
    }
    deleteHandler = (e) => {
        const cookies = new Cookies();
        let headers = {
            headers: {
                socialmedia: cookies.get('socialmedia'),
                remember_token: cookies.get('remember_token'),
            }
        }
        if (this.props.red === "Delete") {
            let params = {
                id_frind: this.props._idfriend,
            }

            axios.post('http://127.0.0.1:8000/SocialMediaApi/v1/deleteorderfrind', params, headers)
                .then(
                    res => {
                        console.log(res.data);
                    }).catch(err => console.error(err));
            this.setState(prevState => ({
                isDeleted: !prevState.isDeleted
            }));
        }
        if (this.props.red === "Visit") {
            this.setState(prevState => ({
                Visit: !prevState.Visit
            }));
        }

    }
    render() {
        return (
            <div>
                <div className="bg-white p-3 rounded mt-5 request_card">
                    <img src={this.props.img} />
                    <div className="card-body">
                        <h5 className="card-title">{this.props.name}</h5>
                        <button className="btn btn-primary btn-sm mr-1" onClick={this.acceptHandler}>{this.state.AddFriend ? "Request Sent" : this.props.blue}</button>                        <button className="btn btn-danger btn-sm  ml-1" onClick={this.deleteHandler}>{this.props.red}</button>
                    </div>
                </div>

            </div>
        )
    }
}
export default Profile_Requests;