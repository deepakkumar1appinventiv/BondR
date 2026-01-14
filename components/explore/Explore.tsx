"use client";

import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import ExploreSearch from "./ExploreSearch";
import ExploreGrid from "./ExploreGrid";
import { ExplorePostData } from "./ExplorePost";

// Sample data - Replace with Firebase data
const samplePosts: ExplorePostData[] = [
  {
    id: "1",
    type: "image",
    mediaUrl: "https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=400&h=400&fit=crop",
    username: "naturelover",
    name: "Nature Lover",
    likes: 1234,
    comments: 89,
    aspectRatio: "square",
  },
  {
    id: "2",
    type: "video",
    mediaUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    username: "filmmaker",
    name: "Film Maker",
    likes: 5678,
    comments: 234,
    aspectRatio: "landscape",
  },
  {
    id: "3",
    type: "text",
    text: "The future belongs to those who believe in the beauty of their dreams. Keep pushing forward!",
    username: "motivator",
    name: "Daily Motivation",
    likes: 892,
    comments: 45,
    aspectRatio: "square",
  },
  {
    id: "4",
    type: "image",
    mediaUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=600&fit=crop",
    username: "traveler",
    name: "World Traveler",
    likes: 3456,
    comments: 156,
    aspectRatio: "portrait",
  },
  {
    id: "5",
    type: "image",
    mediaUrl: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=400&fit=crop",
    username: "techie",
    name: "Tech Enthusiast",
    likes: 2341,
    comments: 78,
    aspectRatio: "square",
  },
  {
    id: "6",
    type: "text",
    text: "Code is like humor. When you have to explain it, it's bad. Keep it clean and simple!",
    username: "coder",
    name: "Code Master",
    likes: 4521,
    comments: 167,
    aspectRatio: "square",
  },
  {
    id: "7",
    type: "image",
    mediaUrl: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=600&h=400&fit=crop",
    username: "naturephotos",
    name: "Nature Photos",
    likes: 6789,
    comments: 321,
    aspectRatio: "landscape",
  },
  {
    id: "8",
    type: "video",
    mediaUrl: "https://www.w3schools.com/html/movie.mp4",
    username: "videocreator",
    name: "Video Creator",
    likes: 1567,
    comments: 89,
    aspectRatio: "square",
  },
  {
    id: "9",
    type: "image",
    mediaUrl: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=400&h=400&fit=crop",
    username: "landscapes",
    name: "Landscape Artist",
    likes: 8901,
    comments: 432,
    aspectRatio: "square",
  },
  {
    id: "10",
    type: "text",
    text: "Success is not final, failure is not fatal: It is the courage to continue that counts.",
    username: "wisdom",
    name: "Daily Wisdom",
    likes: 3267,
    comments: 145,
    aspectRatio: "portrait",
  },
  {
    id: "11",
    type: "image",
    mediaUrl: "https://images.unsplash.com/photo-1542281286-9e0a16bb7366?w=400&h=400&fit=crop",
    username: "foodie",
    name: "Food Lover",
    likes: 2134,
    comments: 67,
    aspectRatio: "square",
  },
  {
    id: "12",
    type: "image",
    mediaUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=400&fit=crop",
    username: "gadgets",
    name: "Gadget World",
    likes: 4532,
    comments: 189,
    aspectRatio: "square",
  },
];

// Tab types
type TabType = "foryou" | "trending" | "news" | "sports" | "entertainment";

interface Tab {
  id: TabType;
  label: string;
}

const tabs: Tab[] = [
  { id: "foryou", label: "For You" },
  { id: "trending", label: "Trending" },
  { id: "news", label: "News" },
  { id: "sports", label: "Sports" },
  { id: "entertainment", label: "Entertainment" },
];

export const Explore = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<TabType>("foryou");
  const [posts, setPosts] = useState<ExplorePostData[]>(samplePosts);
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
    // Animate tab indicator
    if (tabsRef.current && indicatorRef.current) {
      const activeTabElement = tabsRef.current.querySelector(`[data-tab="${activeTab}"]`);
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

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);

    // Animate posts on tab change
    gsap.fromTo(
      ".explore-grid",
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }
    );
  };

  return (
    <div
      ref={containerRef}
      className="flex-grow border-x border-gray-100 w-full overflow-hidden"
    >
      {/* Header with Search */}
      <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-gray-200">
        {/* Search Bar */}
        <div className="p-3 sm:p-4">
          <ExploreSearch onSearch={handleSearch} />
        </div>

        {/* Tabs */}
        <div ref={tabsRef} className="relative flex px-2 sm:px-4 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              data-tab={tab.id}
              onClick={() => handleTabChange(tab.id)}
              className={`flex-1 min-w-fit py-3 sm:py-4 px-2 sm:px-0 text-xs sm:text-sm font-medium transition-colors relative whitespace-nowrap ${
                activeTab === tab.id
                  ? "text-gray-900"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {tab.label}
            </button>
          ))}
          {/* Tab Indicator */}
          <div
            ref={indicatorRef}
            className="absolute bottom-0 h-1 bg-sky-400 rounded-full"
            style={{ width: 0 }}
          />
        </div>
      </div>

      {/* Grid Content */}
      <div className="explore-grid p-1 sm:p-2">
        <ExploreGrid posts={posts} searchQuery={searchQuery} />
      </div>
    </div>
  );
};

export default Explore;
