import React, { useState } from 'react'

export default function Player({ name, symbol , isActive, onPlayerUpdate}) {
    const [isEditing,setIsEditing] = useState(false);
    const [playerName,setPlayerName] = useState(name)

  function handleEditing(){
    setIsEditing(!isEditing)
    onPlayerUpdate(symbol,playerName);
  }

  function handlePlayerNameChange(event){
    setPlayerName(event.target.value)
  }

  let editableplayerName = <span className="player-name">{playerName}</span>
  let btnCaption = "Edit"
  if(isEditing){
    editableplayerName = <input type='text'  value={playerName} onChange={handlePlayerNameChange}/>
    btnCaption='Save';
  } 
  

    return (
        <li className={isActive? 'active' : undefined}>
            <span className='player'>
                {editableplayerName}
                <span className="player-symbol">{symbol}</span>
            </span>
            <button onClick={handleEditing}>{btnCaption}</button>
        </li>
    )
}
