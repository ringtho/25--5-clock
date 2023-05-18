import React, { useRef, useState } from 'react'
import PropTypes from 'prop-types'
import alarm from './media/beep.wav'

const Timer = ({ timer, setTimer }) => {
  const [clock, setClock] = useState()
  const [pausedTime, setPausedTime] = useState()
  const audioEl = useRef()

  const start = () => {
    if (timer.isTimerOn) {
      setTimer(prev => {
        let isBreak
        if (timer.isBreak) {
          isBreak = true
        } else {
          isBreak = false
        }
        return { ...prev, isTimerOn: true, isBreak }
      })
    } else {
      setTimer(prev => ({
        ...prev,
        isTimerOn: true
      }))
    }
    const currentTime = Date.now()
    let time
    if (timer.isPaused) {
      const pausedMins = pausedTime.mins * 60 * 1000
      const pausedSecs = pausedTime.secs * 1000
      time = pausedMins + pausedSecs + currentTime
      setTimer(prev => ({ ...prev, isPaused: false }))
    } else {
      const setTime = timer.sessionTime * 60 * 1000
      time = currentTime + setTime
    }
    const clock = setInterval(() => {
      const secondsLeft = Math.round((time - Date.now()) / 1000)
      console.log(secondsLeft)
      if (secondsLeft <= 4) {
        audioEl.current.play()
      }
      if (secondsLeft < 1) {
        console.log('Transitioning to Break....')
        clearInterval(clock)
        breakFn()
      }
      getDisplayFormat(secondsLeft)
    }, 1000)
    setClock(clock)
  }

  const breakFn = () => {
    if (!timer.isTimerOn) {
      setTimer(prev => {
        return {
          ...prev,
          isTimerOn: true,
          isBreak: true,
          mins: prev.breakTime,
          secs: '00'
        }
      })
    }
    const currentTime = Date.now()
    const setTime = timer.breakTime * 60 * 1000
    const time = currentTime + setTime
    const clock = setInterval(() => {
      const secondsLeft = Math.round((time - Date.now()) / 1000)
      if (secondsLeft <= 4) {
        audioEl.current.play()
      }
      if (secondsLeft < 1) {
        clearInterval(clock)
        console.log('Transitioning to Session.....')
        setTimer(prev => ({ ...prev, isBreak: false }))
        start()
      }
      getDisplayFormat(secondsLeft)
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
    let mins = Math.floor(seconds / 60)
    let secs = Math.floor(seconds % 60)
    if (mins < 10) {
      mins = `0${mins}`
    }
    if (secs < 10) {
      secs = `0${secs}`
    }
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
        <h4 id='timer-label'>{ timer.isBreak ? 'Break Time' : 'Session'}</h4>
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
      src={alarm}>
    </audio>
    </>
  )
}

Timer.propTypes = {
  timer: PropTypes.object,
  setTimer: PropTypes.func
}

export default Timer
