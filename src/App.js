import React, { useState } from 'react'
import BreakLength from './components/BreakLength'
import SessionLength from './components/SessionLength'
import Timer from './components/Timer'

function App () {
  const [timer, setTimer] = useState({
    breakTime: 5,
    sessionTime: 25,
    isTimerOn: false,
    isBreak: false,
    isPaused: false,
    mins: '25',
    secs: '00'
  })
  console.log(`breakTime: ${timer.breakTime}`)
  console.log(`sessionTime: ${timer.sessionTime}`)
  console.log(`isBreak?: ${timer.isBreak}`)
  console.log(`isPaused?: ${timer.isPaused}`)
  console.log(`Time: ${timer.mins}:${timer.secs}`)
  console.log(typeof timer.mins, typeof timer.secs)
  console.log(`isTimerOn: ${timer.isTimerOn}`)

  return (
    <div className="app">
      <h1>25 + 5 clock</h1>
      <div className='length-container'>
        <BreakLength
          timer={timer}
          setTimer={setTimer}
        />
        <SessionLength
          timer={timer}
          setTimer={setTimer}
        />
      </div>
      <Timer
        timer={timer}
        setTimer={setTimer}
      />
      <div className='footer'>
        <p className='coded-by'>Designed and coded by</p>
        <p>Smith Ringtho</p>
      </div>
    </div>
  )
}

export default App
