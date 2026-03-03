import Player from "./components/Player"
import GameBoard from "./components/GameBoard"
import { useState } from "react"
import Log from './components/Log';
import { WINNING_COMBINATIONS } from "./winning-combinations";
import GameOver  from "./components/GameOver";

const PLAYERS =
  {
    'X': 'Player 1',
    'O': 'Player 2'
  };

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null], 
];

function derivedActivePlayer(gameTurns){  
//adding derived state instead of dedicated active player state : line 19
let currPlayer ='X';

if(gameTurns.length >0 && gameTurns[0].player ==='X'){
  currPlayer ='O';
}
return currPlayer;
}

function deriveGameBoard(gameTurns){
   //deriving gameboard state from turns array 
      //creating a deep copy for rematch button 
      let gameBoard = [...initialGameBoard.map(array => [...array])];
      //chcking turns if turns is not empty then override it with intialgameboard
      for(const turn of gameTurns){
       const {square, player} = turn;
       const {row , col} = square;
  
       gameBoard[row][col] = player;
      } 
      return gameBoard;
}

function dervieWinner(gameBoard , players){
  
  let winner ;

  for(const combination of WINNING_COMBINATIONS){
   const firstSquareSymbol  = gameBoard[combination[0].row] [combination[0].column];
   const secondSquareSymbol = gameBoard[combination[1].row] [combination[1].column];
   const thirdSquareSymbol  = gameBoard[combination[2].row] [combination[2].column];
 
   if(firstSquareSymbol && 
     firstSquareSymbol === secondSquareSymbol && 
     firstSquareSymbol === thirdSquareSymbol)
  {
  winner = players[firstSquareSymbol];
  }
 }

 return winner;
}

function App() {
  //new state for player name 
  const[players, setPlayers] = useState (PLAYERS);
//lifting tge state up - lift the state up to the closest ancestor component 
//that has access to all components that need to work with the state for player component
//adding the gameturn state 
const[gameTurns , setGameTurns] = useState([]);
//const [activePlayer, setActivePlayer] = useState('X');  
  const activePlayer = derivedActivePlayer(gameTurns); 
  const gameBoard = deriveGameBoard(gameTurns);

const winner = dervieWinner(gameBoard, players);

const draw = gameTurns.length === 9 && !winner;


function handleSelectedSquare(rowIndex, colIndex){
 // setActivePlayer((currActivePlayer) => currActivePlayer === 'X' ? 'O' : 'X');
  setGameTurns(prevTurns =>{
   const currPlayer = derivedActivePlayer(prevTurns);
    const updatedTurns = [
      {square:{row: rowIndex, col: colIndex} , player: currPlayer},
      ...prevTurns,
    ];   
    return updatedTurns;       
  });
}

//restarting the game simply means we reset game turns to an empty array 
//and all the rest will auto adjust bcuz of the state 
function handleRematch(){
  setGameTurns([]);
}
 
function handlePlayerName(symbol, newName){
  setPlayers(prevPlayers => {
    return{
      ...prevPlayers, [symbol]:newName
    };
  });
}

//replaced with player template
//even thou both player compnent is same it does not effects the state of each other 
//added player hightlight css
//added handleSelectedSquare and active player symbol
  return (
  <main>
    <div id ='game-container'>
      <ol id ='players' className="highlight-player">
       <Player initialName={PLAYERS.X} symbol ='X' isActive={activePlayer === 'X'} onChangeName={handlePlayerName}/>
       <Player initialName={PLAYERS.O} symbol ='O' isActive={activePlayer === 'O'} onChangeName={handlePlayerName}/>
      </ol>
      {(winner || draw) && (
        <GameOver winner={winner}  onRematch={handleRematch}/>)}
      <GameBoard onSelectSquare={handleSelectedSquare} 
      board ={gameBoard}
      />
    </div>
    <Log turns={gameTurns} />
    </main>

  );
}

export default App
