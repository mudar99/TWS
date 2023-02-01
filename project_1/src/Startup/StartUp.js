import { Component } from 'react';
import SignConteiner from './SignContainer';
import './StartUp_style.css';
import Footer from "./Footer";





class StartUp extends Component {

  render() {
    return (
      <div>
        <SignConteiner />
        <Footer />
      </div>
    );
  }
}

export default StartUp;