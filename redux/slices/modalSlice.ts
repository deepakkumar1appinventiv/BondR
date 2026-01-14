import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    SignUpModalOpen: false,
    LogInModalOpen: false,
    commentModalOpen: false,
    addPostModalOpen: false,
    addStoryModalOpen: false,
    commentPostDetails: {
      name: "",
      username: "",
      id: "",
      text: "",
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
    setCommentDetails: (state, action) => {
      state.commentPostDetails.name = action.payload.name;
      state.commentPostDetails.username = action.payload.username;
      state.commentPostDetails.id = action.payload.id;
      state.commentPostDetails.text = action.payload.text;
    },
    openAddPostModal: (state) => {
      state.addPostModalOpen = true;
    },
    closeAddPostModal: (state) => {
      state.addPostModalOpen = false;
    },
    openAddStoryModal: (state) => {
      state.addStoryModalOpen = true;
    },
    closeAddStoryModal: (state) => {
      state.addStoryModalOpen = false;
    }
  }
});

export const {
  openSignUpModal,
  closeSignUpModal,
  openLogInModal,
  closeLogInModal,
  openCommentModal,
  closeCommentModal,
  setCommentDetails,
  openAddPostModal,
  closeAddPostModal,
  openAddStoryModal,
  closeAddStoryModal
} = modalSlice.actions

export default modalSlice.reducer