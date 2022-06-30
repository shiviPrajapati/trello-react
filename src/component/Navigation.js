import { Component } from "react";
import { Link } from "react-router-dom";

class Navigation extends Component{
    render(){
        return(
            <div className="nav">
                <Link className="navLink" to="/boards">Home</Link>
                <span className="navTitle">Trello</span>
            </div>
        )
    }
}

export default Navigation