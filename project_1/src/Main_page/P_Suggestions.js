import { Component } from "react";
import Profile_Requests from "./Profile_Requests";
import axios from "axios";
import Cookies from 'universal-cookie';

class P_Suggestions extends Component {

  state = {
    P_Suggestions: [],
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
    axios.post('http://127.0.0.1:8000/SocialMediaApi/v1/suggestionfrinds', null, headers)
      .then(
        res => {
          console.log(res.data);
          if (res.data['status'] == true) {
            this.setState({
              P_Suggestions: res.data.suggestionfrinds,
              checkload: true,
            });
          }
        }).catch(err => console.error(err));
  }
  _getP_Suggestions() {
    return this.state.P_Suggestions.map(PS => {
      return (
        <Profile_Requests
          red="Visit"
          blue="Add Friend"
          _id={PS.id}
          img={'http://127.0.0.1/SocialMediaBackEnd/storage/app/public/' + PS.pictureProfile}
          name={PS.firstName + ' ' + PS.lastName} />
      );
    });
  }
  test = () => {
    let array = [];
    for (let i = 1; i < this._getP_Suggestions().length; i++) {
      array[i] =
        <div className="carousel-item" >
          {this._getP_Suggestions()[i]}
        </div>

    }
    return array
  }
  render() {
    const PS = this._getP_Suggestions();
    return (
      <div>
        <div className="P_Suggestions container bg-light">

          <div id="multi-item-PSuggestions" className="carousel slide carousel-multi-item" data-ride="carousel">
            <h3 className=" p-3">People you may know </h3>

            <div className="text-center carousel-inner">
              <div className="carousel-item active">
                {this._getP_Suggestions()[0]}
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
            <a className="btn-floating " href="#multi-item-PSuggestions" data-slide="prev" ><i className="btn fa fa-chevron-left"></i></a>
            <a className="btn-floating bg-white" href="#multi-item-PSuggestions" data-slide="next"><button className="btn fa fa-chevron-right float-right shadow-none"></button></a>
          </div>
        </div>
      </div>
    )
  }
}
export default P_Suggestions

/*
<Profile_Requests
    red = "Visit"
    blue = "Add Friend"
    img = "/Img/3.png"
    name = "Lilly Annice"/>
    </div>
    <div className="carousel-item">
    <Profile_Requests
    red = "Visit"
    blue = "Add Friend"
    img = "https://bootdey.com/img/Content/avatar/avatar8.png"
    name = "Nancy Cat"/>
    </div>
    <div className="carousel-item">
    < Profile_Requests
    red = "Visit"
    blue = "Add Friend"
    img = "https://bootdey.com/img/Content/avatar/avatar3.png"
    name = "Theresa Kris"/>
    </div>
    <div className="carousel-item">
    < Profile_Requests
    red = "Visit"
    blue = "Add Friend"
    img = "https://bootdey.com/img/Content/avatar/avatar2.png"
    name = "Coleman Mervin"/>
    </div>
     <div className="carousel-item">
     < Profile_Requests
     red = "Visit"
     blue = "Add Friend"
     img = "https://bootdey.com/img/Content/avatar/avatar1.png"
     name = "Kamden Kassy"/>
      */