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
