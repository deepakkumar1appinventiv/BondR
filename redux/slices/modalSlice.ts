import { createSlice } from '@reduxjs/toolkit'
import { setConfig } from 'next/config';

const initialState = {
    SignUpModalOpen: false,
    LogInModalOpen: false,
    commentModalOpen:false,
    commentPostDetails:{
      name: "",
      username:"",
      id:"",
      text:"",
    }

}

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openSignUpModal: (state) => {
        state.SignUpModalOpen = true;
    },
    closeSignUpModal: (state) => {
        state.SignUpModalOpen = false;
    },
    openLogInModal: (state) =>{
      state.LogInModalOpen = true;
    },
    closeLogInModal: (state) =>{
      state.LogInModalOpen = false;
    },
     openCommentModal: (state) =>{
      state.commentModalOpen = true;
    },
    closeCommentModal: (state) =>{
      state.commentModalOpen = false;
    },
    setCommentDetails: (state,action) =>{
      state.commentPostDetails.name = action.payload.name;
      state.commentPostDetails.username = action.payload.username;
      state.commentPostDetails.id = action.payload.id;
      state.commentPostDetails.text = action.payload.text;

    }
  }
  
});

export const {openSignUpModal, closeSignUpModal ,openLogInModal,closeLogInModal,openCommentModal,closeCommentModal, setCommentDetails} = modalSlice.actions

export default modalSlice.reducer