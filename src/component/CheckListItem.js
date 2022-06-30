import axios from "axios";
import { Component } from "react";
import { Button } from "react-bootstrap";

class CheckListItem extends Component{

    state = {
        checklistItem: [],
        addChecklistItem: true,
        inputTitle: ""
    }

    componentDidMount = () => {
        axios.get(`https://api.trello.com/1/checklists/${this.props.checkList.id}/checkItems?key=4707113ae4bb574864bf59a341bf98bf&token=0b1757680dc35a102d1bc0c026e4991bec39da3dd026dd757d5f6a988c5cfde9`)
        .then((res) => this.setState({
            checklistItem: res.data
        }))
    }

    handleChange = () => {
        this.setState({
            addChecklistItem: !this.state.addChecklistItem
        })
    }

    handleInput = (e) => {
        this.setState({
            inputTitle: e.target.value
        })
    }

    handleSubmit = () => {
        axios.post(`https://api.trello.com/1/checklists/${this.props.checkList.id}/checkItems?name=${this.state.inputTitle}&key=4707113ae4bb574864bf59a341bf98bf&token=0b1757680dc35a102d1bc0c026e4991bec39da3dd026dd757d5f6a988c5cfde9`)
        .then((res) => this.setState({
            checklistItem: [...this.state.checklistItem, res.data],
            addChecklistItem: !this.state.addChecklistItem,
            inputTitle: ""
        }))
    }

    deleteChecklistItem = (id) => {
        axios.delete(`https://api.trello.com/1/checklists/${this.props.checkList.id}/checkItems/${id}?key=4707113ae4bb574864bf59a341bf98bf&token=0b1757680dc35a102d1bc0c026e4991bec39da3dd026dd757d5f6a988c5cfde9`)
        .then((res) => this.setState({
            checklistItem: this.state.checklistItem.filter((item) => item.id !== id)
        }))
    }


    render() {
        return (
            <div>
                <div>
                    {
                        this.state.checklistItem.map((checkList) => {
                            return(
                                <div className="listItem" key={checkList.id}>
                                    <div>
                                        <input className="checkBox" type="checkbox"></input>
                                        <span style={{marginLeft:"5px"}}>{checkList.name}</span>
                                    </div>
                                    <span style={{cursor:"pointer"}}  onClick={() => this.deleteChecklistItem(checkList.id)}>X</span>
                                </div>
                            )
                        })
                    }
                </div>
                <div>
                    {
                        this.state.addChecklistItem ? (
                            <button className="addCheckListBtn" onClick={this.handleChange}>Add an item</button>
                        ): (
                            <div>
                                <input className="addChecklistItemTitle" placeholder="Add an item" onChange={this.handleInput} value={this.state.inputTitle}></input>
                                <Button onClick={this.handleSubmit} style={{marginRight:"20px"}}>Add</Button>
                                <span style={{cursor:"pointer"}} onClick={this.handleChange}>Cancle</span>
                            </div>
                        )
                    }
                </div>
            </div>
        )
    }
}

export default CheckListItem