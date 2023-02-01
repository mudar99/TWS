import { Component } from "react";
import Sub_noti from "./Sub_noti";
import axios from "axios";
import Cookies from 'universal-cookie';


class Notifications extends Component {
    state = {
        Notifications: [],
        counter: 0,
        checkload: false,
    };

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
            num: this.state.counter + 1,
        }
        axios.post('http://127.0.0.1:8000/SocialMediaApi/v1/notifications', params, headers)
            .then(
                res => {
                    console.log(res.data);
                    if (res.data['status'] == true)
                        this.setState({
                            Notifications: res.data.notifications,
                            checkload: true,
                        });
                }).catch(err => console.error(err));
        this.setState({
            counter: params.num,
        })
    }
    // Get Comments
    _getNotifications() {
        return this.state.Notifications.map(noti => {
            return (
                <Sub_noti
                    name={noti.data.user_name}
                    body={noti.data.notification}
                    key={noti.id}
                    img={'http://127.0.0.1/SocialMediaBackEnd/storage/app/public/' + noti.data.pictureProfile} />
            );
        });
    }
    GetCount = () => {
        this.componentDidMount();
    }
    render() {
        const notifications = this._getNotifications();

        return (
            <div id="s" className="container-xl p-2" >
                <h3 className="p-4 bg-primary rounded">Notifications
                <button className=" float-right btn btn-outline-dark" data-dismiss="modal">X</button></h3>
                {notifications}
                <button className="btn btn-outline-primary float-right mb-2" hidden={this.state.checkload == true ? false : true} onClick={this.GetCount}>Load more</button>
                <div className="text-center mb-3 p-5" hidden={this.state.checkload == true ? true : false}>
                    <div className="spinner-border" role="status">
                        <span className="sr-only" >Loading...</span>
                    </div>
                </div>
            </div>
        )
    }
}
export default Notifications
