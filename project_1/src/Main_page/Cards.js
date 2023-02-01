import { Component } from "react";


class Cards extends Component {
    render() {
        return (
            <div>

                <div className="card">
                    <img src={this.props.img} alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{this.props.title}</h5>
                        <p className="card-text">{this.props.text}</p>
                        <a href={this.props.link} className="btn btn-primary">Go There</a>
                    </div>

                </div>
            </div>
        )
    }
}
export default Cards