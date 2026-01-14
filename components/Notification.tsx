"use client";

import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import Image from "next/image";
import { Cog6ToothIcon } from "@heroicons/react/24/outline";

type TabType = "all" | "mentions";

interface Tab {
  id: TabType;
  label: string;
}

const tabs: Tab[] = [
  { id: "all", label: "All" },
  { id: "mentions", label: "Mentions" },
];

interface NotificationItem {
  id: string;
  type: "login" | "like" | "comment" | "mention" | "follow" | "repost";
  message: string;
  time: string;
  userAvatar?: string;
  username?: string;
  name?: string;
  postContent?: string;
}

// Sample notifications - Replace with Firebase data
const sampleNotifications: NotificationItem[] = [
  {
    id: "1",
    type: "like",
    message:
      "There was a login to your account @deepakOvns from a new device on 14 Jan 2026. Review it now.",
    time: "6m",
  },
  {
    id: "2",
    type: "like",
    message: "liked your post",
    time: "2h",
    userAvatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=40&h=40&fit=crop",
    username: "sarah_j",
    name: "Sarah Johnson",
    postContent:
      "Agar shampoo ki bottle ko aadhi khaali kar ke usme conditioner mila de toh sawal ye paida hota hai ki meelon ke hain faasle tumse na jaane kyun?",
  },
  {
    id: "3",
    type: "mention",
    message: "mentioned you in a post",
    time: "5h",
    userAvatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop",
    username: "tech_guru",
    name: "Tech Guru",
    postContent: "Hey @deepakOvns check this out!",
  },
  {
    id: "4",
    type: "follow",
    message: "followed you",
    time: "1d",
    userAvatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop",
    username: "john_doe",
    name: "John Doe",
  },
];

export const Notification = () => {
  const [activeTab, setActiveTab] = useState<TabType>("all");
  const containerRef = useRef<HTMLDivElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      gsap.fromTo(
        containerRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.5, ease: "power2.out" }
      );
    }
  }, []);

  useEffect(() => {
    if (tabsRef.current && indicatorRef.current) {
      const activeTabElement = tabsRef.current.querySelector(
        `[data-tab="${activeTab}"]`
      );
      if (activeTabElement) {
        const rect = activeTabElement.getBoundingClientRect();
        const parentRect = tabsRef.current.getBoundingClientRect();

        gsap.to(indicatorRef.current, {
          x: rect.left - parentRect.left,
          width: rect.width,
          duration: 0.3,
          ease: "power2.out",
        });
      }
    }
  }, [activeTab]);

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
    gsap.fromTo(
      ".notification-list",
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }
    );
  };

  const filteredNotifications =
    activeTab === "all"
      ? sampleNotifications
      : sampleNotifications.filter((n) => n.type === "mention");

  const renderNotification = (notification: NotificationItem) => {
    if (notification.type === "login") {
      return (
        <div
          key={notification.id}
          className="flex p-4 space-x-4 border-b border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer"
        >
          <div className="w-11 h-11 flex items-center justify-center flex-shrink-0">
            <svg viewBox="0 0 24 24" className="w-8 h-8" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[15px] text-[#0f1419]">{notification.message}</p>
          </div>
          <span className="text-[15px] text-[#707E89] flex-shrink-0">
            {notification.time}
          </span>
        </div>
      );
    }

    return (
      <div
        key={notification.id}
        className="flex p-4 space-x-4 border-b border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer"
      >
        <div className="flex items-start space-x-2 flex-shrink-0">
          <span className="text-purple-500 text-lg mt-1">✦</span>
          <div className="w-11 h-11 relative rounded-full overflow-hidden">
            {notification.userAvatar ? (
              <Image
                src={notification.userAvatar}
                alt={notification.username || "User"}
                fill
                className="object-cover"
                unoptimized
              />
            ) : (
              <Image
                src="/assets/Bondr.jpg"
                alt="Profile"
                fill
                className="object-cover"
              />
            )}
          </div>
        </div>
        <div className="flex-1 min-w-0 text-[15px]">
          <div className="flex items-center space-x-1">
            <span className="font-bold text-[#0f1419]">
              @{notification.username}
            </span>
            <span className="text-[#707E89]">{notification.message}</span>
          </div>
          {notification.postContent && (
            <p className="text-[#707E89] mt-1 line-clamp-2">
              {notification.postContent}
            </p>
          )}
        </div>
        <div className="flex items-start space-x-2 flex-shrink-0">
          <span className="text-[15px] text-[#707E89]">
            {notification.time}
          </span>
          <button className="p-1.5 hover:bg-sky-100 rounded-full transition-colors group">
            <svg
              className="w-4 h-4 text-[#707E89] group-hover:text-sky-500"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
            </svg>
          </button>
        </div>
      </div>
    );
  };

  return (
    <div
      ref={containerRef}
      className="flex-grow border-x border-gray-100 w-full"
    >
      {/* Header */}
      <div className="sticky top-0 z-50 bg-white bg-opacity-95 backdrop-blur-sm border-b border-gray-100">
        <div className="flex items-center justify-between px-4 py-3">
          <h1 className="text-lg sm:text-xl font-bold text-[#0f1419]">
            Notifications
          </h1>
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <Cog6ToothIcon className="w-5 h-5 text-[#707E89]" />
          </button>
        </div>

        {/* Tabs */}
        <div ref={tabsRef} className="relative flex">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              data-tab={tab.id}
              onClick={() => handleTabChange(tab.id)}
              className={`flex-1 py-4 text-[15px] font-medium transition-colors relative ${
                activeTab === tab.id
                  ? "text-[#0f1419] font-bold"
                  : "text-[#707E89] hover:bg-gray-50"
              }`}
            >
              {tab.label}
            </button>
          ))}
          {/* Tab Indicator */}
          <div
            ref={indicatorRef}
            className="absolute bottom-0 h-1 bg-sky-500 rounded-full"
            style={{ width: 0 }}
          />
        </div>
      </div>

      {/* Notification List */}
      <div className="notification-list">
        {filteredNotifications.length > 0 ? (
          filteredNotifications.map(renderNotification)
        ) : (
          <div className="flex flex-col items-center justify-center py-16 px-4">
            <p className="text-[15px] text-[#707E89] text-center">
              No mentions yet
            </p>
            <p className="text-[13px] text-[#707E89] mt-1">
              When someone mentions you, it will show up here.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Notification;
