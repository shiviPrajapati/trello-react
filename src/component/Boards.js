
import React, { Component } from "react";
import axios from "axios";
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { Button, Modal } from "react-bootstrap";


class Boards extends Component {

  state = {
    boards: [],
    showBoard: false,
    loading: false,
    title: ""
  }

  componentDidMount = () => {
    axios.get("https://api.trello.com/1/members/me/boards?key=4707113ae4bb574864bf59a341bf98bf&token=0b1757680dc35a102d1bc0c026e4991bec39da3dd026dd757d5f6a988c5cfde9")
      .then((res) => this.setState({
        boards: res.data,
        loading: !this.state.loading
      }))
  }

  addNewBoard = (title) => {
    axios.post(`https://api.trello.com/1/boards/?name=${title}&key=4707113ae4bb574864bf59a341bf98bf&token=0b1757680dc35a102d1bc0c026e4991bec39da3dd026dd757d5f6a988c5cfde9`)  
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
    return (
      <div>
        {this.state.loading && <></>}
      <div className="d-flex justify-content-center flex-wrap m-auto">
        {
          this.state.boards.map((board) =>
            <Link className="board" to={`/boards/${board.id}`} key={board.id}>
             {board.name}
            </Link>
          )
        }


       
        <div onClick={this.handleBoard} className="new-board">
          <div>
            <h5 className="text-center">Create New Board</h5>
          </div>
</div>
        <div>
          <Modal show={this.state.showBoard} onHide={this.handleBoard}>
            <Modal.Header closeButton>Board Title</Modal.Header>

            <Modal.Body>
              <input
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
</div>
    )
  }


}

export default Boards;