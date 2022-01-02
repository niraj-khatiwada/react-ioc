// @ts-check
import React from 'react'
import './App.css'

function CheckBox({ label = '', id, isON, onChange = () => null }) {
  return (
    <div>
      <input type="checkbox" id={id} onChange={onChange} checked={isON} />
      <label htmlFor={id}>{label}</label>
    </div>
  )
}

function Switches({
  items = [],
  toggleType,
  lightBesideSwitch = false,
  lightAheadOfSwitch = false,
  customBulbON = '💡',
  customBulbOFF = '🔌',
}) {
  const [toggleSwitch, setToggleSwitch] = React.useState(() =>
    items.reduce((accumulator, currentValue) => {
      if (!accumulator[currentValue?.id]) {
        accumulator[currentValue?.id] = false
      }
      return accumulator
    }, {})
  )

  const handleSwitchToggle = (floorNumber) => {
    if (!floorNumber) {
      throw new Error('Please specify the floor number')
    }
    if (toggleType?.length > 0) {
      if (toggleType == 'INCREMENTAL') {
        setToggleSwitch((previousState) => {
          const previousFloorState = previousState[floorNumber - 1]
          const currentFloorState = previousState[floorNumber]

          return {
            ...previousState,
            [floorNumber]:
              floorNumber !== 1
                ? previousFloorState
                  ? !currentFloorState
                  : currentFloorState
                : !currentFloorState,
          }
        })
      } else {
        setToggleSwitch((previousState) => {
          const nextFloorState = previousState[floorNumber + 1]
          const currentFloorState = previousState[floorNumber]

          return {
            ...previousState,
            [floorNumber]:
              floorNumber !== 3
                ? nextFloorState
                  ? !currentFloorState
                  : currentFloorState
                : !currentFloorState,
          }
        })
      }
    } else {
      setToggleSwitch((previousState) => {
        const currentFloorState = previousState[floorNumber]

        return {
          ...previousState,
          [floorNumber]: !currentFloorState,
        }
      })
    }
  }

  return (
    <>
      {!lightBesideSwitch ? (
        <div>
          {items
            .sort((a, b) => -a?.id + b?.id)
            .map((floor) => (
              <p key={floor?.id}>
                {' '}
                {toggleSwitch[floor?.id] ? customBulbON : customBulbOFF}
              </p>
            ))}
        </div>
      ) : null}
      <div>
        {items
          .sort((a, b) => -a?.id + b?.id)
          .map((floor) => (
            <div style={{ display: 'flex', alignItems: 'center' }}>
              {lightBesideSwitch && lightAheadOfSwitch ? (
                <p style={{ margin: 0, marginLeft: '1rem' }} key={floor?.id}>
                  {toggleSwitch[floor?.id] ? customBulbON : customBulbOFF}
                </p>
              ) : null}
              <CheckBox
                key={floor?.id}
                label={floor?.name}
                id={floor?.selectorId}
                onChange={handleSwitchToggle.bind(null, floor?.id)}
                isON={toggleSwitch[floor?.id]}
              />
              {lightBesideSwitch && !lightAheadOfSwitch ? (
                <p style={{ margin: 0, marginLeft: '1rem' }} key={floor?.id}>
                  {toggleSwitch[floor?.id] ? customBulbON : customBulbOFF}
                </p>
              ) : null}
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
  return (
    <Switches
      items={floors}
      toggleType="DECREMENTAL"
      lightBesideSwitch={true}
      lightAheadOfSwitch={true}
      customBulbON="🔦"
      customBulbOFF="🔋"
    />
  )
}

export default App
