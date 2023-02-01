import { Component } from "react";


class EditSocial extends Component {

    state = {
        isToggleOn: false,
        imgPath: "",
        newText: "",
    };

    textarea_edit = () => {
        let new_text = document.getElementById('textarea_edit').value;
        this.setState({
            newText: new_text,
        })

    }
    EditImg = () => {
        let path = "";
        let fakepath = document.getElementById('EditImg').value;
        for (let i = 12; i < fakepath.length; i++) {
            path += fakepath[i];
        }
        this.setState({
            imgPath: path,
        })
        document.getElementById("edited-image").style.display = "block";
        document.getElementById("social-post-image").style.display = "none"
    }
    saveEdit = (e) => {
        e.preventDefault();
        console.log(this.state.newText);
        document.getElementById('post-text').innerHTML = this.state.newText;
    }


    render() {
        return (
            <div>
                <div className="rounded bg-light ">

                    <div className="container post-header ">
                        <div className="col-xs img_header w-25 h-100 p-1">
                            <img src={this.props.img} />
                        </div>

                        <div className="ID_header text-dark w-100 text-center pl-3 pt-3">
                            <h3 className="float-left text-info">{this.props.IDa}</h3>
                            <label className="row col-sm "><small className="fa fa-clock-o" style={{ fontSize: "17px" }}> {this.props.time} <big>Hours</big></small></label>
                        </div>


                        <div className="btn-group h-25 m-2">
                            <button type="button" className=" btn btn-secondary dropdown-toggle dropdown-toggle-split" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <big>Privacy </big>
                            </button>
                            <div className="dropdown-menu ">
                                <a className="dropdown-item" href="#"><i className="fa fa-globe"> </i> Puplic</a>
                                <a className="dropdown-item" href="#"><i className="fa fa-users"> </i> Friends</a>
                            </div>
                        </div>
                    </div>


                    <div className="post-body container">

                        {/* for Edit post text */}
                        <div id="x-post-text" className="form-group">
                            <label className="bg-info text-dark w-100 p-2 mt-2" style={{ fontSize: "20px" }}>Editing Your Text :</label>
                            <textarea onChange={this.textarea_edit} id="textarea_edit" className="form-control p-3 mt-2 w-100" defaultValue={this.props.text}>
                            </textarea>

                        </div>

                        <label id="edit-post-media" className=" p-3 m-1">
                            Edit Img :
            <input onChange={this.EditImg} id="EditImg" className="bg-primary ml-2 " type="file" />
                        </label>

                    </div>

                    <div className="post-media text-center">

                        <a data-toggle="modal" data-target="#tutorialsplaneModal">
                            <img id="social-post-image" className="social-post-image container pb-3" src={this.props.post_photo} />
                        </a>
                        <a data-toggle="modal" data-target="#editedmodal">
                            <img id="edited-image" className="social-post-image container pb-3" src={"/Img/" + this.state.imgPath} />
                        </a>
                    </div>

                    <div className="post-footer container text-center p-2 pb-4">




                        <div className="container">


                            <div className="">
                                <button onClick={this.saveEdit} id="save" type="button" className="float-left btn btn-outline-primary btn-sm my-2 " data-dismiss="modal">
                                    <i className="fa fa-save"></i> Save
            </button>

                                <button type="button" className="float-right btn btn-outline-danger btn-sm my-2 " data-dismiss="modal">Cancel</button>


                            </div>
                        </div>

                        {this.state.isToggleOn ? this.some_objects.comment_textarea : ''}
                    </div>

                </div>

            </div>
        )
    }
}
export default EditSocial;