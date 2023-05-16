import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

const Timer = ({ timer, setTimer, totalTime, setTotalTime }) => {
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
      stopClockFn()
    }
  }, [secsFromInitialStart])

  const stopClockFn = () => {
    clearInterval(clock)
    setTimer({
      breakTime: 5,
      sessionTime: 25
    })
    setClockPaused(false)
    setPlay(false)
    setTotalTime(timer.sessionTime * 60)
  }
  const pauseClockFn = () => {
    setClockPaused(true)
    clearInterval(clock)
    setPlay(false)
    console.log(`Pause Clock: ${clock}`)
  }
  console.log(`Normal Clock: ${clock}`)
  return (
    <>
    <div className='timer'>
        <h4 id='timer-label'>Session</h4>
        <p id='time-left'>
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
    </>
  )
}

Timer.propTypes = {
  timer: PropTypes.object,
  totalTime: PropTypes.number,
  setTimer: PropTypes.func,
  setTotalTime: PropTypes.func
}

export default Timer
