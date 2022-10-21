import logo from './logo.svg';
import './App.css';
import Dice from './Dice.js'
import TopOfScreen from './TopOfScreen.js';
import React from 'react';
import {nanoid} from "nanoid"
import Conf from "./Confetti.js"


const allEqual = arr => arr.every(val => val === arr[0]);


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
  })
  const [tenziesWon, setTenziesWon] = React.useState(false);



  React.useEffect( () => {
    var initialDiceArray = [1,1,1,1,1,1,1,1,1,1];
    setAllDice();
  }, [])

  React.useEffect(() => {
    if (!frozenArray.includes(false) && allEqual(dice)) {
      setTenziesWon(true);
    } else setTenziesWon(false)
  },[frozenArray])

  function setAllDice() {
    setDice(oldDice => {
      var newArray = [...oldDice];
      for (var i = 0; i < oldDice.length; i++) {
        if (!frozenArray[i] || tenziesWon) {
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
      // console.log(!tenziesWon)
      if (!tenziesWon){
        setFrozenArray( oldFrozenArray => {
          var newArray = [...oldFrozenArray];
          newArray[idArray.indexOf(idNum)] = !newArray[idArray.indexOf(idNum)]
          return newArray;
        })
      }


      // setFrozenArray( oldDice => oldDice.map( die => {
        
      // }))
    }
    function resetGame() {
      setFrozenArray([false, false, false, false, false, false, false, false, false, false]);
      setTenziesWon(false);
      setAllDice();

    }
  
  return (
    <div className="App">
      {tenziesWon && <Conf width={window.innerWidth} height={window.innerHeight}/>}
      <div className='actionPanel'>
        <TopOfScreen />
        <section className='diceHolder'>
          {diceHolder}
          <button className='rollButton' onClick={tenziesWon ? resetGame : setAllDice}>{tenziesWon ? "New game" : "Roll"}</button>
        </section>
        
      </div>
    </div>
  );
}

export default App;
