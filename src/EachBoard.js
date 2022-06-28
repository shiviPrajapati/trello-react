import axios from "axios";
import React, { Component } from "react";
import { Button } from "react-bootstrap";

class EachBoard extends Component {


    state = {
        lists: [],
        listAddButton: true,
      };

    //   componentDidMount = () => {
    //     return axios.get(
    //       `https://api.trello.com/1/boards/${}}/lists?key=4707113ae4bb574864bf59a341bf98bf&token=0b1757680dc35a102d1bc0c026e4991bec39da3dd026dd757d5f6a988c5cfde9`)
    //       .then((res) => this.setState({lists: res.data}))
    
    //     }

    render(){
        console.log(this.props.match.params.id)
        return (
            <div className="">
                {
                    
                }
            </div>
        )
    }
}

export default EachBoard

