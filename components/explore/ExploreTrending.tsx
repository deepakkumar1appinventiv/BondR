"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { EllipsisHorizontalIcon, FireIcon } from "@heroicons/react/24/outline";

interface TrendingItem {
  id: string;
  category: string;
  hashtag: string;
  posts: string;
}

interface ExploreTrendingProps {
  trends?: TrendingItem[];
}

const defaultTrends: TrendingItem[] = [
  { id: "1", category: "Technology", hashtag: "#ReactJS", posts: "250K" },
  { id: "2", category: "Entertainment", hashtag: "#Movies2024", posts: "180K" },
  { id: "3", category: "Sports", hashtag: "#Cricket", posts: "320K" },
  { id: "4", category: "Music", hashtag: "#NewRelease", posts: "95K" },
  { id: "5", category: "Gaming", hashtag: "#Gaming", posts: "410K" },
];

export const ExploreTrending = ({ trends = defaultTrends }: ExploreTrendingProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    if (containerRef.current) {
      gsap.fromTo(
        containerRef.current,
        { x: 50, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.5, ease: "power2.out" }
      );
    }

    // Stagger animation for trend items
    if (itemsRef.current.length > 0) {
      gsap.fromTo(
        itemsRef.current,
        { x: 20, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.4,
          stagger: 0.1,
          delay: 0.3,
          ease: "power2.out",
        }
      );
    }
  }, []);

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
        <FireIcon className="w-6 h-6 text-orange-500" />
        <h2 className="text-xl font-bold text-gray-800">Trending</h2>
      </div>

      <div className="space-y-1">
        {trends.map((trend, index) => (
          <div
            key={trend.id}
            ref={(el) => {
              if (el) itemsRef.current[index] = el;
            }}
            className="flex flex-col py-3 px-2 rounded-lg cursor-pointer transition-colors"
            onMouseEnter={() => handleItemHover(index, true)}
            onMouseLeave={() => handleItemHover(index, false)}
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
  );
};

export default ExploreTrending;
