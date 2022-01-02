import React from 'react'

const ACTION_TYPES = {
  TOGGLE_SWITCH: 'TOGGLE_SWITCH',
}

function defaultReducer(state, action) {
  switch (action.type) {
    case ACTION_TYPES.TOGGLE_SWITCH:
      const switchId = action?.payload?.id
      return {
        ...state,
        [switchId]: !state?.[switchId],
      }
  }
}

function useSwitch({ reducer = defaultReducer, items = [] } = {}) {
  const [switchState, dispatch] = React.useReducer(
    reducer,
    items.reduce((accumulator, currentValue) => {
      if (!accumulator[currentValue?.id]) {
        accumulator[currentValue?.id] = false
      }
      return accumulator
    }, {})
  )

  const toggleSwitch = (switchId) =>
    dispatch({ type: ACTION_TYPES.TOGGLE_SWITCH, payload: { id: switchId } })

  return { switchState, toggleSwitch }
}

export { useSwitch, defaultReducer, ACTION_TYPES }
