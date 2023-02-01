import { Component } from "react";
import axios from "axios";
import Cookies from 'universal-cookie';

class Edit extends Component {
  state = {
    fname: "",
    lname: "",
    lastpass: "",
    newpass: "",
    confirmpass: "",
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
    axios.post('http://127.0.0.1:8000/SocialMediaApi/v1/me', "", headers)
      .then(
        res => {
          console.log(res.data);
          if (res.data['status'] == true) {
            cookies.set('id', res.data.user['id'], { path: '/', domain: 'localhost', secure: true, httponly: true });
            cookies.set('firstName', res.data.user['firstName'], { path: '/', domain: 'localhost', secure: true, httponly: true });
            cookies.set('lastName', res.data.user['lastName'], { path: '/', domain: 'localhost', secure: true, httponly: true });
            cookies.set('pictureWall', res.data.user['pictureWall'], { path: '/', domain: 'localhost', secure: true, httponly: true });
            cookies.set('pictureProfile', res.data.user['pictureProfile'], { path: '/', domain: 'localhost', secure: true, httponly: true });
            this.setState({
              checkload: true,
              fname: cookies.get('firstName'),
              lname: cookies.get('lastName')
            })
          }
        }).catch(err => console.error(err));
  }
  fnameHandler = (e) => {
    let f = e.target.value;
    this.setState({
      fname: f
    })
  }
  lnameHandler = (e) => {
    let l = e.target.value;
    this.setState({
      lname: l
    })
  }
  lastpass = (e) => {
    let pass = e.target.value;
    this.setState({
      lastpass: pass
    })
  }
  newpass = (e) => {
    let newp = e.target.value;
    this.setState({
      newpass: newp
    })
  }
  confPass = (e) => {
    let conf = e.target.value;
    this.setState({
      confirmpass: conf
    })
  }
  ConfirmHandler = (e) => {
    const cookies = new Cookies();
    const data = new FormData();
    
    data.append('firstName', this.state.fname);
    data.append('lastName', this.state.lname);

    if (this.state.lastpass != "" || this.state.newpass != "" || this.state.confirmpass != "") {
      data.append('password', this.state.newpass);
      data.append('currentPassword', this.state.lastpass);
      data.append('password_confirmation', this.state.confirmpass);
    }

    let headers = {
      headers: {
        socialmedia: cookies.get('socialmedia'),
        remember_token: cookies.get('remember_token'),
      }
    }
    axios.post('http://127.0.0.1:8000/SocialMediaApi/v1/edit', data, headers)
      .then(
        res => {
          console.log(res.data);
          if (res.data['status'] == true) {
            window.location.reload();
          }
        }).catch(err => console.error(err));
  }
  render() {
    const cookies = new Cookies();
    return (
      <div>
        <div className="text-center mb-3 p-5" hidden={this.state.checkload == true ? true : false}>
          <div className="spinner-border" role="status">
            <span className="sr-only" >Loading...</span>
          </div>
        </div>
        <form className=" bg-light p-5" hidden={this.state.checkload == false ? true : false}>
          <label className="form-control bg-info text-white">
            Manage and edit your account :
            </label>
          <div className="p-3 container">
            <label className="form-control bg-dark text-white">Edit your name :</label>
            <div className="input-group mb-3">
              <input type="text" className="form-control" placeholder="First name" onChange={this.fnameHandler} defaultValue={this.state.fname} />
            </div>

            <div className="input-group mb-3">
              <input type="text" className="form-control" placeholder="Last name" onChange={this.lnameHandler} defaultValue={this.state.lname} />
            </div>

            <label className="form-control bg-dark text-white">Edit your Password :</label>

            <div className="input-group mb-3">
              <input type="password" className="form-control" placeholder="Enter your last password" onChange={this.lastpass} />
            </div>
            <hr />
            <div className="input-group mb-3">
              <input type="password" className="form-control" placeholder="Enter your new password" onChange={this.newpass} />
            </div>

            <div className="input-group mb-3">
              <input type="password" className="form-control" placeholder="Confirm your new password" onChange={this.confPass} />
            </div>

            <label>
              <button className="btn btn-info float-left " onClick={this.ConfirmHandler} data-dismiss="modal">Save</button>
            </label>
            <button type="button" className="btn btn-danger float-right " data-dismiss="modal" >Cancel</button>

          </div>


        </form>ِ

      </div>
    )
  }
}
export default Edit