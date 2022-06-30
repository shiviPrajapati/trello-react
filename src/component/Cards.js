import axios from "axios";
import React, { Component } from "react";
import { Button, Modal } from "react-bootstrap";
import CheckListContainer from "./CheckListContainer";

class Cards extends Component {

    state = {
        cards: [],
        addCard: true,
        inputCardTitle: "",
        checkListModal: false,
        checkCard: ""
    }

    componentDidMount = () => {
        axios.get(`https://api.trello.com/1/lists/${this.props.cardsOfList.id}/cards?key=4707113ae4bb574864bf59a341bf98bf&token=0b1757680dc35a102d1bc0c026e4991bec39da3dd026dd757d5f6a988c5cfde9`)
            .then((res) => {
                this.setState({ cards: res.data })
            })
    }

    createCard = () => {
        this.setState({
            addCard: !this.state.addCard
        })
    }

    handleInput = (e) => {
        this.setState({
            inputCardTitle: e.target.value
        })
    }

    addCard = (id) => {
        axios.post(`https://api.trello.com/1/cards?name=${this.state.inputCardTitle}&idList=${id}&key=4707113ae4bb574864bf59a341bf98bf&token=0b1757680dc35a102d1bc0c026e4991bec39da3dd026dd757d5f6a988c5cfde9`)
            .then((res) => {
                this.setState({
                    cards: [...this.state.cards, res.data],
                    addCard: !this.state.addCard,
                    inputCardTitle: ""
                })
            })
    }

    closeCard = () => {
        this.setState({
            addCard: !this.state.addCard
        })
    }

    deleteCard = (id) => {
        axios.delete(`https://api.trello.com/1/cards/${id}?key=4707113ae4bb574864bf59a341bf98bf&token=0b1757680dc35a102d1bc0c026e4991bec39da3dd026dd757d5f6a988c5cfde9`)
            .then((res) => {
                this.setState({
                    cards: this.state.cards.filter((card) => card.id !== id)
                })
            })
    }

    createCheckListModule = (card) => {
        console.log(card.name)
        this.setState({
            checkListModal: !this.state.checkListModal,
            checkCard: card
        })
    }

    handleCheckList = () => {
        this.setState({
            checkListModal: !this.state.checkListModal
        })
    }

    render() {
        return (
            <div>
                <div>
                    {
                        this.state.cards.map((card) => {
                            return (
                                <div key={card.id}>
                                    <div className="cardContainer">
                                        <div className="cardItem">
                                            <div style={{cursor:"pointer"}} onClick={() => this.createCheckListModule(card)}>{card.name} </div>
                                            <span className="dltListItemBtn" onClick={() => this.deleteCard(card.id)}> X </span>
                                        </div>
                                        
                                    </div>

                                    
                                    <div className="checkListModal">
                                        
                                        <Modal show={this.state.checkListModal} onHide={this.handleCheckList}>
                                            <Modal.Header closeButton>
                                                <div className="modalHeader">
                                                    <div className="cardName">~ {this.state.checkCard.name}</div>
                                                    <div style={{marginLeft:"20px"}}>In List {this.props.cardsOfList.name}</div>
                                                </div>
                                                
                                            </Modal.Header> 
                                            <CheckListContainer CardDetails={this.state.checkCard}
                                                handleChecklistModal={this.handleCheckList}
                                                listDetail={this.props.cardsOfList} />
                                        </Modal>
                                    </div>


                                </div>
                            )
                        })
                    }
                </div>

                <div>
                    {
                        this.state.addCard ? (
                            <button className="addListItemBtn" onClick={this.createCard}> + Add a card</button>
                        ) : (
                            <div className="listItemModule">
                                <input className="cardTitle" placeholder="Enter a title for this card..." onChange={this.handleInput}></input>
                                <div>
                                    <Button onClick={() => this.addCard(this.props.cardsOfList.id)}>Add card</Button>
                                    <span className="closeCardModule" onClick={this.closeCard}> X </span>
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
        )
    }
}

export default Cards