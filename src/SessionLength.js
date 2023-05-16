import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'

const SessionLength = (props) => {
  const {
    timer,
    setTimer,
    setTotalTime,
    setSessionTime,
    sessionTime,
    isBreak
  } = props
  const sessionRef = useRef()

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

  useEffect(() => {
    setSessionTime(sessionRef.current?.innerText)
    if (!isBreak) {
      setTotalTime(sessionTime * 60)
    }
  })

  return (
    <div className='session-length'>
        <h3 id='session-label'>Session Length</h3>
        <div className='session-buttons'>
        <i
        className='fa fa-arrow-down'
        id='session-decrement'
        onClick={decrementSession}></i>
        <div id='session-length' ref={sessionRef}>
          {timer.sessionTime}
        </div>
        <i
        className='fa fa-arrow-up'
        id='session-increment'
        onClick={incrementSession}></i>
        </div>
    </div>
  )
}

SessionLength.propTypes = {
  timer: PropTypes.object,
  setTimer: PropTypes.func,
  setTotalTime: PropTypes.func,
  sessionTime: PropTypes.number,
  setSessionTime: PropTypes.func,
  isBreak: PropTypes.bool
}

export default SessionLength
