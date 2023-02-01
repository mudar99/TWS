import { Component } from "react";
//import $ from 'jquery';
import axios from "axios";
import Cookies from 'universal-cookie';


class Edit_container extends Component {

  state = {
    _Day: "",
    _Year: "",
    _Month: "",
    _Email: "",
    DayDone: false,
    MonthDone: false,
    YearDone: false,
    Profile_Img: "",
    Cover_Img: "",
    _Work: "",
    _Country: "",
    _About: '',
    _Gender: "",
    _Birth: "",

    is_Profile_Img: false,
    is_Cover_Img: false,
    certificate: [],
    allcertificate: [],
    region: "",
    allregion: [],
    user_info: [],
    checkload: false,
  }

  GenderHandler = (e) => {
    this.setState({
      _Gender: e.target.value,
    })
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

    axios.all([
      axios.post('http://127.0.0.1:8000/SocialMediaApi/v1/mycertificate', "", headers),
      axios.post('http://127.0.0.1:8000/SocialMediaApi/v1/myregion', "", headers),
      axios.post('http://127.0.0.1:8000/SocialMediaApi/v1/region', "", headers),
      axios.post('http://127.0.0.1:8000/SocialMediaApi/v1/certificate', "", headers),
    ]).then(
      res => {
        console.log(res);
        if ((res[0].data['status'] == true)
          && (res[1].data['status'] == true)
          && (res[2].data['status'] == true)
          && (res[3].data['status'] == true)) {
          let cer = [];
          res[0].data.certificate.forEach((certificateone) => {
            cer.push(certificateone.name);
          });
          this.setState({
            certificate: res[0].data.certificate,
            region: res[1].data.region.name,
            _Country: this.state.region,
            allregion: res[2].data.Regions,
            allcertificate: res[3].data.certificates,
            certificate: cer,
          });
        } else {
          window.location.href = "./StartUp"
        }
      }).catch(err => console.error(err));

    axios.post('http://127.0.0.1:8000/SocialMediaApi/v1/me', "", headers)
      .then(
        res => {
          console.log(res.data);
          if (res.data['status'] == true) {
            this.setState({ user_info: res.data.user });
            cookies.set('id', this.state.user_info['id'], { path: '/', domain: 'localhost', secure: true, httponly: true });
            cookies.set('firstName', this.state.user_info['firstName'], { path: '/', domain: 'localhost', secure: true, httponly: true });
            cookies.set('lastName', this.state.user_info['lastName'], { path: '/', domain: 'localhost', secure: true, httponly: true });
            cookies.set('pictureWall', this.state.user_info['pictureWall'], { path: '/', domain: 'localhost', secure: true, httponly: true });
            cookies.set('pictureProfile', this.state.user_info['pictureProfile'], { path: '/', domain: 'localhost', secure: true, httponly: true });
            let birth = res.data.user.birth;
            if (birth != null) {
              let myArray = birth.split('-');
              this.setState({
                _Month: myArray[1],
                _Day: myArray[2],
                _Year: myArray[0],
              })
            }
            this.setState({
              _About: res.data.user.about,
              _Work: res.data.user.work,
              _Email: res.data.user.email,
              _Gender: res.data.user.gender,
              checkload: true,
            })
          } else {
            window.location.href = "./StartUp"
          }
        }).catch(err => console.error(err));
    if (cookies.get('pictureWall') != "Files/Virtual/Wall.jpg") {
      this.setState({ is_Cover_Img: true })
    }
    if (cookies.get('pictureProfile') != "Files/Virtual/profile.png") {
      this.setState({ is_Profile_Img: true })

    }
  }
  Profile = (e) => {
    let profile_photo = e.target.files[0];
    this.setState({
      Profile_Img: profile_photo
    })
  }
  Cover = (e) => {
    let cover_photo = e.target.files[0];
    this.setState({
      Cover_Img: cover_photo
    })
  }
  BirthHandler = () => {
    if (this.state._Year != "" && this.state._Month != "" && this.state._Day != "") {
      return (this.state._Year + "-" + this.state._Month + "-" + this.state._Day)
    }
    return ""
  }
  DayHandler = (e) => {
    e.preventDefault();
    let Day = document.getElementById('Day').value;
    this.setState({
      _Day: Day
    })
    if (Day > 31 || Day < 1) {
      document.getElementById('day_warning').innerHTML = "Day must be between 1 and 31";
      document.getElementById('day_warning').style.opacity = 1;
    }
    else {
      document.getElementById('day_warning').style.opacity = 0;
      this.setState(prevState => ({
        DayDone: !prevState.DayDone,
        _Day: Day,
      }))
    }
  }
  monthHandler = (e) => {
    e.preventDefault();
    let Month = document.getElementById('Month').value;
    this.setState({
      _Month: Month
    })
    if (Month > 12 || Month < 1) {
      document.getElementById('month_warning').innerHTML = "Month must be between 1 and 12";
      document.getElementById('month_warning').style.opacity = 1;
    }
    else {
      document.getElementById('month_warning').style.opacity = 0;
      this.setState(prevState => ({
        MonthDone: !prevState.MonthDone,
        _Month: Month,
      }))
    }
  }
  yearHandler = (e) => {
    e.preventDefault();
    let Year = document.getElementById('Year').value;
    this.setState({
      _Year: Year
    })
    if (Year > 2021 || Year < 1920) {
      document.getElementById('year_warning').innerHTML = "Year must be between 1920 and 2021";
      document.getElementById('year_warning').style.opacity = 1;
    }
    else {
      document.getElementById('year_warning').style.opacity = 0;
      this.setState(prevState => ({
        YearDone: !prevState.YearDone,
        _Year: Year,
      }))
    }
  }
  WorkHandler = (e) => {
    e.preventDefault();
    let Work_val = e.target.value
    this.setState({
      _Work: Work_val,
    })
  }
  CountryHandler = (e) => {
    e.preventDefault();
    let Country_val = e.target.value
    this.setState({
      _Country: Country_val,
    })
  }
  EmailHandler = (e) => {
    e.preventDefault();
    let Email_val = e.target.value
    this.setState({
      _Email: Email_val,
    })
  }
  AboutMeHandler = (e) => {
    let About_value = e.target.value
    this.setState({
      _About: About_value,
    })
  }
  ConfirmHandler = (e) => {
    const checkboxes = document.querySelectorAll('input[name="certificates"]:checked');
    let cer = [];
    checkboxes.forEach((checkbox) => {
      cer.push(checkbox.value);
    });
    console.log(cer)
    const cookies = new Cookies();
    let params = {
      work: this.state._Work,
      city: this.state._Country,
      email: this.state._Email,
      about: this.state._About,
      birth: this.BirthHandler(),
      gender: this.state._Gender,
      certificate: cer,
      checkEdit: "certificate",
    }
    console.log(params.birth);
    let headers = {
      headers: {
        socialmedia: cookies.get('socialmedia'),
        remember_token: cookies.get('remember_token'),
      }
    }
    const data = new FormData();
    data.append('pictureProfile', this.state.Profile_Img);
    data.append('pictureWall', this.state.Cover_Img);

    axios.all([
      axios.post('http://127.0.0.1:8000/SocialMediaApi/v1/edit', data, headers),
      axios.post('http://127.0.0.1:8000/SocialMediaApi/v1/edit', params, headers)
    ]).then(
      res => {
        console.log(res);
        if ((res[0].data['status'] == true) || (res[1].data['status']) == true) {
          window.location.reload();
        }
      }).catch(err => console.error(err));

    e.preventDefault();
  }
  ProfileImgDel = (e) => {
    e.preventDefault()
    const cookies = new Cookies();
    let headers = {
      headers: {
        socialmedia: cookies.get('socialmedia'),
        remember_token: cookies.get('remember_token'),
      }
    }
    axios.post('http://127.0.0.1:8000/SocialMediaApi/v1/deletepictureprofile', "", headers).then(
      res => {
        console.log(res.data);
        if ((res.data['status'] == true)) {
          this.setState({ is_Profile_Img: false })
          window.location.reload();
        }
      }).catch(err => console.error(err));
  }
  CoverImgDel = (e) => {
    e.preventDefault()
    const cookies = new Cookies();
    let headers = {
      headers: {
        socialmedia: cookies.get('socialmedia'),
        remember_token: cookies.get('remember_token'),
      }
    }
    axios.post('http://127.0.0.1:8000/SocialMediaApi/v1/deletepicturewall', "", headers).then(
      res => {
        console.log(res.data);
        if ((res.data['status'] == true)) {
          this.setState({ is_Cover_Img: false })
          window.location.reload();
        }
      }).catch(err => console.error(err));
  }
  selectCertificate = (e) => {
    let Certificate_value = e.target.value
    let index = this.state.certificate.indexOf(Certificate_value)
    this.state.certificate[index] = null
    this.setState({
      certificate: this.state.certificate,
    });
  }
  render() {
    return (
      <div >
        <div className="text-center mb-3 p-5" hidden={this.state.checkload == true ? true : false}>
          <div className="spinner-border" role="status">
            <span className="sr-only" >Loading...</span>
          </div>
        </div>
        <form className=" bg-light p-5" hidden={this.state.checkload == false ? true : false}>
          <label className="form-control bg-info text-white">Manage and edit your Information :</label>

          <label className="form-control bg-dark text-white">Cover photo :</label>
          <input className="cover_choose container p-1  rounded w-50" type="file" onChange={this.Cover} />
          <button className="btn btn-outline-danger float-right m-3" hidden={this.state.is_Cover_Img == false ? true : false} onClick={this.CoverImgDel}>Delete</button>
          <label className="form-control bg-dark text-white">Profile photo :</label>
          <input className="cover_choose container p-1  rounded w-50" type="file" onChange={this.Profile} />
          <button className="btn btn-outline-danger float-right m-3" hidden={this.state.is_Profile_Img == false ? true : false} onClick={this.ProfileImgDel}>Delete</button>

          <label className="form-control bg-dark text-white">Edit About Me :</label>
          <textarea onChange={this.AboutMeHandler} className="container p-1 rounded " id="aboutme" defaultValue={this.state.user_info['about']}>
          </textarea>

          <label className="form-control bg-dark text-white">Edit Certificates :</label>

          <div className="cer_selector mb-3 w-100 container " >
            {this.state.allcertificate.map((element) => {
              if (this.state.certificate.includes(element['name']) == true) {
                return (
                  <div className="form-check" >
                    <label className="form-check-label"  >
                      <input className="form-check-input" type="checkbox" onClick={this.selectCertificate} checked name="certificates" value={element['name']} />
                      {element['name']}
                    </label>
                  </div>)
              } else {
                return (
                  <div className="form-check" >
                    <label className="form-check-label"  >
                      <input className="form-check-input" type="checkbox" name="certificates" value={element['name']} />
                      {element['name']}
                    </label>
                  </div>)
              }
            })}
          </div>


          <label className="form-control bg-dark text-white">Edit Information :</label>
          <div className="p-3 container">

            <div className="input-group mb-3">
              <input className="form-control" placeholder="Email .." id="Email_val" type="email" onChange={this.EmailHandler} defaultValue={this.state.user_info['email']} />
              <div className="input-group-append">
                <span className="input-group-text" id="basic-addon2">@example.com</span>
              </div>
            </div>

            <div className="input-group mb-3">
              <input type="text" className="form-control" id="Work_val" placeholder=" Work .." onChange={this.WorkHandler} defaultValue={this.state.user_info['work']} />
            </div>

            <div className="input-group mb-3">

              <select className="form-control" id="Country_val" name="country" onChange={this.CountryHandler} >
                {this.state.allregion.map((region) => {
                  if (this.state.region == region['name']) {
                    return (<option value={region['name']} selected>{region['name']}</option>)
                  } else {
                    return (<option value={region['name']}>{region['name']}</option>)
                  }
                })}
              </select>

            </div>

            <div className="input-group mb-4">
              <input type="number" className="form-control" id="Day" placeholder="Day" onChange={this.DayHandler} defaultValue={this.state._Day} />
              <input type="number" className="form-control" id="Month" placeholder="Month" onChange={this.monthHandler} defaultValue={this.state._Month} />
              <input type="number" className="form-control" id="Year" placeholder="Year" onChange={this.yearHandler} defaultValue={this.state._Year} />

              <div className="row input-group">
                <small className="col-md-4 text-danger" id="day_warning"></small>
                <small className="col-md-4 text-danger" id="month_warning"></small>
                <small className="col-md-4 text-danger" id="year_warning"></small>
              </div>
            </div>
            <h6 className="ml-2 mb-3">Select your gender :</h6>
            <select className="form-control form-control-sm mb-4" id="gender" onChange={this.GenderHandler}>
              {this.state.user_info['gender'] == "Non" ? <option value="Non" selected>None</option> : <option value="Non">None</option>}
              {this.state.user_info['gender'] == "Male" ? <option value="Male" selected>Male</option> : <option value="Male">Male</option>}
              {this.state.user_info['gender'] == "Female" ? <option value="Female" selected>Female</option> : <option value="Female">Female</option>}



            </select>
            <label>
              <button className="btn btn-info float-left " onClick={this.ConfirmHandler} data-dismiss="modal">Save</button>
            </label>
            <button type="button" className="btn btn-danger float-right " data-dismiss="modal" >Cancel</button>

          </div>


        </form>

      </div>
    )
  }
}
export default Edit_container