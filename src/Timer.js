import React, { useRef, useState } from 'react'
import PropTypes from 'prop-types'

const Timer = ({ timer, setTimer }) => {
  const [isBreak] = useState(false)
  const audioEl = useRef()

  const [clock, setClock] = useState()
  const [pausedTime, setPausedTime] = useState()

  console.log(pausedTime)

  const start = () => {
    const currentTime = Date.now()
    let time
    if (timer.isPaused) {
      const pausedMins = pausedTime.mins * 60 * 1000
      const pausedSecs = pausedTime.secs * 1000
      time = pausedMins + pausedSecs + currentTime
      console.log(time)
    } else {
      const setTime = !isBreak
        ? timer.sessionTime * 60 * 1000
        : timer.breakTime * 60 * 1000
      time = currentTime + setTime
      console.log(time)
    }
    const clock = setInterval(() => {
      const secondsLeft = Math.round((time - Date.now()) / 1000)
      console.log(secondsLeft)
      if (secondsLeft === 3 && secondsLeft >= 0) {
        audioEl.current.play()
      } else if (secondsLeft < 0) {
        clearInterval(clock)
        // setTimer()
      }
      getDisplayFormat(secondsLeft)
      setTimer(prev => (
        {
          ...prev,
          isBreak: false,
          isTimerOn: true,
          isPaused: false
        }
      ))
    }, 1000)
    setClock(clock)
  }

  const pause = () => {
    clearInterval(clock)
    setPausedTime({ mins: timer.mins, secs: timer.secs })
    setTimer(prev => {
      return {
        ...prev,
        isTimerOn: false,
        isPaused: true
      }
    })
  }

  const reset = () => {
    clearInterval(clock)
    audioEl.current.pause()
    audioEl.current.currentTime = 0
    setTimer(prev => {
      return {
        ...prev,
        breakTime: 5,
        sessionTime: 25,
        isTimerOn: false,
        isBreak: false,
        isPaused: false,
        mins: '25',
        secs: '00'
      }
    })
  }

  const getDisplayFormat = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    setTimer(prev => {
      return {
        ...prev,
        mins,
        secs
      }
    })
  }

  return (
    <>
    <div className='timer'>
        <h4 id='timer-label'>{ isBreak ? 'Break Time' : 'Session'}</h4>
        <p id='time-left'>
          {timer.mins}:{timer.secs}
        </p>
    </div>
    <div className='timer-control'>
    <div className='pause-play'>
        {
        timer.isTimerOn
          ? <i className='fa fa-pause' id='start_stop' onClick={pause}></i>
          : <i className='fa fa-play' id='start_stop' onClick={start}></i>
        }
    </div>
    <div className='refresh'>
        <i className='fa fa-refresh' id='reset' onClick={reset}></i>
    </div>
    </div>
    <audio
      ref={audioEl}
      id='beep'
      preload='auto'
      src='https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav'>
    </audio>
    </>
  )
}

Timer.propTypes = {
  timer: PropTypes.object,
  setTimer: PropTypes.func
}

export default Timer
