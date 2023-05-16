import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

const Timer = ({ timer, setTimer, totalTime, setTotalTime, setIsBreak, isBreak }) => {
  const [display, setDisplay] = useState(`${totalTime / 60}:00`)
  const [secsFromInitialStart, setSecsFromInitialStart] = useState(0)
  const [clock, setClock] = useState()
  const [clockPaused, setClockPaused] = useState(false)
  const [play, setPlay] = useState(false)

  const startClockFn = () => {
    setPlay(true)
    const start = new Date()
    let secsFromLastPaused = 0
    if (clockPaused) {
      secsFromLastPaused += secsFromInitialStart
      setClockPaused(false)
    }
    setClock(setInterval(() => {
      let current
      current = Number(((new Date() - start) / 1000).toFixed())
      current += secsFromLastPaused
      setSecsFromInitialStart(current)
      current = totalTime - current
      const mins = (current / 60).toString().split('.')[0].padStart(2, '0')
      const secs = (current % 60).toString().padStart(2, '0')
      setDisplay(`${mins}:${secs}`)
    }, 1000))
  }
  useEffect(() => {
    if (Number(secsFromInitialStart) === Number(totalTime)) {
      clearInterval(clock)
      setIsBreak(prev => !prev)
      startClockFn()
    }
  }, [secsFromInitialStart])

  const stopClockFn = () => {
    clearInterval(clock)
    setTimer({
      breakTime: 5,
      sessionTime: 25
    })
    setPlay(false)
    setTotalTime(timer.sessionTime * 60)
    setDisplay(`${totalTime / 60}:00`)
    setIsBreak(false)
  }
  const pauseClockFn = () => {
    setClockPaused(true)
    clearInterval(clock)
    setPlay(false)
  }
  return (
    <>
    <div className='timer'>
        <h4 id='timer-label'>{ isBreak ? 'Break Time' : 'Session'}</h4>
        <p id='time-left'>
          {/* {display } */}
          {!play && !clockPaused ? `${totalTime / 60}:00` : display }
        </p>
    </div>
    <div className='timer-control'>
    <div className='pause-play'>
        {
        play
          ? <i className='fa fa-pause' id='start_stop' onClick={pauseClockFn}></i>
          : <i className='fa fa-play' id='start_stop' onClick={startClockFn}></i>
        }
    </div>
    <div className='refresh'>
        <i className='fa fa-refresh' id='reset' onClick={stopClockFn}></i>
    </div>
    </div>
    <audio
      id='beep'
      preload='auto'
      src='https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav'>
    </audio>
    </>
  )
}

Timer.propTypes = {
  timer: PropTypes.object,
  totalTime: PropTypes.number,
  setTimer: PropTypes.func,
  setTotalTime: PropTypes.func,
  setIsBreak: PropTypes.func,
  isBreak: PropTypes.bool
}

export default Timer
