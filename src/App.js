import React, { useState } from 'react'
import BreakLength from './BreakLength'
import SessionLength from './SessionLength'
import Timer from './Timer'

function App () {
  const [timer, setTimer] = useState({
    breakTime: 5,
    sessionTime: 25
  })

  const [sessionTime, setSessionTime] = useState(25)
  const [breakTime, setBreakTime] = useState(5)
  const [isBreak, setIsBreak] = useState(false)
  const countDownDeadline = isBreak ? breakTime * 60 : sessionTime * 60
  const [totalTime, setTotalTime] = useState(countDownDeadline)
  console.log(`sessionTime: ${sessionTime}`)
  console.log(`totalTime: ${totalTime / 60}`)
  console.log(isBreak)
  console.log(`breakTime: ${breakTime}`)

  return (
    <div className="app">
      <h1>25 + 5 clock</h1>
      <div className='length-container'>
        <BreakLength
          timer={timer}
          setTimer={setTimer}
          breakTime={breakTime}
          setBreakTime={setBreakTime}
          isBreak={isBreak}
          setTotalTime={setTotalTime}
        />
        <SessionLength
          timer={timer}
          setTimer={setTimer}
          setTotalTime={setTotalTime}
          sessionTime={sessionTime}
          setSessionTime={setSessionTime}
          isBreak={isBreak}
          setIsBreak={setIsBreak}
        />
      </div>
      <Timer
        timer={timer}
        setTimer={setTimer}
        totalTime={totalTime}
        setTotalTime={setTotalTime}
        sessionTime={sessionTime}
        setSessionTime={setSessionTime}
        setIsBreak={setIsBreak}
        isBreak={isBreak}
      />
      <div className='footer'>
        <p className='coded-by'>Designed and coded by</p>
        <p>Smith Ringtho</p>
      </div>
    </div>
  )
}

export default App
