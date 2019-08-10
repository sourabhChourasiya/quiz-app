import { combineReducers } from 'redux'
import reducers from '../modules'

const appReducer = combineReducers({ ...reducers })

const rootReducer = (state: {}, action): {} => {
  let appState = state
  return appReducer(appState, action)
}

export default function CombineReducers(): Function {
  return rootReducer
}
