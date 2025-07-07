"use client"
import { useDispatch, useSelector } from "react-redux"
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { signOutUser } from "../redux/slices/userSlcie";
import type { AppDispatch, RootState } from "../redux/store";
import { closeLogInModal, closeSignUpModal } from "../redux/slices/modalSlice";
import { StoreProvider } from "../redux/StoreProvider";

export const SidebarUserInfo = () => {
    const dispatch: AppDispatch = useDispatch();
    const user = useSelector((state: RootState)=> state.user)

    async function handleSignOut(){
        await signOut(auth);

        dispatch(signOutUser())

        dispatch(closeSignUpModal())
        dispatch(closeLogInModal())
    }

  return (
    <div className='absolute xl:p-3 xl:pe-6 bottom-3 flex items-start
    space-x-2 hover:bg-gray-200  hover:bg-opacity-10 rounded-full transition cursor-pointer
    w-fit xl:w-[240px]'

    onClick={()=>handleSignOut()}
    >
     <img
     src={'/assets/Bondr.jpg'} width={44} height={44}
     alt="Profile picture"
     className='w-11 h-11 rounded-full'
     />
     
     <div className='hidden xl:flex flex-col text-sm max-w-40'>
       <span className='whitespace-nowrap text-ellipsis overflow-hidden font-bold'>
         {user.username}
       </span>
       <span className= 'whitespace-nowrap text-ellipsis overflow-hidden  text-gray-500'>
         @{user.username}
       </span>
     </div>
     
   </div>
  )
}
