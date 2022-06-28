import axios from "axios";


export function createBoard(title) {
    return axios.post(`https://api.trello.com/1/boards/?name=${title}&key=4707113ae4bb574864bf59a341bf98bf&token=0b1757680dc35a102d1bc0c026e4991bec39da3dd026dd757d5f6a988c5cfde9`)  
}
