import { Component } from "react";


class Footer extends Component {
  render() {
    return (
      <footer className="footer text-center text-dark">

        <div className=" p-4 pb-0">
          <div className="row">
            <h4 className="col-md-4 mb-4">Contact with us</h4>
            <section className="col-md-4">

              <a className="btn btn-outline-dark btn-floating m-1" href="#!" role="button">
                <i className="fa fa-facebook"></i></a>


              <a className="btn btn-outline-dark btn-floating m-1" href="#!" role="button"
              ><i className="fa fa-twitter"></i></a>

              <a className="btn btn-outline-dark btn-floating m-1" href="#!" role="button"
              ><i className="fa fa-google"></i></a>


              <a className="btn btn-outline-dark btn-floating m-1" href="#!" role="button"
              ><i className="fa fa-instagram"></i></a>



              <a className="col-md-4 text-dark" href="#">©2021 Copyrights</a>

            </section>

          </div>


        </div>
      </footer>
    );
  }
}
export default Footer