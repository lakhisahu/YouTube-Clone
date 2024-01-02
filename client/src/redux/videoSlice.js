import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  video:JSON.parse(localStorage.getItem("video"))||null,
  error:false
}

export const videoSlice = createSlice({
  name: 'video',
  initialState,
  reducers: {
 videoStart:(state)=>{
    state.video=null
    state.error=false
 },
 videosuccess:(state,action)=>{
    state.video=action.payload
    state.error=false
 },
 videolike:(state,action)=>{
if(!state.video.likes.includes(action.payload)){
state.video.likes.push(action.payload)
}
  
},

 videoFailure:(state)=>{
    state.video=null
    state.error=false
 }
  },
})

// Action creators are generated for each case reducer function
export const { videoStart, videoFailure, videosuccess,videolike } = videoSlice.actions

export default videoSlice.reducer