import React from 'react'
import PropTypes from 'prop-types'

const BreakLength = ({ timer, setTimer }) => {
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

  return (
        <div className='break-length'>
            <h3 id='break-label'>Break Length</h3>
            <div className='break-buttons'>
            <i
            className='fa fa-arrow-down'
            id='break-decrement'
            onClick={decrementBreak}></i>
            <div id='break-length'>{timer.breakTime}</div>
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
  setTimer: PropTypes.func
}

export default BreakLength
