import { useState } from "react"
import GameBoard from "./components/GameBoard"
import Player from "./components/Player"
import Log from "./components/Log";
import GameOver from "./components/GameOver";

function derivedActivePlayer(gameTurn) {
  let currentPlayer = 'X';
  if (gameTurn.length > 0 && gameTurn[0].player == 'X') {
    currentPlayer = '0'
  }
  return currentPlayer
}

function declareForWinnning(gameBoard) {
  // itration on each row
  for (let row of gameBoard) {
    if (row[0] == null) {
      continue
    }
    let dummy = row[0]
    let count = 0
    for (let col of row) {
      if (dummy == col) {
        count++
      }
      else {
        break
      }
    }
    if (count == 3) {
      return dummy;
    }
  }

  // itration coulmn wise
  for (let i = 0; i < 3; i++) {
    let dummy = gameBoard[0][i]
    if (dummy == null) {
      continue
    }
    let count = 0
    for (let j = 0; j < 3; j++) {
      if (dummy == gameBoard[j][i]) {
        count++
      }
      else {
        break
      }
    }
    if (count == 3) {
      return dummy
    }
  }
  // diagonal itration 
  let dummy = gameBoard[0][0]
  let count = 0
  for (let i = 0; i < 3; i++) {
    if (dummy == gameBoard[i][i]) {
      count++
    }
  }
  if (count == 3) return dummy

  dummy = gameBoard[0][2]
  count = 0
  for (let i = 0; i < 3; i++) {
    if (dummy == gameBoard[i][2 - i]) {
      count++
    }
  }
  if (count == 3) {
    return dummy
  }
  return null
}



function App() {
  const [players,setPlayers] = useState({
    'X' : "Player1",
    '0' : 'Player2'
  })
  const [gameTurn, setGameTurn] = useState([]);
  // const [activePlayer, setActivePlayer] = useState('X')
  let activePlayer = derivedActivePlayer(gameTurn)

  function handleSelectSquare(rowIndex, colIndex, gameBoard) {
    // setActivePlayer((currentPlayer) => currentPlayer == "X" ? "0" : "X")
    setGameTurn((prevTurn) => {
      let currentPlayer = derivedActivePlayer(prevTurn)
      gameBoard[rowIndex][colIndex] = currentPlayer;
      console.log(gameBoard)
      let winner = declareForWinnning(gameBoard)
      if(winner){
        winner = players[winner]
      }
      let draw = false;
      if(prevTurn.length==8){
        draw = true 
      }
      return [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer, winner: winner,draw:draw },
        ...prevTurn
      ]
    })
  }
  function handleRestart(){
    setGameTurn([])
  }

  function handlePlayerUpdate(symbol,name){
    setPlayers((prvName)=>{
      return {
        ...prvName,
        [symbol] : name
      }
    })
  }


  return (
    <>
      <header>
        <img src="/game-logo.png" alt="tic-tac-toe" />
        <h1>Tic-Tac-TOE</h1>
      </header>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player name="Player1" symbol="X" isActive={activePlayer === "X"} onPlayerUpdate={handlePlayerUpdate}/>
          <Player name="Player2" symbol="0" isActive={activePlayer === "0"} onPlayerUpdate={handlePlayerUpdate}/>
        </ol>
        {gameTurn[0]?.winner && <GameOver winner={gameTurn[0]?.winner} onRestart={handleRestart}/>}
        {gameTurn[0]?.draw && <GameOver winner={false} onRestart={handleRestart}/>}
        <GameBoard onSquareSelect={handleSelectSquare} turn={gameTurn} />

      </div>
      <Log turns={gameTurn} />
    </>
  )
}

export default App
