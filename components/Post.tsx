import { ArrowUpCircleIcon, ChartBarIcon, ChatBubbleOvalLeftEllipsisIcon, HeartIcon } from "@heroicons/react/24/outline"
import Image from "next/image";
import type { DocumentData, Timestamp } from "firebase/firestore";
import { openCommentModal, setCommentDetails } from "../redux/slices/modalSlice";
import { useDispatch } from "react-redux";
import { formatDistanceToNow, parseISO } from 'date-fns'; 

interface PostProps{
    data: DocumentData;
    id: string;
}

export const Post = ({data,id}: PostProps) => {
  const dispatch = useDispatch()

  return (
    <div className="border-b border-gray-100">
        <PostHeader
        username={data.username}
        name={data.name}
        timestamp={data.Timestamp}
        text={data.text}
        />
        <div className=" p-3 ml-16 flex space-x-14">
            <div className="relative">
                <ChatBubbleOvalLeftEllipsisIcon className="w-[22px] h-[22px] cursor-pointer hover:text-sky-500 transition-all duration-300 "
                onClick={()=> {
                  dispatch(setCommentDetails({
                    name:data.name,
                    username: data.username,
                    id:id,
                    text:data.text
                  }))
                  dispatch(openCommentModal())
                  }
                }
                />
                <span className="absolute top-1 text-xs -right-2  text-black  ">
                    2
                </span>
            </div>
            <div className="relative">
                <HeartIcon className="w-[22px] h-[22px] cursor-pointer hover:text-sky-500 transition-all duration-300 "/>
                <span className="absolute top-1 text-xs -right-2  text-black  ">
                    2
                </span>
            </div>
            <div className="relative">
                < ChartBarIcon className="w-[22px] h-[22px] cursor-pointer hover:text-sky-500 transition-all duration-300 cursor:not-allowed"/>
                
            </div>
            <div className="relative">
                <ArrowUpCircleIcon className="w-[22px] h-[22px] cursor-pointer hover:text-sky-500 transition-all duration-300 cursor:not-allowed"/>
                
            </div>
           
        </div>
    </div>
    
  )
}

interface PostHeaderProps {
  username: string;
  name: string;
  timestamp?: Timestamp | null;
  text: string;
  replyTo?:string;
}

export const PostHeader = ({ username, name, timestamp, text,replyTo }: PostHeaderProps) => {
  return (
    <div className="flex p-4  space-x-5">
      <Image
        src="/assets/Bondr.jpg"
        alt="Profile Picture"
        width={44}
        height={44}
        className="w-11 h-11 rounded-full "
      />
      <div className="text-[15px] flex flex-col space-y-1.5">
        <div className="flex space-x-2 text-[15px] text-black-400 ">
          <span className="font-bold text-black inline-block whitespace-nowrap overflow-hidden text-ellipsis max-w-[60px] min-[400px]:max-w-[100px] min-[500px]:max-w-[150px] sm:max-w-[160px]">
            {name}
          </span>
          <span className="inline-block whitespace-nowrap overflow-hidden text-ellipsis">
            @{username}
          </span>
            
          {timestamp && (
           <>
          <span>.</span>
          <span>{formatDistanceToNow(timestamp.toDate(), { addSuffix: true })}</span>
           </>
           )}
          
        </div>
        
          <span>{text}</span>
          {
            replyTo && (
              <span className="tex-[15px] text-[#707E89]">
            Replying to <span className="text-sky-400">@guest12345</span>
          </span>
            )
          }
      </div>
    </div>
  );
};
