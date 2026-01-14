"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { UserPlusIcon } from "@heroicons/react/24/outline";
import { CheckIcon } from "@heroicons/react/24/solid";

interface SuggestedUser {
  id: string;
  name: string;
  username: string;
  avatar?: string;
  bio?: string;
}

interface ExploreSuggestionsProps {
  users?: SuggestedUser[];
}

const defaultUsers: SuggestedUser[] = [
  { id: "1", name: "Rishabh Sharma", username: "RishabhSharma", bio: "Full Stack Developer" },
  { id: "2", name: "Jayant Tyagi", username: "JayantTyagi", bio: "UI/UX Designer" },
  { id: "3", name: "Yash Rajput", username: "YashRajput", bio: "React Developer" },
  { id: "4", name: "Priya Singh", username: "PriyaSingh", bio: "Tech Enthusiast" },
  { id: "5", name: "Amit Kumar", username: "AmitKumar", bio: "Software Engineer" },
];

export const ExploreSuggestions = ({ users = defaultUsers }: ExploreSuggestionsProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<HTMLDivElement[]>([]);
  const [followedUsers, setFollowedUsers] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (containerRef.current) {
      gsap.fromTo(
        containerRef.current,
        { x: 50, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.5, delay: 0.2, ease: "power2.out" }
      );
    }

    if (itemsRef.current.length > 0) {
      gsap.fromTo(
        itemsRef.current,
        { x: 20, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.4,
          stagger: 0.1,
          delay: 0.5,
          ease: "power2.out",
        }
      );
    }
  }, []);

  const handleFollow = (userId: string, buttonRef: HTMLButtonElement | null) => {
    const isCurrentlyFollowed = followedUsers.has(userId);

    if (buttonRef) {
      gsap.fromTo(
        buttonRef,
        { scale: 1 },
        {
          scale: 1.2,
          duration: 0.15,
          yoyo: true,
          repeat: 1,
          ease: "power2.inOut",
        }
      );
    }

    setFollowedUsers((prev) => {
      const newSet = new Set(prev);
      if (isCurrentlyFollowed) {
        newSet.delete(userId);
      } else {
        newSet.add(userId);
      }
      return newSet;
    });
  };

  const handleItemHover = (index: number, isEntering: boolean) => {
    const item = itemsRef.current[index];
    if (item) {
      gsap.to(item, {
        x: isEntering ? 5 : 0,
        backgroundColor: isEntering ? "rgba(56, 189, 248, 0.1)" : "transparent",
        duration: 0.2,
        ease: "power2.out",
      });
    }
  };

  return (
    <div
      ref={containerRef}
      className="bg-[#EFF3F4] rounded-xl p-4"
    >
      <div className="flex items-center space-x-2 mb-4">
        <UserPlusIcon className="w-6 h-6 text-sky-500" />
        <h2 className="text-xl font-bold text-gray-800">Who to Follow</h2>
      </div>

      <div className="space-y-1">
        {users.map((user, index) => {
          const isFollowed = followedUsers.has(user.id);

          return (
            <div
              key={user.id}
              ref={(el) => {
                if (el) itemsRef.current[index] = el;
              }}
              className="flex items-center justify-between py-3 px-2 rounded-lg cursor-pointer transition-colors"
              onMouseEnter={() => handleItemHover(index, true)}
              onMouseLeave={() => handleItemHover(index, false)}
            >
              <div className="flex items-center space-x-3">
                <div className="relative w-12 h-12 rounded-full overflow-hidden bg-gradient-to-r from-sky-400 via-purple-400 to-pink-400 p-[2px]">
                  <div className="w-full h-full rounded-full overflow-hidden bg-white">
                    <Image
                      src={user.avatar || "/assets/Bondr.jpg"}
                      alt={user.name}
                      width={48}
                      height={48}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="font-semibold text-gray-900 text-sm">{user.name}</span>
                  <span className="text-gray-500 text-xs">@{user.username}</span>
                  {user.bio && (
                    <span className="text-gray-400 text-xs mt-0.5 line-clamp-1">{user.bio}</span>
                  )}
                </div>
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleFollow(user.id, e.currentTarget);
                }}
                className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                  isFollowed
                    ? "bg-white border border-gray-300 text-gray-700 hover:border-red-300 hover:text-red-500"
                    : "bg-black text-white hover:bg-gray-800"
                }`}
              >
                {isFollowed ? (
                  <span className="flex items-center space-x-1">
                    <CheckIcon className="w-4 h-4" />
                    <span>Following</span>
                  </span>
                ) : (
                  "Follow"
                )}
              </button>
            </div>
          );
        })}
      </div>

      <button className="mt-4 text-sky-500 hover:text-sky-600 text-sm font-medium transition-colors">
        Show more
      </button>
    </div>
  );
};

export default ExploreSuggestions;
