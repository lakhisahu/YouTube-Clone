import { combineReducers, configureStore } from '@reduxjs/toolkit'
import userReducer from "./userSlice"
import videoReducer from "./videoSlice"

//const rootReducer = combineReducers({user:userReducer,video:videoReducer})
export const store = configureStore({
  reducer: {
   user:userReducer,
   video:videoReducer
  }
})