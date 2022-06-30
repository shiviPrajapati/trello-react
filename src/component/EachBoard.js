import axios from "axios";
import React, { Component } from "react";
import { Button } from "react-bootstrap";
import Cards from "./Cards";

class EachBoard extends Component {


    state = {
        lists: [],
        listAdd: true,
        inputTitle: ""
    };

    componentDidMount = () => {
        return axios.get(
            `https://api.trello.com/1/boards/${this.props.match.params.boardId}/lists?key=4707113ae4bb574864bf59a341bf98bf&token=0b1757680dc35a102d1bc0c026e4991bec39da3dd026dd757d5f6a988c5cfde9`)
            .then((res) => this.setState({ lists: res.data }))

    }

    deleteList = (id) => {
        axios.put(`https://api.trello.com/1/lists/${id}/closed?value=true&key=4707113ae4bb574864bf59a341bf98bf&token=0b1757680dc35a102d1bc0c026e4991bec39da3dd026dd757d5f6a988c5cfde9`)
            .then((res) => {
                this.setState({
                    lists: this.state.lists.filter((list) => list.id !== id)
                })
            })
    }

    createList = () => {
        this.setState({
            listAdd: !this.state.listAdd
        })

    }

    removeList = () => {
        this.setState({
            listAdd: !this.state.listAdd
        })
    }

    handleInput = (e) => {
        this.setState({
            inputTitle: e.target.value
        })
    }

    addList = (id) => {
        this.setState({
            listAdd: !this.state.listAdd
        })
        axios.post(`https://api.trello.com/1/lists?name=${this.state.inputTitle}&idBoard=${id}&key=4707113ae4bb574864bf59a341bf98bf&token=0b1757680dc35a102d1bc0c026e4991bec39da3dd026dd757d5f6a988c5cfde9`)
            .then((res) => {
                this.setState({
                    list: [...this.state.lists, res.data],
                    inputTitle: ""
                })
                return axios.get(
                    `https://api.trello.com/1/boards/${this.props.match.params.boardId}/lists?key=4707113ae4bb574864bf59a341bf98bf&token=0b1757680dc35a102d1bc0c026e4991bec39da3dd026dd757d5f6a988c5cfde9`)
                    .then((res) => this.setState({ lists: res.data }))

            })

    }

    render() {

        return (
            <div className="lists d-flex align-items-start">
                {
                    this.state.lists.map((list) => {
                        return (
                            <div key={list.id} className="outerListContainer">
                                <div className="listContainer">
                                    <div className="d-flex justify-content-between" key={list.id}>
                                        <div className="listName">{list.name}</div>
                                        <span className="deleteList" onClick={() => this.deleteList(list.id)}> X </span>
                                    </div>
                                    {
                                        <Cards cardsOfList={list} />
                                    }
                                </div>
                            </div>
                        )
                    })
                }
                {
                    this.state.listAdd ? (
                        <div>
                            <button className="createListBtn" onClick={this.createList}>+ Add another list</button>
                        </div>
                    ) : (
                        <div className="listModule">
                            <input className="addListInput" type="text" onChange={this.handleInput} value={this.state.inputTitle} placeholder="Enter list title..."></input>
                            <div className="addListDiv">
                                <Button onClick={() => this.addList(this.props.match.params.boardId)}>Add list</Button>
                                <span onClick={this.removeList}> X </span>
                            </div>
                        </div>
                    )
                }
            </div>
        )
    }
}

export default EachBoard

