import React from 'react'
import PropTypes from 'prop-types'

const SessionLength = ({ timer, setTimer }) => {
  const increment = () => {
    if (timer.sessionTime < 60 && !timer.isTimerOn) {
      setTimer(prev => {
        return {
          ...prev,
          sessionTime: prev.sessionTime + 1,
          mins: prev.sessionTime + 1
        }
      })
    } else {
      return timer
    }
  }

  const decrement = () => {
    if (timer.sessionTime > 1 && !timer.isTimerOn) {
      setTimer(prev => {
        return {
          ...prev,
          sessionTime: prev.sessionTime - 1,
          mins: prev.sessionTime - 1
        }
      })
    } else {
      return timer
    }
  }

  return (
    <div className='session-length'>
        <h3 id='session-label'>Session Length</h3>
        <div className='session-buttons'>
        <i
        className='fa fa-arrow-down'
        id='session-decrement'
        onClick={decrement}
        ></i>
        <div id='session-length'>
          {timer.sessionTime}
        </div>
        <i
        className='fa fa-arrow-up'
        id='session-increment'
        onClick={increment}
        ></i>
        </div>
    </div>
  )
}

SessionLength.propTypes = {
  timer: PropTypes.object,
  setTimer: PropTypes.func
}

export default SessionLength
