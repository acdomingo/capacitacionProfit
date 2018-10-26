import React from 'react';
import ReactDOM from 'react-dom';
import { Label, Icon, Header, Segment, Button, List } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.css';
import './index.css';



function Square(props) {
      return (
        <button className="square" onClick= {props.onClick} >
          {props.boardIcon}
        </button>
      );
}
  
  class Board extends React.Component {
    renderSquare(i) {
      return <Square 
      value = {this.props.squares[i]}
      onClick = {() => this.props.onClick(i)}
      boardIcon = {this.props.boardIcons[i]}
       />;
    }
    render() {
      return (
        <div>
          <div className="board-row">
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
          </div>
          <div className="board-row">
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
          </div>
          <div className="board-row">
            {this.renderSquare(6)}
            {this.renderSquare(7)}
            {this.renderSquare(8)}
          </div>
        </div>
      );
    }
  }
  
  class Game extends React.Component {
    constructor (props) {
      super(props);
      this.state = {
        history: [{
        squares: Array(9).fill(null),
        boardIcons: Array(9).fill(null),
        playerIconH: null,
        }],
        stepNumber: 0,
        xIsNext : true,
      }
    }

    handleClick(i) {
      const history = this.state.history.slice(0, this.state.stepNumber + 1);
      const current = history[history.length - 1];
      const squares = current.squares.slice();
      const boardIcons = current.boardIcons.slice();
      let playerIconH = null;

      if (calculateWinner(squares) || squares[i]) {
        return;
      }

     

      squares[i] = this.state.xIsNext? 'X' : 'O';
      boardIcons[i] = setIcon(i, squares);
      playerIconH = this.playerIcon();

      this.setState({
        history: history.concat([{
          squares: squares,
          boardIcons: boardIcons,
          playerIconH: playerIconH,
        }]),
        xIsNext: !this.state.xIsNext,
        stepNumber: history.length,
      });
    }
    jumpTo(step) {
      this.setState( {
        stepNumber: step, 
        xIsNext: (step % 2) === 0,
      })
    }
    playerIcon() {
      if (this.state.xIsNext) { 
        return ( <Label image> <img src='https://react.semantic-ui.com/images/avatar/small/elliot.jpg' alt='cruz'/> Juan
        </Label>);
      } else {
        return ( <Label image> <img src='https://react.semantic-ui.com/images/avatar/small/zoe.jpg' alt='circulo' /> Ana
        </Label>);
      }
    }
    render() {
      const history = this.state.history;
      const current = history[this.state.stepNumber];
      const winner = calculateWinner (current.squares);
      

      const moves = history.map((step, move) => {
        const desc = move ?
        'Go to ' + move :
        'Game Start';
        return (
          <li key={move}>
            <Button.Group>
              <List.Item>
                <Button onClick={() => this.jumpTo(move)}> {history[[move]].playerIconH}{desc} </Button>
              </List.Item>
            </Button.Group>
          </li>
            );
      });

      let status;
      if (winner) {
        status =  <> {winner} </>;
      } else {
        status = <> Next player: {this.playerIcon()} </>;
      }

      return (
        <div className="game">
          <div>
            <Segment padded='very'>
              <Header as='h2' className='header' color='blue' textAlign='center'>
                <Header.Content>
                  <Icon name='bomb' color='teal' />
                  TA TE TI
                  <Header.Subheader>Aprendiendo un poco de React</Header.Subheader>
                </Header.Content>
             </Header>
            </Segment>
          </div>
          <br/>
          <div className="game-board" >
            <Board
              squares = {current.squares}
              onClick = {(i) => this.handleClick(i)} 
              boardIcons = {current.boardIcons} />
          </div>
          <br/>
          <br/>
          <div className="game-info">
            <div>
              <Segment textAlign='center'>{status}</Segment>
            </div>
            <List selection ordered>
              {moves}
            </List> 
          </div>
        </div>
      );
    }
  }
  
  // ========================================
  
  ReactDOM.render(
    <Game />,
    document.getElementById('root')
  );

  function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return (
          squares[a] === 'X'? 
            <Label image color='red'><img src='https://react.semantic-ui.com/images/avatar/small/elliot.jpg' alt='Juan'/> Es el ganador!! <Icon name='smile' /> </Label>
            :
            <Label image color='red'> <img src='https://react.semantic-ui.com/images/avatar/small/zoe.jpg' alt='Ana'/> Es la ganadora!! <Icon name='smile' /> </Label>
        );
      }
    }
    return null;
  }

  function setIcon(i, squares) {
    return (
      squares[i] === 'X'?
        <Icon name='times circle outline' color='blue' />
        :
        <Icon name='circle outline' color='orange' />
    );
  }