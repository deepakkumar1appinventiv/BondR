"use client"

import { Modal } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../redux/store";
import { closeAddPostModal } from "../../redux/slices/modalSlice";
import PostInput from "../PostInput";
import { XMarkIcon } from "@heroicons/react/24/outline";

export default function PostModal() {
  const open = useSelector((state:RootState) => state.modals.addPostModalOpen)
  const dispatch = useDispatch()

  return (
    <Modal
      open={open}
      onClose={() => dispatch(closeAddPostModal())}
      className="flex justify-center items-center"
    >
      <div className="w-full h-full bg-white sm:h-fit sm:w-[600px] sm:rounded-xl outline-none">
        <div className="flex items-center justify-between px-4 pt-5">
          <span className="text-lg font-semibold text-[#0f1419]">New status</span>
          <XMarkIcon
            className="w-7 cursor-pointer"
            onClick={() => dispatch(closeAddPostModal())}
          />
        </div>
        <div className="pt-2 pb-6 px-0 sm:px-5">
          <PostInput />
        </div>
      </div>
    </Modal>
  )
}
