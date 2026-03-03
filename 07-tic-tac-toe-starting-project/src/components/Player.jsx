import { useState } from "react";
export default function Player({initialName, symbol, isActive, onChangeName}){
 //managing playner name state
 const[playerName, setPlayerName] = useState(initialName);
   //managing button state
   const [isEditing , setISEditing] = useState(false);
   
   //function to handle button clicked 
   //change isEditig to true
   //show input element if isEditing true
   //using arrow function recommeded to update state
   function handleEditClick(){
    setISEditing((editing) => !editing);
    if(isEditing){
     onChangeName(symbol, playerName);
   }
  }
   function handleNameChange(event){
    console.log(event);
    setPlayerName(event.target.value);
   }


   //show<span> only when isEditing false
   //also using 2 way binding to make the player name editable
   //we are getting value back from the input and also feeding it back
   let editPlayerName = <span className ='player-name'>{playerName}</span> ;
   let btnCaption = 'Edit';
   if(isEditing){
    editPlayerName = (<input type='text' required  value={playerName} onChange={handleNameChange}/>
   );
   // btnCaption="Save";
   }

    return (
        //player  template    
        <li className={isActive ? 'active' : undefined}>
          <span className="player">
          {editPlayerName}
          <span className ='player-symbol'>{symbol}</span> 
          </span>
          <button onClick={handleEditClick}>{isEditing ? 'Save' : 'Edit'}</button>
          </li>
          
          );
}