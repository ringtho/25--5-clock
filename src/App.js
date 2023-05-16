import React, { useState } from 'react'
import BreakLength from './BreakLength'
import SessionLength from './SessionLength'
import Timer from './Timer'

function App () {
  const [timer, setTimer] = useState({
    breakTime: 5,
    sessionTime: 25
  })

  const countDownDeadline = timer.sessionTime * 60
  const [totalTime, setTotalTime] = useState(countDownDeadline)

  return (
    <div className="app">
      <h1>25 + 5 clock</h1>
      <div className='length-container'>
        <BreakLength timer={timer} setTimer={setTimer} />
        <SessionLength timer={timer} setTimer={setTimer} setTotalTime={setTotalTime} />
      </div>
      <Timer
        timer={timer}
        setTimer={setTimer}
        totalTime={totalTime}
        setTotalTime={setTotalTime}
      />
      <div className='footer'>
        <p className='coded-by'>Designed and coded by</p>
        <p>Smith Ringtho</p>
      </div>
    </div>
  )
}

export default App
