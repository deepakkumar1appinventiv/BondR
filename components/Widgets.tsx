"use client";

import { EllipsisHorizontalIcon, MagnifyingGlassIcon, FireIcon, UserPlusIcon } from "@heroicons/react/24/outline"
import Image from "next/image"
import { useState } from "react"
import { useSelector } from "react-redux"
import { RootState } from "@/redux/store"

const trendingData = [
  { id: "1", category: "Technology", hashtag: "#ReactJS", posts: "250K" },
  { id: "2", category: "Entertainment", hashtag: "#Movies2024", posts: "180K" },
  { id: "3", category: "Sports", hashtag: "#Cricket", posts: "320K" },
  { id: "4", category: "Music", hashtag: "#NewRelease", posts: "95K" },
  { id: "5", category: "Gaming", hashtag: "#Gaming", posts: "410K" },
];

const suggestedUsers = [
  { id: "1", name: "Rishabh Sharma", username: "RishabhSharma", bio: "Full Stack Developer" },
  { id: "2", name: "Jayant Tyagi", username: "JayantTyagi", bio: "UI/UX Designer" },
  { id: "3", name: "Yash Rajput", username: "YashRajput", bio: "React Developer" },
];

export const Widgets = () => {
  const [followedUsers, setFollowedUsers] = useState<Set<string>>(new Set());
  const [hoveredTrend, setHoveredTrend] = useState<string | null>(null);
  const activeView = useSelector((state: RootState) => state.navigation.activeView);

  const handleFollow = (userId: string) => {
    setFollowedUsers((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(userId)) {
        newSet.delete(userId);
      } else {
        newSet.add(userId);
      }
      return newSet;
    });
  };

  return (
    <div className="p-3 space-y-3 w-[350px] hidden lg:flex flex-col ps-6 shrink-0">
      {/* Search Bar - Hidden on Explore page */}
      {activeView !== "Explore" && (
        <div className="flex space-x-3 bg-[#EFF3F4] text-gray-500 items-center rounded-full w-full h-[50px] px-4 border border-gray-300 focus-within:border-sky-400 focus-within:border-2 transition-all">
          <MagnifyingGlassIcon className="w-6 h-6"/>
          <input
            type="text"
            placeholder="BondR Search Here"
            className="bg-transparent outline-none flex-1 text-gray-800 placeholder-gray-500"
          />
        </div>
      )}

      {/* Trending Section */}
      <div className="bg-[#EFF3F4] rounded-xl p-4">
        <div className="flex items-center space-x-2 mb-4">
          <FireIcon className="w-6 h-6 text-orange-500" />
          <h2 className="text-xl font-bold text-gray-800">Trending</h2>
        </div>

        <div className="space-y-1">
          {trendingData.map((trend) => (
            <div
              key={trend.id}
              className={`flex flex-col py-3 px-2 rounded-lg cursor-pointer transition-all duration-200 ${
                hoveredTrend === trend.id ? "bg-sky-50 translate-x-1" : ""
              }`}
              onMouseEnter={() => setHoveredTrend(trend.id)}
              onMouseLeave={() => setHoveredTrend(null)}
            >
              <div className="flex justify-between items-start">
                <span className="text-xs text-gray-500">{trend.category}</span>
                <button className="p-1 hover:bg-gray-200 rounded-full transition-colors">
                  <EllipsisHorizontalIcon className="w-5 h-5 text-gray-500" />
                </button>
              </div>
              <span className="font-bold text-gray-900">{trend.hashtag}</span>
              <span className="text-xs text-gray-500">{trend.posts} BondR</span>
            </div>
          ))}
        </div>

        <button className="mt-4 text-sky-500 hover:text-sky-600 text-sm font-medium transition-colors">
          Show more
        </button>
      </div>

      {/* Who to Follow Section */}
      <div className="bg-[#EFF3F4] rounded-xl p-4">
        <div className="flex items-center space-x-2 mb-4">
          <UserPlusIcon className="w-6 h-6 text-sky-500" />
          <h2 className="text-xl font-bold text-gray-800">Who to Follow</h2>
        </div>

        <div className="space-y-1">
          {suggestedUsers.map((user) => {
            const isFollowed = followedUsers.has(user.id);

            return (
              <div
                key={user.id}
                className="flex items-center justify-between py-3 px-2 rounded-lg cursor-pointer hover:bg-sky-50 transition-all duration-200"
              >
                <div className="flex items-center space-x-3">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden bg-gradient-to-r from-sky-400 via-purple-400 to-pink-400 p-[2px]">
                    <div className="w-full h-full rounded-full overflow-hidden bg-white">
                      <Image
                        src="/assets/Bondr.jpg"
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
                    <span className="text-gray-400 text-xs mt-0.5">{user.bio}</span>
                  </div>
                </div>

                <button
                  onClick={() => handleFollow(user.id)}
                  className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                    isFollowed
                      ? "bg-white border border-gray-300 text-gray-700 hover:border-red-300 hover:text-red-500"
                      : "bg-black text-white hover:bg-gray-800"
                  }`}
                >
                  {isFollowed ? "Following" : "Follow"}
                </button>
              </div>
            );
          })}
        </div>

        <button className="mt-4 text-sky-500 hover:text-sky-600 text-sm font-medium transition-colors">
          Show more
        </button>
      </div>
    </div>
  )
}
