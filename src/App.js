import React from 'react'

function App () {
  return (
    <div className="app">
      <h1>25 + 5 clock</h1>
      <div className='length-container'>
        <div className='break-length'>
          <h3>Break Length</h3>
          <div className='break-buttons'>
            <i className='fa fa-arrow-down'></i>
            <div>5</div>
            <i className='fa fa-arrow-up'></i>
          </div>
        </div>
        <div className='session-length'>
          <h3>Session Length</h3>
          <div className='session-buttons'>
            <i className='fa fa-arrow-down'></i>
            <div>25</div>
            <i className='fa fa-arrow-up'></i>
          </div>
        </div>
      </div>
      <div className='timer'>
        <h4>Session</h4>
        <p>24:59</p>
      </div>
      <div className='timer-control'>
        <div className='pause-play'>
          <i className='fa fa-play'></i>
          <i className='fa fa-pause'></i>
        </div>
        <div className='refresh'>
          <i className='fa fa-refresh'></i>
        </div>
      </div>
      <div className='footer'>
        <p className='coded-by'>Designed and coded by</p>
        <p>Smith Ringtho</p>
      </div>
    </div>
  )
}

export default App
