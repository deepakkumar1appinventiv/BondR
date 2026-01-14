"use client";
import React, { useState } from "react";
import Image from "next/image";
import {
  HomeIcon,
  MagnifyingGlassIcon,
  BellIcon,
  EnvelopeIcon,
  BookmarkIcon,
  UserIcon,
  EllipsisHorizontalCircleIcon,
} from "@heroicons/react/24/outline";
import { SidebarUserInfo } from "./SidebarUserInfo";

export default function Sidebar() {
  const [activeItem, setActiveItem] = useState("Home");

  return (
    <nav className=" h-screen hidden sm:flex flex-col sticky top-0 p-3 xl:mr-10">
      <div className="relative h-full flex flex-col items-start">
        <div className="flex w-full items-center gap-3 px-3 py-3">
          <Image
            src="/assets/Bondr.jpg"
            width={44}
            height={44}
            alt="Logo"
            className="rounded-full"
            priority
          />
          <span className="brand-text hidden xl:block text-2xl font-semibold tracking-wide">
            BondR
          </span>
        </div>
        <ul className="w-full space-y-1">
          <SidebarLink
            icon={HomeIcon}
            text="Home"
            active={activeItem === "Home"}
            onClick={() => setActiveItem("Home")}
          />
          <SidebarLink
            icon={MagnifyingGlassIcon}
            text="Explore"
            active={activeItem === "Explore"}
            onClick={() => setActiveItem("Explore")}
          />
          <SidebarLink
            icon={BellIcon}
            text="Notification"
            active={activeItem === "Notification"}
            onClick={() => setActiveItem("Notification")}
          />
          <SidebarLink
            icon={EnvelopeIcon}
            text="Messages"
            active={activeItem === "Messages"}
            onClick={() => setActiveItem("Messages")}
          />
          <SidebarLink
            icon={BookmarkIcon}
            text="Bookmarks"
            active={activeItem === "Bookmarks"}
            onClick={() => setActiveItem("Bookmarks")}
          />
          <SidebarLink
            icon={UserIcon}
            text="User"
            active={activeItem === "User"}
            onClick={() => setActiveItem("User")}
          />
          <SidebarLink
            icon={EllipsisHorizontalCircleIcon}
            text="More"
            active={activeItem === "More"}
            onClick={() => setActiveItem("More")}
          />
          <button className="hidden xl:block mt-3 w-full rounded-full bg-sky-300 px-3 py-2 text-lg font-semibold text-slate-900 transition-colors hover:bg-sky-400">
            {" "}
            BondR{" "}
          </button>
        </ul>
        <SidebarUserInfo />
      </div>
    </nav>
  );
}

interface SidebarLinkProps {
  text: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  active: boolean;
  onClick: () => void;
}

function SidebarLink({ text, icon: Icon, active, onClick }: SidebarLinkProps) {
  return (
    <li>
      <button
        type="button"
        onClick={onClick}
        className={`group flex w-full items-center gap-4 rounded-lg px-3 py-2 text-xl transition-colors ${
          active
            ? "bg-sky-100 text-sky-700 font-semibold"
            : "text-slate-800 hover:bg-gray-100"
        }`}
      >
        <Icon
          className={`h-7 ${
            active
              ? "text-sky-700"
              : "text-slate-800 group-hover:text-slate-900"
          }`}
        />
        <span className="hidden xl:block">{text}</span>
      </button>
    </li>
  );
}
