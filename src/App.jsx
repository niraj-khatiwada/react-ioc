// @ts-check
import React from 'react'
import './App.css'

import { useSwitch, ACTION_TYPES } from './Switch'

function CheckBox({ label = '', id, isON, onChange = () => null }) {
  return (
    <div>
      <input type="checkbox" id={id} onChange={onChange} checked={isON} />
      <label htmlFor={id}>{label}</label>
    </div>
  )
}

function incrementalToggleReducer(previousState, action) {
  switch (action.type) {
    case ACTION_TYPES.TOGGLE_SWITCH:
      const switchId = action?.payload?.id
      const previousFloorState = previousState[switchId - 1]
      const currentFloorState = previousState[switchId]

      return {
        ...previousState,
        [switchId]:
          switchId !== 1
            ? previousFloorState
              ? !currentFloorState
              : currentFloorState
            : !currentFloorState,
      }
  }
}

function decrementalToggleReducer(previousState, action) {
  switch (action.type) {
    case ACTION_TYPES.TOGGLE_SWITCH:
      const switchId = action?.payload?.id
      const nextFloorState = previousState[switchId + 1]
      const currentFloorState = previousState[switchId]

      return {
        ...previousState,
        [switchId]:
          switchId !== 3
            ? nextFloorState
              ? !currentFloorState
              : currentFloorState
            : !currentFloorState,
      }
  }
}

function Switches({ items = [] }) {
  const { switchState, toggleSwitch } = useSwitch({
    items,
    reducer: decrementalToggleReducer,
  })

  return (
    <>
      <div>
        {items
          .sort((a, b) => -a?.id + b?.id)
          .map((floor) => (
            <div style={{ display: 'flex' }} key={floor?.id}>
              <p style={{ margin: 0, marginRight: '1rem' }}>
                {' '}
                {switchState[floor?.id] ? '🔦' : '🔋'}
              </p>
              <CheckBox
                label={floor?.name}
                id={floor?.selectorId}
                onChange={toggleSwitch.bind(null, floor?.id)}
                isON={switchState[floor?.id]}
              />
            </div>
          ))}
      </div>
    </>
  )
}

const floors = [
  {
    id: 1,
    name: 'First Floor',
    selectorId: 'first-floor-light-switch',
  },
  {
    id: 2,
    name: 'Second Floor',
    selectorId: 'second-floor-light-switch',
  },
  {
    id: 3,
    name: 'Third Floor',
    selectorId: 'third-floor-light-switch',
  },
]

function App() {
  return <Switches items={floors} />
}

export default App
