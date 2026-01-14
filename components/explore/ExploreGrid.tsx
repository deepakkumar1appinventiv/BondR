"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ExplorePost, { ExplorePostData } from "./ExplorePost";

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface ExploreGridProps {
  posts: ExplorePostData[];
  searchQuery: string;
}

export const ExploreGrid = ({ posts, searchQuery }: ExploreGridProps) => {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (gridRef.current) {
      // Initial grid animation
      gsap.fromTo(
        gridRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.5, ease: "power2.out" }
      );
    }
  }, []);

  useEffect(() => {
    // Animate on search query change
    if (gridRef.current) {
      gsap.fromTo(
        gridRef.current.children,
        {
          opacity: 0,
          y: 30,
          scale: 0.95
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.4,
          stagger: 0.05,
          ease: "power2.out",
        }
      );
    }
  }, [searchQuery]);

  // Filter posts based on search query
  const filteredPosts = posts.filter((post) => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      post.username.toLowerCase().includes(query) ||
      post.name.toLowerCase().includes(query) ||
      (post.text && post.text.toLowerCase().includes(query))
    );
  });

  if (filteredPosts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="text-6xl mb-4">🔍</div>
        <h3 className="text-xl font-semibold text-gray-700">No results found</h3>
        <p className="text-gray-500 mt-2">Try searching for something else</p>
      </div>
    );
  }

  return (
    <div
      ref={gridRef}
      className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-1 sm:gap-1.5 md:gap-2"
    >
      {filteredPosts.map((post, index) => (
        <ExplorePost key={post.id} data={post} index={index} />
      ))}
    </div>
  );
};

export default ExploreGrid;
