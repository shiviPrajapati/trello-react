import "./styles/Boards.css"
import React, { Component } from "react";
import axios from "axios";
import { createBoard } from "./Apis";
import { Link } from "react-router-dom";
import { Button, Card, Modal } from "react-bootstrap";


class Boards extends Component {

  state = {
    boards: [],
    showBoard: false,
    title: ""
  }

  componentDidMount = () => {
    axios.get("https://api.trello.com/1/members/me/boards?key=4707113ae4bb574864bf59a341bf98bf&token=0b1757680dc35a102d1bc0c026e4991bec39da3dd026dd757d5f6a988c5cfde9")
      .then((res) => this.setState({
        boards: res.data
      }))
  }

  addNewBoard = (title) => {
    createBoard(title)
      .then((res) => res.data)
      .then((newBoard) => {
        this.setState({
          boards: [...this.state.boards, newBoard]
        })
      })
  }

  handleBoard = () => {
    this.setState({
      showBoard: !this.state.showBoard
    })
  }

  handleChange = (e) => {
    this.setState({ title: e.target.value });
  }

  handleSubmit = (e) => {
    this.addNewBoard(this.state.title);
    this.handleBoard();
  }


  render() {
    console.log(this.state.boards)
    return (
      <div className="d-flex justify-content-center flex-wrap board-containers m-auto">
        {
          this.state.boards.map((board) =>
          <Card style={{width:"300px", height:"180px", margin:"20px", backgroundColor:"gray"}}>
            <Link style={{textDecoration:"none", color:"black"}} to={`/boards/${board.id}`} className="" key={board.id}>
              <Card.Title>{board.name}</Card.Title>
            </Link></Card>
          )
        }


        <Card style={{
          width:"300px", height:"180px", margin:"20px", backgroundColor:"gray"
        }} className="" onClick={this.handleBoard}>
          <div className="boards-status">
            <h5 style={{marginTop:"20px"}} className="text-center">Create New Board</h5>
          </div>
        </Card>

        <div>
          <Modal show={this.state.showBoard} onHide={this.handleBoard}>
            <Modal.Header closeButton>Board Title</Modal.Header>

            <Modal.Body>
              <input
                className="modal-input"
                onChange={this.handleChange}
                value={this.state.title}
                type="text"
                placeholder="Add New Title"
              />
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={this.handleSubmit}>Create</Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>

    )
  }


}

export default Boards;