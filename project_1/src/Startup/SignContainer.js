import { Component } from "react";
import axios from "axios";
import Nav from "./Nav";
import Forgot from './Forgot';
import Cookies from 'universal-cookie';

class SignConteiner extends Component {

  state = {
    password: "",
    email: "",
    isRemember: false,
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
    let pass_warning = document.getElementById("F_pass_warning");
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
  RememberHandler = () => {
    this.setState(prevState => ({
      isRemember: !prevState.isRemember
    }));
  }
  emailHandler = e => {
    let email_val = e.target.value;
    let email_warning = document.getElementById("F_email_warning");
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


  }
  loginHandler = (q) => {
    const cookies = new Cookies();
    let params = {
      email: this.state.email,
      password: this.state.password,
    }
    axios.post('http://127.0.0.1:8000/SocialMediaApi/v1/login', params).then(
      res => {
        console.log(res.data);
        this.setState({ response: res.data });
        if (res.data['status'] == true) {
          if (this.state.isRemember == true) {
            cookies.set('socialmedia', res.data.token, { path: '/', expires: new Date(Date.now() + (1000 * 3600 * 24 * 365)), domain: 'localhost', secure: true, httponly: true });
          } else {
            cookies.set('remember_token', res.data.token, { path: '/', domain: 'localhost', secure: true, httponly: true });
          }
        }
      }).catch(err => console.error(err));
    q.preventDefault(); // to prevent refresh


  }
  showSignup = () => {
    let in_cont = document.getElementById('Signin');
    let up_cont = document.getElementById('SignupContainer_css')
    in_cont.style.opacity = 0;
    up_cont.style.opacity = 1;
    up_cont.style.width = "100%";
    up_cont.style.top = "100px";
    document.getElementById("blur").style.filter = "blur(5px)";

  }
  render() {
    return (
      <div>
        {this.state.remember['status'] == true ? window.location.href = "./Main_Page" : ""}
        {/*------------- Image ------------- */}
        <Nav />
        <div id="blur" className="Cover_Photo">

          {/* ------------- Sign in container ------------- */}
          <div id="Signin" className="Sign_container container card">
            <article className="card-body">
              <a href="#" className="float-right btn btn-outline-primary" onClick={this.showSignup}>Sign up</a>
              <h4 className="card-title mb-4 mt-1">Sign in</h4>
              <form className="form_p" onSubmit={this.loginHandler}>
                <div className="form-group">
                  <label>Your email</label>
                  <input className="form-control" placeholder="Email" type="email" onChange={this.emailHandler} />
                  <p id="F_email_warning" style={{ opacity: 0 }}>.</p>
                </div>
                <div className="form-group">
                <a className="float-right" data-toggle="modal" data-target=".bd-example-modal-forgot" style={{ textDecoration: "none", cursor: "pointer" }}>Forgot?</a>
                  <label>Your password</label>
                  <input className="form-control mb-1" placeholder="******" type="password" onChange={this.passHandler} />
                  <p id="F_pass_warning" style={{ opacity: 0, color: "red", fontSize: "12px" }}>.</p>
                </div>
                <div className="form-group">
                  <div className="checkbox">
                    <label> <input type="checkbox" onClick={this.RememberHandler} /> Save password </label>
                  </div>
                </div>
                <div className="form-group">
                  <button type="submit" className="btn btn-primary btn-block"> Login  </button>
                  <p id="F_Warning" style={{ opacity: 0, color: "red", fontSize: "12px" }}>.</p>
                </div>
                {this.state.response['status'] == false ? <div className="text-danger">{this.state.response['msg']}</div> : ""}
              </form>
            </article>
          </div>
          {this.state.response['status'] == true ? window.location.href = "./Main_Page" : ""}
        </div>
<Forgot/>
      </div>
    );
  }
}
export default SignConteiner