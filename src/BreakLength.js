import React, { useRef, useEffect } from 'react'
import PropTypes from 'prop-types'

const BreakLength = (props) => {
  const {
    timer,
    setTimer,
    isBreak,
    setBreakTime,
    breakTime,
    setTotalTime
  } = props
  const breakRef = useRef()

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

  useEffect(() => {
    setBreakTime(breakRef.current?.innerText)
    if (isBreak) {
      setTotalTime(breakTime * 60)
    }
  })

  return (
        <div className='break-length'>
            <h3 id='break-label'>Break Length</h3>
            <div className='break-buttons'>
            <i
            className='fa fa-arrow-down'
            id='break-decrement'
            onClick={decrementBreak}></i>
            <div id='break-length' ref={breakRef}>{timer.breakTime}</div>
            <i
            className='fa fa-arrow-up'
            id='break-increment'
            onClick={incrementBreak}></i>
            </div>
        </div>
  )
}

BreakLength.propTypes = {
  timer: PropTypes.object,
  setTimer: PropTypes.func,
  isBreak: PropTypes.bool,
  setBreakTime: PropTypes.func,
  breakTime: PropTypes.number,
  setTotalTime: PropTypes.any
}

export default BreakLength
