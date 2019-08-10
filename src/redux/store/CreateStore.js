import { createStore } from 'redux'
import makeRootReducer from './CombineReducers'

let State = {}

export default (initialState: State = {}) => {
  const store = createStore(
    makeRootReducer(),
    initialState
  )
  return store
}
