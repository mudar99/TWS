import { Component } from "react"



class Footer extends Component {

  render() {
    return (

      <footer className="footer bg-info text-center text-white">

        <div className=" container p-4 pb-0">
          <div className="row">
            <h4 className="col-md-2 mb-4">Contact with us</h4>
            <section className="col-md-8">

              <a className="btn btn-outline-light btn-floating m-1" href="#!" role="button">
                <i className="fa fa-facebook"></i></a>


              <a className="btn btn-outline-light btn-floating m-1" href="#!" role="button"
              ><i className="fa fa-twitter"></i></a>

              <a className="btn btn-outline-light btn-floating m-1" href="#!" role="button"
              ><i className="fa fa-google"></i></a>


              <a className="btn btn-outline-light btn-floating m-1" href="#!" role="button"
              ><i className="fa fa-instagram"></i></a>

              <p className="text-center pt-3" >
                © 2021
    <a className="text-white" href=""> Copyrights</a>
              </p>
            </section>

          </div>


        </div>
      </footer>
    );
  }
}
export default Footer