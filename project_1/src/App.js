import { Component } from 'react';
import StartUp from './Startup/StartUp';
import Singup from './Signup/SignUp';
import Main_Page from './Main_page/Main_page'
import { BrowserRouter, Route } from 'react-router-dom'
import Profile from './Profile/Profile';


class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Route exact path="/" component={StartUp} />
          <Route path="/Singup" component={Singup} />
          <Route path="/StartUp" component={StartUp} />
          <Route path="/Main_Page" component={Main_Page} />
          <Route path="/Profile" component={Profile} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;