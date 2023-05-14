import React, { useState } from 'react'
import { useCountdown } from './hooks/useCountdown'

function App () {
  const [play, setPlay] = useState(false)
  const [timer, setTimer] = useState({
    breakTime: 5,
    sessionTime: 25,
    minutes: 0,
    seconds: 0
  })

  const decrementBreak = () => {
    setTimer(prev => {
      if (prev.breakTime > 1 && prev.breakTime <= 60) {
        return {
          ...prev, breakTime: prev.breakTime - 1
        }
      } else {
        return prev
      }
    })
  }

  const decrementSession = () => {
    setTimer(prev => {
      if (prev.sessionTime > 1 && prev.breakTime <= 60) {
        return {
          ...prev, sessionTime: prev.sessionTime - 1
        }
      } else {
        return prev
      }
    })
  }

  const incrementSession = () => {
    setTimer(prev => {
      if (prev.sessionTime > 0 && prev.sessionTime < 60) {
        return {
          ...prev, sessionTime: prev.sessionTime + 1
        }
      } else {
        return prev
      }
    })
  }

  const incrementBreak = () => {
    setTimer(prev => {
      if (prev.breakTime > 0 && prev.breakTime < 60) {
        return {
          ...prev, breakTime: prev.breakTime + 1
        }
      } else {
        return prev
      }
    })
  }

  const NOW_IN_MS = new Date().getTime()
  const SET_TIME = timer.sessionTime * 60 * 1000
  const TARGET_TIME = NOW_IN_MS + SET_TIME

  const [minutes, seconds] = useCountdown(TARGET_TIME)

  const startTimer = () => {
    console.log(minutes)
    setPlay(true)
    setTimer(prev => (
      { ...prev, minutes, seconds }
    ))
  }

  return (
    <div className="app">
      <h1>25 + 5 clock</h1>
      <div className='length-container'>
        <div className='break-length'>
          <h3 id='break-label'>Break Length</h3>
          <div className='break-buttons'>
            <i
            className='fa fa-arrow-down'
            id='break-decrement'
            onClick={decrementBreak}></i>
            <div id='break-length'>{timer.breakTime}</div>
            <i
            className='fa fa-arrow-up'
            id='break-increment'
            onClick={incrementBreak}></i>
          </div>
        </div>
        <div className='session-length'>
          <h3 id='session-label'>Session Length</h3>
          <div className='session-buttons'>
            <i
            className='fa fa-arrow-down'
            id='session-decrement'
            onClick={decrementSession}></i>
            <div id='session-length'>{timer.sessionTime}</div>
            <i
            className='fa fa-arrow-up'
            id='session-increment'
            onClick={incrementSession}></i>
          </div>
        </div>
      </div>
      <div className='timer'>
        <h4 id='timer-label'>Session</h4>
        <p id='time-left'>{!play ? `${timer.sessionTime}: 00` : `${timer.minutes}m : ${timer.seconds}s`}</p>
      </div>
      <div className='timer-control'>
        <div className='pause-play'>
          {
            play
              ? <i className='fa fa-pause' id='start-stop' onClick={() => setPlay(false)}></i>
              : <i className='fa fa-play' id='start-stop' onClick={() => setPlay(false)}></i>
          }
        </div>
        <div className='refresh'>
          <i className='fa fa-refresh' id='reset'></i>
        </div>
      </div>
      <div className='footer'>
        <p className='coded-by'>Designed and coded by</p>
        <p>Smith Ringtho</p>
      </div>
    </div>
  )
}

export default App
