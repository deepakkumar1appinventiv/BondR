"use client"

import { CalendarIcon, ChartBarIcon, FaceSmileIcon,  MapPinIcon, PhotoIcon } from "@heroicons/react/24/outline"
import type { RootState } from "../redux/store"
import { addDoc, arrayUnion, collection, doc, serverTimestamp, updateDoc } from "firebase/firestore"
import { useState } from "react"
import { useSelector } from "react-redux"
import { db } from "../firebase"

interface PostInputprops{
  insideModal?: boolean
}

export default function PostInput  ({insideModal}:PostInputprops) {
  const [text, setText] = useState("")
  const user = useSelector((state: RootState) => state.user)
  const commentDetails = useSelector((state:RootState)=> state.modals.commentPostDetails)

  async function sendPost(){
     await addDoc(collection(db,"posts"),{
      text: text,
      name: user.name,
      username: user.username,
      Timestamp: serverTimestamp(), 
      likes: [],
      Comment: [],
       
    })

    setText('')
  }
  async function sendComment() {
    const postRef = doc(db,"posts",commentDetails.id)
    await updateDoc(postRef,{
      comments: arrayUnion({
        name: user.name,
        username: user.username,
        text:text,
      })
    })
    

    
  }



  return (
    <div className="flex space-x-5 p-3 border-b border-gray-100">
        <img src={insideModal?"/assents/Bondr.jpg": "/assets/Bondr.jpg" }
        alt={insideModal? "profile picture": "Logo"} 
        height={50} 
        width={50} 
        className="w-11 h-11"
        />
        <div className="w-full">
            <textarea className="resize-none outline-none w-full min-h-[50px] text-lg" 
            placeholder={insideModal? "Send your reply" :"What's happening?"}
            onChange={(event)=> setText(event.target.value)}
            value={text}
            
            />
            <div className="flex justify-between pt-5 border-t border-gray-100">
            <div className=" flex space-x-1.5">
                <PhotoIcon className="w-[22px] h-[22px] text-sky-400"/>
                <ChartBarIcon className="w-[22px] h-[22px] text-sky-400"/>
                <FaceSmileIcon className="w-[22px] h-[22px] text-sky-400"/>
                <CalendarIcon className="w-[22px] h-[22px] text-sky-400"/>
                <MapPinIcon className="w-[22px] h-[22px] text-sky-400"/>
            </div>
            <button className=" xl:block p-3 bg-sky-300 w-[140px] h-[50px] rounded-full text-sm text-brown-900 disabled:bg-opacity-60"
            disabled= {!text}
            onClick={()=> sendPost()}
            > BondR</button>
            </div>
        </div>
       
    </div>

  )
}
