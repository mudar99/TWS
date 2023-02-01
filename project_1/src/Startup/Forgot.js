import { Component } from "react";
import axios from "axios";

class Forgot extends Component {
    state = {
        Email: "",
        Code: "",
        Verfication : "",
        pass : "",
        confpass : "",
        Done: false,
        emailCheck : false,
        codeCheck : false,
        emailMessage : "",
        codeMessage : "",
        passMessage : "",
        passcheck : false,
    }
    CodeHandler = (e) => {
        e.preventDefault();
        this.setState({
            Code: e.target.value
        })
    }
    EmailHandler = e => {
        let email_val = e.target.value;
        for (let i = 1; i <= email_val.length; i++) {
            //if statement for (@)
            if (email_val.charAt(i) !== "@") {
                this.setState({
                    Done: false,
                })
                continue;
            }
            else {
                //loop for (.)
                for (let j = i; j <= email_val.length; j++) {
                    if (email_val.charAt(j) !== ".") {
                        this.setState({
                            Done: false,
                        })
                        continue;
                    }
                    else {
                        this.setState({
                            Done: true,
                            Email: email_val,
                        })
                    }
                    return
                }
            }
        }
    }

    Check = (e) => {
        e.preventDefault();
        console.log(this.state.Email)
        let params = {
            email: this.state.Email,
          }
          axios.post('http://127.0.0.1:8000/SocialMediaApi/v1/accountconfirmation', params).then(
            res => {
              this.setState({ 
                emailCheck: res.data['status'],
                emailMessage: res.data['msg']});
              if (res.data['status'] === true) {
                this.setState({ Verfication: res.data.code });
              }
            }).catch(err => console.error(err));   
    }
    Verify = (e) => {
        e.preventDefault();
        let params = {
            code: this.state.Code,
            correctcode: this.state.Verfication,
          }
          axios.post('http://127.0.0.1:8000/SocialMediaApi/v1/verification', params).then(
            res => {
              this.setState({
                codeCheck: res.data['status'],
                codeMessage: res.data['msg']});
            }).catch(err => console.error(err));
    }
    newpass = (e) => {
        this.setState({
            pass : e.target.value
        })
    }
    confPass = (e) => {
        this.setState({
            confpass : e.target.value
        })
    }
    Reset = (e) => {
        e.preventDefault();
        let params = {
            email: this.state.Email,
            code: this.state.Code,
            correctcode: this.state.Verfication,
            password: this.state.pass,
            password_confirmation: this.state.confpass
          }
          axios.post('http://127.0.0.1:8000/SocialMediaApi/v1/passwordreset', params).then(
            res => {
                this.setState({
                    passMessage:res.data['msg'],
                    passcheck:res.data['status']});
            }).catch(err => console.error(err));
    }
    render() {

        return (
            <div>
                <div className="p-0 modal fade bd-example-modal-forgot " >
                    <div className="modal-dialog modal-dialog-centered modal-md">
                        <div className="modal-content">

                            <form className=" bg-light p-5" >
                                <label className="form-control bg-info text-white">
                                    Account recovery :
                                </label>
                                <div className="p-3 container">
                                    <label className="form-control bg-dark text-white">Enter your email : </label>
                                    <div className="input-group mb-3">
                                        <input type="text" className="form-control w-100" placeholder="Email .." type="email" onChange={this.EmailHandler} />
                                        <small className = "pl-2 pt-2 text-danger">{this.state.emailMessage}</small>
                                    </div>
                                    <label className="form-control bg-dark text-white">Enter your verfication code : </label>
                                    <div className="input-group mb-3">
                                        <input type="text" className="form-control" disabled = {this.state.emailCheck ? false : true} placeholder="Code .." type="number" onChange={this.CodeHandler} />
                                        <small className = "pl-2 pt-2 text-danger">{this.state.codeMessage}</small>
                                    </div>
                                    <button className="btn btn-secondary float-left" onClick={this.Check} disabled = {this.state.emailCheck ? true : false} type = "submit">Check</button>
                                    <button className="btn btn-success float-right"  data-toggle="modal" disabled = {this.state.emailCheck ? false : true} data-target={this.state.Done == true && this.state.codeCheck == true  ? ".bd-example-modal-pass" : ""} data-dismiss={this.state.Done === true && this.state.codeCheck === true  ? "modal" : ""} onClick={this.Verify}>Next</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="p-0 modal fade bd-example-modal-pass">
                    <div className="modal-dialog modal-dialog-centered modal-md">
                        <div className="modal-content">
                            <form className=" bg-light p-5">
                                <label className="form-control bg-info text-white">
                                    Account recovery <small>( Password Reset )</small> :
                                </label>
                                <div className="p-3 container">
                                    <label className="form-control bg-dark text-white">Enter your new password : </label>
                                    <div className="input-group mb-3">
                                        <input type="password" className="form-control" placeholder="Enter your new password" onChange={this.newpass} />
                                    </div>
                                    <div className="input-group mb-3">
                                        <input type="password" className="form-control" placeholder="Confirm your new password" onChange={this.confPass} />
                                    </div>
                                    <small className = "pl-2 pt-2 text-danger">{this.state.passMessage}</small>
                                    <button className="btn btn-success float-right" onClick={this.Reset}  disabled = {this.state.passcheck ? true : false} >Done</button>
                                    <button className="btn btn-dark float-left  " data-toggle="modal" data-dismiss="modal" data-target=".bd-example-modal-forgot"><i class="fa fa-arrow-left" aria-hidden="true"></i></button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default Forgot