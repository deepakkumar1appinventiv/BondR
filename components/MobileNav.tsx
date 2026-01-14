"use client";

import React from "react";
import {
  HomeIcon,
  MagnifyingGlassIcon,
  BellIcon,
  EnvelopeIcon,
  PlusCircleIcon,
} from "@heroicons/react/24/outline";
import {
  HomeIcon as HomeIconSolid,
  MagnifyingGlassIcon as MagnifyingGlassIconSolid,
  BellIcon as BellIconSolid,
  EnvelopeIcon as EnvelopeIconSolid,
} from "@heroicons/react/24/solid";
import { useDispatch, useSelector } from "react-redux";
import { openAddPostModal } from "../redux/slices/modalSlice";
import { setActiveView, ViewType } from "../redux/slices/navigationSlice";
import { RootState } from "../redux/store";

export default function MobileNav() {
  const dispatch = useDispatch();
  const activeItem = useSelector((state: RootState) => state.navigation.activeView);

  const handleNavigation = (view: ViewType) => {
    dispatch(setActiveView(view));
  };

  const navItems = [
    {
      view: "Home" as ViewType,
      icon: HomeIcon,
      activeIcon: HomeIconSolid,
    },
    {
      view: "Explore" as ViewType,
      icon: MagnifyingGlassIcon,
      activeIcon: MagnifyingGlassIconSolid,
    },
    {
      view: "post" as ViewType,
      icon: PlusCircleIcon,
      activeIcon: PlusCircleIcon,
      isAction: true,
    },
    {
      view: "Notification" as ViewType,
      icon: BellIcon,
      activeIcon: BellIconSolid,
    },
    {
      view: "Messages" as ViewType,
      icon: EnvelopeIcon,
      activeIcon: EnvelopeIconSolid,
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 sm:hidden">
      <div className="flex justify-around items-center h-14 px-2">
        {navItems.map((item) => {
          const isActive = activeItem === item.view;
          const Icon = isActive ? item.activeIcon : item.icon;

          if (item.isAction) {
            return (
              <button
                key={item.view}
                onClick={() => dispatch(openAddPostModal())}
                className="p-2 rounded-full bg-gradient-to-r from-sky-400 to-pink-400 transition-transform active:scale-95"
              >
                <Icon className="w-6 h-6 text-white" />
              </button>
            );
          }

          return (
            <button
              key={item.view}
              onClick={() => handleNavigation(item.view)}
              className={`p-2 rounded-full transition-colors ${
                isActive ? "text-sky-500" : "text-gray-600"
              }`}
            >
              <Icon className="w-6 h-6" />
            </button>
          );
        })}
      </div>
    </nav>
  );
}
