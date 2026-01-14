"use client"
import { useSelector } from "react-redux"
import { LogInModal} from "./modals/LogInModal"
import { SignUpModal } from "./modals/SignUpModal"
import type { RootState } from "../redux/store"

export const SignUpPrompt = () => {
  const uid = useSelector((state: RootState)=> state.user.uid)
  return (
    !uid &&
    <div className="fixed w-full h-[80px] bg-sky-300 bottom-0 flex justify-center items-center space-x-5 lg:justify-between lg:px-20 lx:px-40 2xl">

        <div className="hidden md:flex flex-col text-white  ">
            <span className="text-md font-bold">Don't miss out on the BondR</span>
            <span className="text-sm font-semibold ">People on Bondr are waitng to connect with you </span>
        </div>
        <div className="flex space-x-3 w-full md:w-fit p-2">
            <LogInModal/>
            <SignUpModal/>
        </div>
    </div>
  )
}
