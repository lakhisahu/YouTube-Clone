import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user:null,
  error:false
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
 loginStart:(state)=>{
    state.user=null
    state.error=false
 },
 loginsuccess:(state,action)=>{
    state.user=action.payload
    state.error=false
 },
 loginFailure:(state)=>{
    state.user=null
    state.error=false
 },

 subscription:(state,action)=>{
   if(state.user.subscribedUsers.includes(action.payload)){
      state.user.subscribedUsers.splice(
         state.user.subscribedUsers.findIndex(e=>e==action.payload),1
      )
   }else{
      state.user.subscribedUsers.push(action.payload)
   }
     
   },
 
 logOut:(state)=>{
    state.user=null
    state.error=false
 }
  },
})

// Action creators are generated for each case reducer function
export const { loginStart, loginFailure, loginsuccess, logOut, subscription } = userSlice.actions

export default userSlice.reducer