
export default function GameBoard({onSelectSquare, board}){
  //cmmting out the gameBoard state and replace with the gameTurn state
    // const[gameBoard, setGameBoard] = useState(initialGameBoard);
   
    //  function handleSelectSqaure(rowIndex , colIndex){
    //     setGameBoard((prevGameBoard) => {
    //         const updateBoard = [...prevGameBoard.map(innerAray => [...innerAray])];
    //        updateBoard[rowIndex][colIndex] = activePlayerSymbol;
    //        return updateBoard;
    //     });
    //     onSelectSquare();
    //  }

    return (
    <ol id ='game-board'>
{board.map((row, rowIndex) => (
    <li key={rowIndex}>
    <ol>
        {row.map((playerSymbol, colIndex) =>( 
            <li key={colIndex}>
                <button onClick={()=> onSelectSquare(rowIndex, colIndex)} disabled={playerSymbol !== null}>
                    {playerSymbol}</button>
                </li>
            ))}
    </ol>
</li>
))}
</ol>
);
}