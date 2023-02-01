import { Component } from "react"
import axios from "axios";
import Cookies from 'universal-cookie';

class SignupContainer extends Component {

  state = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    conf_pass: "",
    response: [],
    remember: [],
    user_info: [],
  }

  componentDidMount() {
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
          this.setState({ remember: res.data });
          cookies.remove('id');
          cookies.remove('firstName');
          cookies.remove('lastName');
          cookies.remove('pictureWall');
          cookies.remove('pictureProfile');
          if (res.data['status'] == true) {
            this.setState({ user_info: res.data.user });
            cookies.set('id', this.state.user_info['id'], { path: '/', domain: 'localhost', secure: true, httponly: true });
            cookies.set('firstName', this.state.user_info['firstName'], { path: '/', domain: 'localhost', secure: true, httponly: true });
            cookies.set('lastName', this.state.user_info['lastName'], { path: '/', domain: 'localhost', secure: true, httponly: true });
            cookies.set('pictureWall', this.state.user_info['pictureWall'], { path: '/', domain: 'localhost', secure: true, httponly: true });
            cookies.set('pictureProfile', this.state.user_info['pictureProfile'], { path: '/', domain: 'localhost', secure: true, httponly: true });
          }
        }).catch(err => console.error(err));
  }
  passHandler = e => {
    let pass_val = e.target.value;
    let pass_warning = document.getElementById("pass_warning");
    this.setState({
      password: pass_val,
    })
    for (let i = 1; i <= pass_val.length; i++) {

      if (pass_val.length < 8) {
        pass_warning.style.opacity = 1;
        pass_warning.innerHTML = "Password must contain 8 digits or more";

      }

      else {
        pass_warning.style.opacity = 0;
        pass_warning.style.overflow = "hidden";
      }
    }

  }
  emailHandler = e => {
    let email_val = e.target.value;
    let email_warning = document.getElementById("email_warning");
    this.setState({
      email: email_val,
    })
    for (let i = 1; i <= email_val.length; i++) {
      //if statement for (@)
      if (email_val.charAt(i) !== "@") {
        continue;
      }

      else {
        //loop for (.)
        for (let j = i; j <= email_val.length; j++) {
          if (email_val.charAt(j) !== ".") {
            continue;
          }
          else {
            email_warning.style.opacity = 0;
            email_warning.style.overflow = "hidden";
          }
          return

        }

      }

    }
    email_warning.style.opacity = 1;
    email_warning.innerHTML = "Invalid Email address";

  }
  fnameHandler = (e) => {

    let fname = e.target.value
    this.setState({
      firstName: fname,
    })
  }
  lnameHandler = (e) => {
    let lname = e.target.value
    this.setState({
      lastName: lname,
    })
  }
  confHandler = e => {
    let conf = e.target.value;
    this.setState({
      conf_pass: conf
    })
    if (conf !== this.state.password) {
      document.getElementById("conf_warning").style.opacity = 1;
      document.getElementById("conf_warning").innerHTML = "Password does not match";
    }
    else {

      document.getElementById("conf_warning").style.opacity = 0;
      document.getElementById("conf_warning").style.overflow = "hidden";
    }
  }
  loginHandler = (q) => {
    const cookies = new Cookies();
    axios.post('http://127.0.0.1:8000/SocialMediaApi/v1/register',
      {
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        email: this.state.email,
        password: this.state.password,
        password_confirmation: this.state.conf_pass
      }).then(
        res => {
          console.log(res.data);
          this.setState({ response: res.data });
          if (res.data['status'] == true) {
            cookies.set('remember_token', res.data.token, { path: '/', domain: 'localhost', secure: true, httponly: true });
          }
        }).catch(err => console.error(err));

    q.preventDefault(); // to prevent page refresh

  }
  HideHandler() {
    let in_cont = document.getElementById('Signin');
    let up_cont = document.getElementById('SignupContainer_css')
    up_cont.style.top = "-600px";
    in_cont.style.opacity = 1;
    document.getElementById("blur").style.filter = "none";
  }
  render() {
    return (
      <div>
        {this.state.remember['status'] == true ? window.location.href = "./Main_Page" : ""}
        <div className="container bg-light w-50">
          <div className="panel panel-default">
            <div className="panel-heading text-left pt-3">
              <button type="button" className="btn close" data-dismiss="modal" aria-label="Close" onClick={this.HideHandler}>
                <span aria-hidden="true">&times;</span>
              </button>
              <h4 >Please sign up for TogetherWeShare</h4>

            </div>
            <form className="p-2" onSubmit={this.loginHandler}>
              <input type="text" name="first_name" id="first_name" className="form-control input-sm mb-2" placeholder="First Name" onChange={this.fnameHandler} />
              <input type="text" name="last_name" id="last_name" className="form-control input-sm mb-2" placeholder="Last Name" onChange={this.lnameHandler} /><hr />
              <input type="email" name="email" id="email" className="form-control input-sm mb-2" placeholder="Email Address" onChange={this.emailHandler} />
              <small id="email_warning" className="form-text text-danger mb-2">.</small>
              <input type="password" name="password" id="password" className="form-control input-sm mb-2" placeholder="Password" onChange={this.passHandler} />
              <small id="pass_warning" className="form-text text-danger mb-2">.</small>
              <input type="password" name="password_confirmation" id="password_confirmation" className="form-control input-sm mb-2" placeholder="Confirm Password" onChange={this.confHandler} />
              <small id="conf_warning" className="form-text text-danger mb-2">.</small>
              {/* <small className="form-text text-info mb-2">Select your gender (optional) :</small>
              <select className="form-control form-control-sm mb-2">
                <option>Male</option>
                <option>Female</option>
              </select> */}
              <input id="login" type="submit" defaultValue="Register" className="btn btn-info btn-block mb-2" value="Sign Up" />
              {this.state.response['status'] == false ? <small className="text-danger">{this.state.response['msg']}</small> : ""}
              <small id="Warning" className="form-text text-info mb-2">.</small>
            </form>
          </div>
        </div>
        {this.state.response['status'] == true ? window.location.href = "./Main_Page" : ""}
      </div>
    );
  }
}
export default SignupContainer


