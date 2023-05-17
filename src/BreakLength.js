import React from 'react'
import PropTypes from 'prop-types'

const BreakLength = ({ timer, setTimer }) => {
  const increment = () => {
    if (timer.breakTime < 60 && !timer.isTimerOn) {
      setTimer(prev => {
        return {
          ...prev,
          breakTime: prev.breakTime + 1
        }
      })
    } else {
      return timer
    }
  }

  const decrement = () => {
    if (timer.breakTime > 1 && !timer.isTimerOn) {
      setTimer(prev => {
        return {
          ...prev,
          breakTime: prev.breakTime - 1
        }
      })
    } else {
      return timer
    }
  }

  return (
        <div className='break-length'>
            <h3 id='break-label'>Break Length</h3>
            <div className='break-buttons'>
            <i
            className='fa fa-arrow-down'
            id='break-decrement'
            onClick={decrement}></i>
            <div id='break-length'>{timer.breakTime}</div>
            <i
            className='fa fa-arrow-up'
            id='break-increment'
            onClick={increment}
            ></i>
            </div>
        </div>
  )
}

BreakLength.propTypes = {
  timer: PropTypes.object,
  setTimer: PropTypes.func
}

export default BreakLength
