import { Component } from "react";
import Profile_Requests from "./Profile_Requests";
import axios from "axios";
import Cookies from 'universal-cookie';

class FriendRequests extends Component {
  state = {
    Profile_Requests: [],
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
    let params = {
      num: 1,
    }
    axios.post('http://127.0.0.1:8000/SocialMediaApi/v1/orderfrinds', params, headers)
      .then(
        res => {
          console.log(res.data);
          if (res.data['status'] == true) {
            this.setState({
              Profile_Requests: res.data.orderfrinds,
              checkload: true,
            });
          }
        }).catch(err => console.error(err));
  }
  _getProfile_Requests() {

    return this.state.Profile_Requests.map(PR => {
      return (
        <Profile_Requests
          red="Delete"
          blue="Accept"
          _idfriend={PR.id}
          img={'http://127.0.0.1/SocialMediaBackEnd/storage/app/public/' + PR.usermodel_id.pictureProfile}
          name={PR.usermodel_id.firstName + ' ' + PR.usermodel_id.lastName} />
      );
    });
  }
  test = () => {
    let array = [];
    for (let i = 1; i < this._getProfile_Requests().length; i++) {
      array[i] =
        <div className="carousel-item" >
          {this._getProfile_Requests()[i]}
        </div>

    }
    return array
  }
  render() {
    const PR = this._getProfile_Requests();
    return (
      <div>
        <div className="container my-4 ">

          <div id="multi-item-example" className="carousel slide carousel-multi-item" data-ride="carousel">
            <h3 className=" p-3">Friend Requests </h3>

            <div className="text-center carousel-inner">
              <div className=" carousel-item active">
                {this._getProfile_Requests()[0]}
              </div>
              {this.test()}
            </div>
          </div>
          <div className="text-center mb-3 p-5" hidden={this.state.checkload == true ? true : false}>
            <div className="spinner-border" role="status">
              <span className="sr-only" >Loading...</span>
            </div>
          </div>
          <div className="controls-top p-5" hidden={this.state.checkload == false ? true : false}>
            <a className="btn btn-outline-primary float-left " href="#multi-item-example" data-slide="prev"><i className="btn fa fa-chevron-left"></i></a>
            <a className="btn btn-outline-primary float-right" href="#multi-item-example" data-slide="next"><i className="btn fa fa-chevron-right float-right"></i></a>
          </div>
        </div>


      </div>
    )
  }
}
export default FriendRequests;