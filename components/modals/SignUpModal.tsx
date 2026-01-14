"use client"
import { Modal } from "@mui/material"
import type { AppDispatch, RootState } from "../../redux/store"
import { useDispatch, useSelector } from "react-redux"
import { closeSignUpModal, openSignUpModal } from "../../redux/slices/modalSlice"
import { EyeIcon, EyeSlashIcon, XMarkIcon } from "@heroicons/react/24/outline"
import { useState } from "react"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth"
import {auth} from "../../firebase"
import { signInUser } from "../../redux/slices/userSlcie" 

export const SignUpModal = () => {
  const [email, setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [name, setName] = useState('');


  const [showPassword, setShowPassword] = useState(true);
  
  const isOpen = useSelector((state: RootState) => state.modals.SignUpModalOpen)
  const dispatch: AppDispatch = useDispatch()

  async function handleSignUp(){
    const userCredentials = await createUserWithEmailAndPassword(
      auth,
      email,
      password 
    );

    await updateProfile(userCredentials.user,{
      displayName:name
    });

    const emailValue = userCredentials.user.email ?? "";
    const username = emailValue ? emailValue.split("@")[0] : "";
    const displayName = (userCredentials.user.displayName ?? name) || username;

    dispatch(signInUser({
      name: displayName,
      username,
      email: emailValue,
      uid: userCredentials.user.uid
    }))

  }

  async function handleGuestLogIn(){
    const userCredentials = await signInWithEmailAndPassword(
      auth,
      "guest12345@gmail.com",
      "12345678"
    );
    const { user } = userCredentials;
    const emailValue = user.email ?? "";
    const username = emailValue ? emailValue.split("@")[0] : "";

    dispatch(signInUser({
      name: user.displayName ?? username,
      username,
      email: emailValue,
      uid: user.uid
    }))
   }

  return (
    <>
      <button 
        className="w-[88px] h-[40px] md:w-[88px] md:h-[40px] text-sm 
         border-2 border-gray-100 rounded-full text-black bg-white font-bold
         hover:bg-gray-100 transition-colors duration-200"
        onClick={() => dispatch(openSignUpModal())}
      >
        Sign Up
      </button>
      <Modal 
        open={isOpen} 
        onClose={() => dispatch(closeSignUpModal())}
        className="flex justify-center items-center"
      >
        <div className="w-full h-full bg-white sm:w-[600px] sm:h-fit 
        sm: rounded-xl  outline-none">

          <XMarkIcon className="w-7 mt-5 ml-3 cursor-pointer" 
          onClick={()=>dispatch(closeSignUpModal())}/>
          <div  className="pt-10 pb-20 px-4 sm:px-20">
            <h1 className="text-2xl font-bold text-center">Create your account on BondR </h1>
            <input className="w-full h-[50px] border-2 border-gray-200  
            focus:border-sky-300 transition outline-none ps-3 rounded-[4px] mt-4"
             type="text" placeholder="Name"
             onChange={(event)=>setName(event.target.value)}
             value={name}
             
             />

            <input className="w-full h-[50px] border-2 border-gray-200  
            focus:border-sky-300 transition outline-none ps-3 rounded-[4px] mt-4"
             type="email" 
             placeholder="Email "
             value={email}
             onChange={(event)=> setEmail(event.target.value)}
              />

             <div className="w-full h-[50px] border-2 border-gray-200  
            focus-within:border-sky-300 transition outline-none  rounded-[4px] mt-4 
            flex items-center overflow-hidden pr-3">
             <input type={showPassword ? "password" : "text"}
              placeholder="Password " className="w-full h-[54px] ps-3 outline-none "
              value={password}
              onChange={(event)=> setPassword(event.target.value)}
              />

             <div onClick={ () => setShowPassword(!showPassword)}
             className="w-6 h-7 text-gray-400 cursor-pointer focus:outline-sky-300"
             >
               {showPassword ? <EyeSlashIcon/> : <EyeIcon/>}
               </div>
             </div>
             <button className="w-full h-[50px] bg-sky-300 text-white 
              rounded-full shadow-md hover:bg-sky-500 transition-colors duration-200 mt-4"
              onClick={()=>handleSignUp()}
              >
                Sing Up
              </button>
              <div className="flex justify-center mt-4">
                <span className="text-sm text-gray-500">Or</span>
              </div>
              <button className="w-full h-[50px] bg-sky-300 text-white 
              rounded-full shadow-md hover:bg-sky-500 transition-colors duration-200 mt-4"
              onClick={()=>handleGuestLogIn()}
              >
                Log In as  Guest
              </button>

              
          </div>

        </div>
      </Modal>
    </>
  )
}
