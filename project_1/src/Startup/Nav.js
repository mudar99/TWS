import { Component } from "react";
import SignupContainer from "../Signup/SignupContainer";



class Nav extends Component {
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
                {/* ------------- NavBar ------------- */}
                <div className="fixed-top row">
                    <nav className="navbar rounded float-left">
                        <form className="container-fluid justify-content-start ">
                            <a href="#Signin"><button className="btn btn-outline-dark " type="button">Log in</button></a>
                            <a href="About"><button className="m-2 btn btn-outline-dark " type="button">About</button></a>
                            <a href="#"><button className=" btn btn-outline-dark " onClick={this.showSignup} type="button"  >SignUp</button></a>
                        </form>
                    </nav>
                    <div id="SignupContainer_css">
                        <SignupContainer />
                    </div>
                </div>



            </div>
        );
    }
}
export default Nav