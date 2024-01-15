import React, { useState } from 'react'

const initalBoard = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
]



export default function GameBoard({ onSquareSelect, turn }) {
    let gameBoard = [...initalBoard.map(val=>[...val])];
    for (let i in turn) {
        const { square, player } = turn[i]
        const { row, col } = square;
        gameBoard[row][col] = player
    }
    // const [gameBoard,setGameBoard] = useState(initalBoard);

    // function handleGameBoardUpdate(row,col){
    //     setGameBoard((prvBoard=>{
    //         const updateBoard = [...prvBoard]
    //         updateBoard[row][col] = activePlayerSymbol
    //         return updateBoard
    //     }))
    //     onSquareSelect()
    // }

    return (
        <>
            <ol id='game-board'>
                {gameBoard.map((row, rowIndex) => (
                    <li key={rowIndex}>
                        <ol>
                            {row.map((playerSymbol, colIndex) => (<button onClick={() => onSquareSelect(rowIndex,colIndex,gameBoard)} key={colIndex} disabled={playerSymbol != null}>{playerSymbol}</button>))}
                        </ol>
                    </li>
                ))}
            </ol>
        </>
    )
}
