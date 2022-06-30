import axios from "axios";
import { Component } from "react";
import { Button } from "react-bootstrap";
import CheckListItem from "./CheckListItem";

class CheckListContainer extends Component{

  state = {
    addListItem: true,
    allCheckList: [],
    listTitle: ""
  }

  componentDidMount = () => {
    axios.get(`https://api.trello.com/1/cards/${this.props.CardDetails.id}/checklists?key=4707113ae4bb574864bf59a341bf98bf&token=0b1757680dc35a102d1bc0c026e4991bec39da3dd026dd757d5f6a988c5cfde9`)
      .then((res) => this.setState({allCheckList: res.data}))
  }

  handleChange = () => {
    this.setState({
      addListItem: !this.state.addListItem
    })
  }

  handleInput = (e) => {
    this.setState({
        listTitle: e.target.value
    })
  }

  handleSubmit = () => {
    axios.post(`https://api.trello.com/1/checklists?name=${this.state.listTitle}&idCard=${this.props.CardDetails.id}&key=4707113ae4bb574864bf59a341bf98bf&token=0b1757680dc35a102d1bc0c026e4991bec39da3dd026dd757d5f6a988c5cfde9`)
    .then((res) => {
      this.setState({
        allCheckList: [...this.state.allCheckList, res.data],
        addListItem: !this.state.addListItem,     
        listTitle: ""
      })
    })
  }

  deleteList = (id) => {
    axios.delete(`https://api.trello.com/1/checklists/${id}?key=4707113ae4bb574864bf59a341bf98bf&token=0b1757680dc35a102d1bc0c026e4991bec39da3dd026dd757d5f6a988c5cfde9`)
    .then((res) => {
      this.setState({
        allCheckList: this.state.allCheckList.filter((list)=> list.id !== id)
      })
    })
  }


  render() {
    return (
      <div>
        <div className="modalBody">
          {
            this.state.addListItem ? (
              <button className="addCheckListBtn" onClick={this.handleChange}>Add a checklist</button>
            ):(
              <div>
                <div>
                  <input className="addChecklistTitle" placeholder="Add a checklist" type="text" onChange={this.handleInput} value={this.state.listTitle}></input>
                </div>
                <div className="checklistAddBtn">
                  <Button style={{marginRight:"20px"}} onClick={this.handleSubmit}>Add </Button>
                  <span style={{cursor:"pointer"}} onClick={this.handleChange}>Cancle</span>
                </div>
                
              </div>
            )
          }
        </div>

        <div className="checklistContainer">
          {
            this.state.allCheckList.map((checkList) => {
              return (
                <div className="checkListItem" key={checkList.id}>
                  <div>
                    <div className="checklist">
                      <div style={{fontWeight:"bold"}}>{checkList.name}</div>
                      <span className="dltChecklist" onClick={() => this.deleteList(checkList.id)}>delete</span>
                    </div>
                    <div>
                      <CheckListItem checkList={checkList}>                        
                      </CheckListItem>                      
                    </div>
                  </div>

                  
                </div>
              )
            })
          }
        </div>
      </div>
    )
  }
}

export default CheckListContainer