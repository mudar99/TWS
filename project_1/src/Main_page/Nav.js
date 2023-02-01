import { Component } from "react"
import FriendList from "./FriendList";
import FriendRequests from "./FriendRequests";
import Notifications from "./Notifications/Notifications";
import Cookies from 'universal-cookie';
import axios from "axios";




class Nav extends Component {

    state = {
        isToggleOn: false,
    };
    testlogoutHandler = (e) => {
        const cookies = new Cookies();
        let headers = {
            headers: {
                socialmedia: cookies.get('socialmedia'),
                remember_token: cookies.get('remember_token'),
            }
        }
        axios.post('http://127.0.0.1:8000/SocialMediaApi/v1/logout', "", headers)
            .then(
                res => {
                    console.log(res.data);
                    if (res.data['status'] == true) {
                        cookies.remove('id');
                        cookies.remove('firstName');
                        cookies.remove('lastName');
                        cookies.remove('pictureWall');
                        cookies.remove('pictureProfile');
                        cookies.remove('remember_token');
                        cookies.remove('socialmedia');
                        window.location.replace("/Startup")
                    }
                }).catch(err => console.error(err));
    }
    SideHandler = () => {
        this.setState(prevState => ({
            isToggleOn: !prevState.isToggleOn
        }));
        { this.state.isToggleOn ? (document.getElementById("NV").style.width = "22%") : (document.getElementById("NV").style.width = "0%") }
    }
    render() {
        return (
            <div>
                <nav className="nav_color navbar-nav text-center fixed-top p-2">
                    <form className="nav_item container-fluid justify-content-start ">

                        <a href="/Profile" ><button type="button" className="rounded btn btn-info" data-toggle="tooltip" data-placement="bottom" title="Profile"><i className="fa fa-user"></i></button></a>
                        <button type="button" className="rounded btn btn-info " data-toggle="modal" data-target=".bd-example-modal-lg" ><i className="fa fa-user-plus"></i></button>
                        <button type="button" className="rounded btn btn-info " data-toggle="modal" data-target=".bd-example-modal-notifications"><i className="fa fa-bell"></i></button>
                        <button type="button" className="rounded btn btn-info " data-toggle="modal" data-target=".bd-example-modal-friends"><i className="fa fa-users"></i></button>
                        <button type="button" id="nav_align" className="rounded btn btn-info ml-3 float-right" onClick={this.SideHandler}><i className="fa fa-align-right"></i></button>

                        <option className="btn text-white dropdown-toggle float-right" type="button" data-toggle="dropdown"></option>
                        <div className="drop_post dropdown-menu" >
                            <button className="dropdown-item m-0" type="button" data-toggle="modal" data-target=".bd-example-modal-logout"><i className="fa fa-sign-out"></i> Log out</button>                            <button className="dropdown-item btn btn-light text-dark m-0" type="button">About</button>
                            <button className="dropdown-item btn btn-light text-dark m-0" type="button">Help</button>
                        </div>

                    </form>

                </nav>
                {/* Friends Requests*/}
                <div className="modal fade bd-example-modal-lg" aria-labelledby="myLargeModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-md">
                        <div className="modal-content">
                            <FriendRequests />
                        </div>
                    </div>
                </div>


                {/* Friends List*/}
                <div className=" p-0 modal fade bd-example-modal-friends" >
                    <div className="modal-dialog modal-md">
                        <div className="modal-content">
                            <FriendList />
                        </div>
                    </div>
                </div>

                {/* Notifications*/}
                <div className=" p-0 modal fade bd-example-modal-notifications " >
                    <div className="modal-dialog modal-md ">
                        <div className="modal-content ">
                            <Notifications />
                        </div>
                    </div>
                </div>

                <div className="modal fade bd-example-modal-logout" >
                    <div className="modal-dialog modal-md">
                        <div className="modal-content ">
                            <div className="container card">
                                <div className="card-body" >
                                    <h5 className="row card-title pb-5">Are you sure you want to logout ? </h5>
                                    <a className="row float-left btn btn-primary" onClick={this.testlogoutHandler}>Logout</a>
                                    <button className="row float-right btn btn-danger" data-dismiss="modal">Cancel</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>



        );
    }
}
export default Nav