import React, { useState } from 'react'
// import BreakLength from './BreakLength'
import SessionLength from './SessionLength'
import Timer from './Timer'

function App () {
  const [timer, setTimer] = useState({
    breakTime: 5,
    sessionTime: 25,
    isTimerOn: false,
    mins: '25',
    secs: '00'
  })

  return (
    <div className="app">
      <h1>25 + 5 clock</h1>
      <div className='length-container'>
        {/* <BreakLength /> */}
        <SessionLength
          timer={timer}
          setTimer={setTimer}
        />
      </div>
      <Timer
        timer={timer}
      />
      <div className='footer'>
        <p className='coded-by'>Designed and coded by</p>
        <p>Smith Ringtho</p>
      </div>
    </div>
  )
}

export default App
