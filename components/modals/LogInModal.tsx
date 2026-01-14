"use client"
import { Modal } from "@mui/material"
import type { AppDispatch, RootState } from "../../redux/store"
import { useDispatch, useSelector } from "react-redux"
import { closeLogInModal, openLogInModal } from "../../redux/slices/modalSlice"
import { signInUser } from "../../redux/slices/userSlcie"
import { EyeIcon, EyeSlashIcon, XMarkIcon } from "@heroicons/react/24/outline"
import { useState } from "react"
import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "../../firebase"

export const LogInModal= () => {
  const [showPassword, setShowPassword] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');



  const isOpen = useSelector((state: RootState) => state.modals.LogInModalOpen)
  const dispatch: AppDispatch = useDispatch()

   async function handleLogin(){
    const userCredentials = await signInWithEmailAndPassword(auth ,email, password)
    const { user } = userCredentials
    dispatch(signInUser({
      name: user.displayName ?? user.email?.split("@")[0] ?? "",
      username: user.email?.split("@")[0] ?? "",
      email: user.email ?? "",
      uid: user.uid
    }))
    dispatch(closeLogInModal())
   }

   async function handleGuestLogIn(){
    const userCredentials = await signInWithEmailAndPassword(auth, "guest12345@gmail.com", "12345678")
    const { user } = userCredentials
    dispatch(signInUser({
      name: user.displayName ?? user.email?.split("@")[0] ?? "",
      username: user.email?.split("@")[0] ?? "",
      email: user.email ?? "",
      uid: user.uid
    }))
    dispatch(closeLogInModal())
   }

  return (
    <>
      <button className="w-[88px] h-[40px] text-sm  
      border-2 border-gray-100 rounded-full text-white  font-bold"
       onClick={()=> dispatch(openLogInModal())}
      >
        Log In </button>
      <Modal 
        open={isOpen} 
        onClose={() => dispatch(closeLogInModal())}
        className="flex justify-center items-center"
      >
        <div className="w-full h-full bg-white sm:w-[600px] sm:h-fit 
        sm: rounded-xl outline-none">

          <XMarkIcon className="w-7 mt-5 ml-3 cursor-pointer" 
          onClick={()=>dispatch(closeLogInModal())}/>
          <div  className="pt-10 pb-20 px-4 sm:px-20">
            <h1 className="text-2xl font-bold text-center">Log in to BondR </h1>

            <input className="w-full h-[50px] border-2 border-gray-200  
            focus:border-sky-300 transition outline-none ps-3 rounded-[4px] mt-4"
             type="email" placeholder="Email "
             onChange={(event)=> setEmail(event.target.value)}
             value={email}
              />

             <div className="w-full h-[50px] border-2 border-gray-200  
            focus-within:border-sky-300 transition outline-none  rounded-[4px] mt-4 
            flex items-center overflow-hidden pr-3">
             <input type={showPassword ? "password" : "text"}
              placeholder="Password " className="w-full h-[54px] ps-3 outline-none "
              onChange={(event)=> setPassword(event.target.value)}
              value={password}
              />

             <div onClick={ () => setShowPassword(!showPassword)}
             className="w-6 h-7 text-gray-400 cursor-pointer focus:outline-sky-300"
             >
               {showPassword ? <EyeSlashIcon/> : <EyeIcon/>}
               </div>
             </div>
             <button className="w-full h-[50px] bg-sky-300 text-white 
              rounded-full shadow-md hover:bg-sky-500 transition-colors duration-200 mt-4"
              onClick={()=> handleLogin()}
              >
                Log In 
              </button>
              <div className="flex justify-center mt-4">
                <span className="text-sm text-gray-500">Or</span>
              </div>
              <button className="w-full h-[50px] bg-sky-300 text-white 
              rounded-full shadow-md hover:bg-sky-500 transition-colors duration-200 mt-4"
              onClick={()=> handleGuestLogIn()}>
                Log In as  Guest
              </button>

              
          </div>

        </div>
      </Modal>
    </>
  )
}
