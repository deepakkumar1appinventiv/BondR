import React from 'react'
import {
  HomeIcon,
  MagnifyingGlassIcon,
  BellIcon,
  EnvelopeIcon,
  BookmarkIcon,
  UserIcon,
  EllipsisHorizontalCircleIcon,
} from "@heroicons/react/24/outline";
import { SidebarUserInfo } from './SidebarUserInfo';

export default function Sidebar() {

  

  return (
    <nav className=' h-screen hidden sm:flex flex-col sticky top-0 p-3 xl:mr-10'>
        <div className='relative h-full flex flex-col items-center'>
        <div className='py-3 '>
            <img src={'./assets/Bondr.jpg'} width={65} height={65}  alt='Logo'/>
        </div>
        <ul>
             <SidebarLink icon={HomeIcon} text="Home"/>
             <SidebarLink icon={MagnifyingGlassIcon} text="Explore"/>
             <SidebarLink icon={BellIcon} text="Notification"/>
             <SidebarLink icon={EnvelopeIcon} text="Messages"/>
             <SidebarLink icon={BookmarkIcon} text="Bookmarks"/>
             <SidebarLink icon={UserIcon} text="User"/>
             <SidebarLink icon={EllipsisHorizontalCircleIcon} text="More"/>
             <button className='hidden xl:block p-3 bg-sky-300 w-[200px] h-[50px] rounded-full text-xl text-brown-900 '> BondR </button>
        </ul>
        <SidebarUserInfo/>
        
        </div>
    </nav>
  )
}

interface SidebarLinkProps {
  text: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

function SidebarLink({ text, icon: Icon }: SidebarLinkProps) {
  return (
    <li className='flex items-center gap-4 text-xl p-3 cursor-pointer hover:bg-gray-100 rounded-lg space-x-2'>
      <Icon className="h-7 "/>
      <span className='hidden xl:block'>
      {text}
      </span>
    </li>
  );
}