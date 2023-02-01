import { Component } from "react";

class Sub_noti extends Component {
    render() {
        return (

            <ul>
                <li className="list-group-item ">
                    <div className="row">
                        <div className="col-md-2">
                            <img src={this.props.img} alt="user" className="notification-photo mr-2 " />
                        </div>
                        <div className="col-md-10">
                            <p>{this.props.name + " "}
                                {this.props.body}
                            </p>
                        </div>
                    </div>
                </li>
            </ul>
        )
    }
}
export default Sub_noti