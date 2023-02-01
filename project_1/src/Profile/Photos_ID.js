import { Component } from "react";
import Cookies from 'universal-cookie';




class Photos_ID extends Component {
    render() {
        const cookies = new Cookies();
        return (

            <div>
                <div className="cover_photo">
                    <img className="rounded" src={`http://127.0.0.1/SocialMediaBackEnd/storage/app/public/${cookies.get('pictureWall')}`} style={{ width: "100%", height: "100%" }} />


                </div>

                <div className="profile_photo text-center">

                    <img className="profile_img" src={`http://127.0.0.1/SocialMediaBackEnd/storage/app/public/${cookies.get('pictureProfile')}`} />
                    <p className="ID text-center"></p>
                    <h4>{cookies.get('firstName') + " " + cookies.get('lastName')}</h4>
                    <hr className="mb-5" />

                </div>

            </div>
        );
    }
}
export default Photos_ID