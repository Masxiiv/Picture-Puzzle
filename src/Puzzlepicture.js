// src/Puzzle.js
import React, { Component } from 'react';
import './Puzzlepicture.css';
import one from './images/1.jpg';
import two from './images/2.jpg';
import three from './images/3.jpg';
import four from './images/4.jpg';
import five from './images/5.jpg';
import six from './images/6.jpg';
import seven from './images/7.jpg';
import eight from './images/8.jpg';
import nine from './images/9.jpg';
import ten from './images/10.jpg';
import eleven from './images/11.jpg';
import twelve from './images/12.jpg';
import thirteen from './images/13.jpg';
import fourteen from './images/14.jpg';
import fifteen from './images/15.jpg';
import emptyImage from './images/16.jpg';

const time_stat = [];
class Puzzlepicture extends Component {
  constructor(props) {
    super(props);
    this.state = {
      board: this.shuffleArray(Array.from({ length: 16 }, (_, i) => i)),
      moves: 0,
      timer: 0,
      isGameStarted: false,
      roundStartTime: null,
      roundEndTime: null,
    };
  }
  startNewRound = () => {
    this.setState({
      board: this.shuffleArray(Array.from({ length: 16 }, (_, i) => i)),
      moves: 0,
      timer: 0,
      isGameStarted: false,
      roundStartTime: null,
      roundEndTime: null,
    });
  };
  sortBoard = () => {
    const sortedBoard = Array.from({ length: 16 }, (_, i) => (i === 15 ? 0 : i + 1));
    this.setState({ board: sortedBoard });
  };

  winRound = () => {
    this.sortBoard();
  };


  shuffleArray(array) {

    let newArray = array.slice();
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  }

  startGame = () => {
    if (!this.state.isGameStarted) {
      this.setState({ isGameStarted: true, roundStartTime: Date.now() });
      this.timerInterval = setInterval(() => {
        this.setState((prevState) => ({ timer: prevState.timer + 1 }));
      }, 1000);
    }
  };

  // สร้างฟังก์ชันเมื่อคลิกที่เลขในกริด
  handleClick = (number) => {
    if (!this.state.isGameStarted) {
      this.startGame();
    }
    const { board, moves } = this.state;
    const numberIndex = board.indexOf(number);
    const emptyIndex = board.indexOf(0);

    if (this.isValidMove(numberIndex, emptyIndex)) {
      const newBoard = [...board];
      [newBoard[numberIndex], newBoard[emptyIndex]] = [newBoard[emptyIndex], newBoard[numberIndex]];

      this.setState((prevState) => ({
        board: newBoard,
        moves: prevState.moves + 1,
      }));


      if (this.isSolved(newBoard)) {
        const { timer } = this.state;

        time_stat.push(timer);
        console.log(time_stat);


        clearInterval(this.timerInterval);



      }
    }
  };

  isValidMove = (numberIndex, emptyIndex) => {
    const rowSize = 4;
    const isSameRow = Math.floor(numberIndex / rowSize) === Math.floor(emptyIndex / rowSize);
    const isSameColumn = numberIndex % rowSize === emptyIndex % rowSize;

    return (isSameRow && Math.abs(numberIndex - emptyIndex) === 1) || (isSameColumn && Math.abs(numberIndex - emptyIndex) === rowSize);
  };

  isSolved = (board) => {
    for (let i = 0; i < board.length - 1; i++) {
      if (board[i] !== i + 1) {
        return false;
      }
    }

    if (board[15] === 0) {
      this.setState({ roundEndTime: Date.now() });
    }

    return true;
  };

  render() {
    const { board, timer, moves, roundStartTime, roundEndTime } = this.state;
    const elapsedTime = roundEndTime && roundStartTime ? (roundEndTime - roundStartTime) / 1000 : 0;

    return (
      <div className='row'>
        <div className='game'>
          <div className='header'><h3>15 Puzzle Picture</h3></div>

          <div className='counter'>
            <div>Time: {timer}s</div>
            <div> Moves: {moves}</div>
          </div>

          <div className="puzzle-board">

            {board.map((number, index) => (

              <div key={number} className={`puzzle-piece ${number === 0 ? 'empty' : ''}`} onClick={() => this.handleClick(number)}>

                {number === 0 ? (
                  <img src={emptyImage} alt="Empty" style={{ width: '100%', height: '100%' }} />

                ) : (
                  <img
                    src={

                      number === 1 ? one : number === 2 ? two : number === 3 ? three :
                        number === 4 ? four : number === 5 ? five : number === 6 ? six
                          : number === 7 ? seven : number === 8 ? eight : number === 9 ? nine :
                            number === 10 ? ten : number === 11 ? eleven : number === 12 ? twelve
                              : number === 13 ? thirteen : number === 14 ? fourteen : number === 15 ? fifteen : null

                    }
                    alt={`Image ${number}`}
                    style={{ width: '100%', height: '100%' }}
                  />
                )}
              </div>
            ))}
          </div>
          <div className='title'>
            <button className='new_round' onClick={this.startNewRound}>Start New Round</button>
            <button className='new_round' onClick={this.winRound}>Win Round</button>
          </div>

        </div>
        <div className='stat'>

          {roundStartTime && roundEndTime && (
            <b><p>Round Time: {elapsedTime.toFixed(2)} seconds</p></b>
          )}

          {time_stat.map((time, index) => (
            <div key={index}
            ><p>Round: {index + 1} Time: {time} S</p>
            </div>
          ))}
        </div>


      </div>

    );
  }
}

export default Puzzlepicture;
