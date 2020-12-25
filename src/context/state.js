import React, {createContext, useContext, useReducer} from 'react';
import reducer, { state } from '../reducer'

const Context = createContext()
const {Provider, Consumer} = Context


const StateContextProvider = ({children}) => {

  return (
    <Provider value={useReducer(reducer, state)}>
      {children}
    </Provider>
  )
}

const StateContext = () => useContext(Context)
export {StateContextProvider, StateContext, Consumer as StateContextConsumer }