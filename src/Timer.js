import React, { useRef, useState } from 'react'
import PropTypes from 'prop-types'
import CircularProgress from '@mui/joy/CircularProgress'
import alarm from './media/beep.wav'

const Timer = ({ timer, setTimer }) => {
  const [clock, setClock] = useState()
  const [pausedTime, setPausedTime] = useState()
  const [seconds, setSeconds] = useState(0)
  const [maxTime, setMaxTime] = useState(100)
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
      setMaxTime(timer.sessionTime * 60)
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
      let sessionTime
      if (timer.sessionTime < 1) {
        sessionTime = 1
      } else if (sessionTime > 60) {
        sessionTime = 60
      } else {
        sessionTime = timer.sessionTime
      }
      const setTime = sessionTime * 60 * 1000
      time = currentTime + setTime
    }
    const clock = setInterval(() => {
      const secondsLeft = Math.round((time - Date.now()) / 1000)
      setSeconds(secondsLeft)
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
      setMaxTime(timer.breakTime * 60)
    }
    const currentTime = Date.now()
    let breakTime
    if (timer.breakTime < 1) {
      breakTime = 1
    } else if (timer.breakTime > 60) {
      breakTime = 60
    } else {
      breakTime = timer.breakTime
    }
    const setTime = breakTime * 60 * 1000
    const time = currentTime + setTime
    const clock = setInterval(() => {
      const secondsLeft = Math.round((time - Date.now()) / 1000)
      setSeconds(secondsLeft)
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
    setSeconds(0)
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

  const MIN = 0
  const MAX = maxTime
  console.log(seconds)
  const normalise = (value) => ((value - MIN) * 100) / (MAX - MIN)
  const progress = normalise(seconds)
  console.log(MAX)

  return (
    <>
    <CircularProgress
      determinate
      value={progress}
      color='primary'
      sx={{
        '--CircularProgress-size': '400px',
        '--CircularProgress-trackThickness': '17px',
        '--CircularProgress-progressThickness': '7px'
      }}
      thickness={2}
    >
      <div className=''>
        <h4 id='timer-label'>{ timer.isBreak ? 'Break Time' : 'Session'}</h4>
        <p id='time-left'>
          {timer.mins}:{timer.secs}
        </p>
      </div>
    </CircularProgress>
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
