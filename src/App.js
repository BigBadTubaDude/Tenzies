import logo from './logo.svg';
import './App.css';
import Dice from './Dice.js'
import TopOfScreen from './TopOfScreen.js';
import React from 'react';
import {nanoid} from "nanoid"



function App() {
  const [dice, setDice] = React.useState(
    [1,1,1,1,1,1,1,1,1,1]
  )
  const [frozenArray, setFrozenArray] = React.useState(
    [false, false, false, false, false, false, false, false, false, false]
  )
  const [idArray, setIdArray] = React.useState( () => {
    var array = [];
    for (var i = 0; i < 10; i++) {
      array.push(nanoid());
    }
    return array;
  }
  )

  React.useEffect( () => {
    var initialDiceArray = [1,1,1,1,1,1,1,1,1,1];
    setAllDice();
  }, []
  )
  React.useEffect(() => {
    if (!frozenArray.includes(false)) {
      console.log("yes")
    }
  },[frozenArray])
  function setAllDice() {
    setDice(oldDice => {
      var newArray = [...oldDice];
      for (var i = 0; i < oldDice.length; i++) {
        if (!frozenArray[i]) {
          newArray[i] = Math.floor(Math.random() * 6) + 1;
        }
      } 
      return newArray;
    })
  }

const diceHolder = 
    dice.map((die, index) => {
      return (
        <Dice 
          key={idArray[index]}
          id={idArray[index]}
          indexNum={index}
          rollNumber={die}
          isFrozen={frozenArray[index]}
          handleClick={setFreeze}
        />
      )
    })
  function setFreeze(event, idNum) {
      // console.log(idArray.indexOf(idNum))
      setFrozenArray( oldFrozenArray => {
        var newArray = [...oldFrozenArray];
        newArray[idArray.indexOf(idNum)] = !newArray[idArray.indexOf(idNum)]
        return newArray;
      })

      // setFrozenArray( oldDice => oldDice.map( die => {
        
      // }))
    }
  
  return (
    <div className="App">
      <div className='actionPanel'>
        <TopOfScreen />
        <section className='diceHolder'>
          {diceHolder}
          <button className='rollButton' onClick={setAllDice}>Roll</button>
        </section>
        
      </div>
    </div>
  );
}

export default App;
