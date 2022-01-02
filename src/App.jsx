import React, { useState } from 'react'
import './App.css'

function CheckBox({ label = '', id }) {
  return (
    <div>
      <input type="checkbox" id={id} />
      <label htmlFor={id}>{label}</label>
    </div>
  )
}

function useSwitch() {
  const [toggleSwitch, setToggleSwitch] = React.useState({
    1: false,
    2: false,
    3: false,
  })

  return { toggleSwitch, setToggleSwitch }
}

function App() {
  return (
    <div>
      <CheckBox label="First Floor" id="first-floor-light-switch" />
      <CheckBox label="Second Floor" id="second-floor-light-switch" />
      <CheckBox label="Third Floor" id="third-floor-light-switch" />
    </div>
  )
}

export default App
