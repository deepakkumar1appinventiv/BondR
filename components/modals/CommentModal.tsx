"use client"
import { Modal } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../redux/store";
import { closeCommentModal } from "../../redux/slices/modalSlice";
import { PostHeader } from "../Post";
import { Timestamp, serverTimestamp } from "firebase/firestore";
import PostInput from "../PostInput";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { use } from "react";


export default function CommentModal() {
    const open = useSelector((state:RootState) => state.modals.commentModalOpen )
    const commentDetails = useSelector((state:RootState)=> state.modals.commentPostDetails)
    const dispatch = useDispatch()
  return (
    <>
    <Modal
    open={open}
    onClose={() => dispatch(closeCommentModal())}
    className="flex justify-center items-center"    
    >  
    
        <div className="w-full h-full bg-white sm:h-fit sm:w-[600px] sm:rounded-xl outline-none">
        <XMarkIcon className="w-7 mt-5 ml-3 cursor-pointer" 
          onClick={()=>dispatch(closeCommentModal())}/>
            <div className="pt-5 pb-10 px-0 sm:px-5 flex flex-col">
               <PostHeader
               name={commentDetails.name}
               username={commentDetails.username}
               text={commentDetails.text}
               replyTo={commentDetails.username}
              
               
               />
               <div className="mt-4">
               <PostInput
                insideModal={true}
               />
               </div>

            </div>
        </div>


    </Modal>
    </>
  )
}
