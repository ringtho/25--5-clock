import React, { useRef, useState } from 'react'
import PropTypes from 'prop-types'

const Timer = ({ timer }) => {
  // const [display, setDisplay] = useState(`${totalTime / 60}:00`)
  // const [secsFromInitialStart, setSecsFromInitialStart] = useState(0)
  // const [clock, setClock] = useState()
  // const [clockPaused, setClockPaused] = useState(false)

  const [isBreak] = useState(false)
  const audioEl = useRef()

  // const startClockFn = () => {
  //   setPlay(true)
  //   const start = new Date()
  //   let secsFromLastPaused = 0
  //   if (clockPaused) {
  //     secsFromLastPaused += secsFromInitialStart
  //     setClockPaused(false)
  //   }
  //   setClock(setInterval(() => {
  //     let current
  //     current = Number(((new Date() - start) / 1000).toFixed())
  //     current += secsFromLastPaused
  //     setSecsFromInitialStart(current)
  //     current = totalTime - current
  //     const mins = (current / 60).toString().split('.')[0].padStart(2, '0')
  //     const secs = (current % 60).toString().padStart(2, '0')
  //     setDisplay(`${mins}:${secs}`)
  //   }, 1000))
  //   audioEl.current.play()
  // }
  // useEffect(() => {
  //   if (Number(secsFromInitialStart) === Number(totalTime)) {
  //     clearInterval(clock)
  //     setIsBreak(prev => !prev)
  //     startClockFn()
  //   }
  // }, [secsFromInitialStart])

  // const stopClockFn = () => {
  //   clearInterval(clock)
  //   setTimer({
  //     breakTime: 5,
  //     sessionTime: 25
  //   })
  //   setPlay(false)
  //   setTotalTime(timer.sessionTime * 60)
  //   setDisplay(`${totalTime / 60}:00`)
  //   setIsBreak(false)
  //   audioEl.current.pause()
  //   audioEl.current.currentTime = 0
  // }
  // const pauseClockFn = () => {
  //   setClockPaused(true)
  //   clearInterval(clock)
  //   setPlay(false)
  // }
  // const [secondsLeft, setSecondsLeft] = useState(timer.sessionTime * 60)
  const [clock, setClock] = useState()

  const start = () => {
    const currentTime = Date.now()
    const setTime = timer.sessionTime * 60 * 1000
    const time = currentTime + setTime
    const clock = setInterval(() => {
      const secondsLeft = Math.round((time - Date.now()) / 1000)
      console.log(secondsLeft)
      if (secondsLeft === 3 && secondsLeft >= 0) {
        audioEl.current.play()
      } else if (secondsLeft === 0) {
        clearInterval(clock)
      }
    }, 1000)
    setClock(clock)
  }

  // useEffect(() => {
  //   if (secondsLeft === 0) {
  //     clearInterval(clock)
  //   }
  // }, [secondsLeft, clock])
  // useEffect(() => {
  //   return () => clearInterval(clock)
  // }, [clock])
  // console.log(secondsLeft)

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
          ? <i className='fa fa-pause' id='start_stop'></i>
          : <i className='fa fa-play' id='start_stop' onClick={start}></i>
        }
    </div>
    <div className='refresh'>
        <i className='fa fa-refresh' id='reset'></i>
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
  timer: PropTypes.object
}

export default Timer
