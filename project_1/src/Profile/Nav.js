import { Component } from "react"
import FriendRequests from "../Main_page/FriendRequests";
import Notifications from "../Main_page/Notifications/Notifications";
import Edit from "./Edit";
import Edit_container from "./Edit_container";
import Cookies from 'universal-cookie';
import axios from "axios";



class Nav extends Component {

    logoutHandler = (e) => {
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
    render() {
        return (
            <div>
                <nav className=" navbar-nav text-center fixed-top p-2 bg-info">
                    <form className="container-fluid justify-content-start ">
                        <a href="/Main_Page" ><button type="button" id="nav_home" className=" btn btn-info ml-3 mr-3" data-toggle="tooltip" data-placement="bottom" title="Home"><i className="fa fa-home"></i></button></a>
                        <button type="button" id="nav_add" className=" btn btn-info ml-5 mr-5" data-toggle="modal" data-target=".bd-example-modal-lg1" ><i className="fa fa-user-plus"></i></button>
                        <button type="button" className="rounded btn btn-info " data-toggle="modal" data-target=".bd-example-modal-notifications"><i className="fa fa-bell"></i></button>
                        <option className="btn text-white dropdown-toggle float-right" type="button" data-toggle="dropdown" ></option>
                        <div className="drop_post dropdown-menu" >
                            <button className="dropdown-item btn btn-light text-dark" type="button" data-toggle="modal" data-target=".bd-example-modal-lg2"><i className="fa fa-edit"></i> Edit Info</button>
                            <button className="dropdown-item btn btn-light text-dark" type="button" data-toggle="modal" data-target=".bd-example-modal-lg3">Profile Mangement</button>
                            <button className="dropdown-item btn btn-light text-dark" type="button">About</button>
                            <button className="dropdown-item btn btn-light text-dark" type="button">Help</button>
                            <button className="dropdown-item text-dark btn btn-light" type="button" data-toggle="modal" data-target=".bd-example-modal-logout"><i className="fa fa-sign-out"></i> Log out</button>

                        </div>
                    </form>
                </nav>

                <div className="modal fade bd-example-modal-lg1">
                    <div className="modal-dialog modal-md">
                        <div className="modal-content">
                            <FriendRequests />
                        </div>
                    </div>
                </div>

                <div className="modal fade bd-example-modal-lg2">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <Edit_container />
                        </div>
                    </div>
                </div>

                <div className="modal fade bd-example-modal-lg3">
                    <div className="modal-dialog modal-md">
                        <div className="modal-content">
                            <Edit />
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
                                    <a className="row float-left btn btn-primary" onClick={this.logoutHandler}>Logout</a>
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