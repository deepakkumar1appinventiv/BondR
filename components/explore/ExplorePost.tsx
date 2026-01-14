"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import {
  HeartIcon,
  ChatBubbleOvalLeftIcon,
  PlayIcon,
  PauseIcon,
  SpeakerWaveIcon,
  SpeakerXMarkIcon,
} from "@heroicons/react/24/outline";
import { HeartIcon as HeartSolid } from "@heroicons/react/24/solid";

export interface ExplorePostData {
  id: string;
  type: "image" | "video" | "text";
  mediaUrl?: string;
  text?: string;
  username: string;
  name: string;
  likes: number;
  comments: number;
  aspectRatio?: "square" | "portrait" | "landscape";
}

interface ExplorePostProps {
  data: ExplorePostData;
  index: number;
}

export const ExplorePost = ({ data, index }: ExplorePostProps) => {
  const postRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const [isLiked, setIsLiked] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (postRef.current) {
      gsap.fromTo(
        postRef.current,
        {
          opacity: 0,
          y: 50,
          scale: 0.9
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          delay: index * 0.1,
          ease: "power3.out",
        }
      );
    }
  }, [index]);

  const handleMouseEnter = () => {
    setIsHovered(true);

    if (postRef.current) {
      gsap.to(postRef.current, {
        scale: 1.02,
        duration: 0.3,
        ease: "power2.out",
      });
    }

    if (overlayRef.current) {
      gsap.to(overlayRef.current, {
        opacity: 1,
        duration: 0.3,
      });
    }

    if (data.type === "video" && videoRef.current) {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);

    if (postRef.current) {
      gsap.to(postRef.current, {
        scale: 1,
        duration: 0.3,
        ease: "power2.out",
      });
    }

    if (overlayRef.current) {
      gsap.to(overlayRef.current, {
        opacity: 0,
        duration: 0.3,
      });
    }

    if (data.type === "video" && videoRef.current) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsLiked(!isLiked);

    if (postRef.current) {
      gsap.fromTo(
        postRef.current,
        { scale: 1 },
        {
          scale: 1.1,
          duration: 0.15,
          yoyo: true,
          repeat: 1,
          ease: "power2.inOut",
        }
      );
    }
  };

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const getGridSpan = () => {
    if (data.aspectRatio === "portrait") return "row-span-2";
    if (data.aspectRatio === "landscape") return "col-span-2";
    return "";
  };

  const renderMedia = () => {
    if (data.type === "video") {
      return (
        <div className="relative w-full h-full">
          <video
            ref={videoRef}
            src={data.mediaUrl}
            className="w-full h-full object-cover"
            loop
            muted={isMuted}
            playsInline
          />
          {isHovered && (
            <div className="absolute bottom-3 left-3 flex space-x-2">
              <button
                onClick={togglePlay}
                className="p-2 bg-black/50 rounded-full hover:bg-black/70 transition-colors"
              >
                {isPlaying ? (
                  <PauseIcon className="w-5 h-5 text-white" />
                ) : (
                  <PlayIcon className="w-5 h-5 text-white" />
                )}
              </button>
              <button
                onClick={toggleMute}
                className="p-2 bg-black/50 rounded-full hover:bg-black/70 transition-colors"
              >
                {isMuted ? (
                  <SpeakerXMarkIcon className="w-5 h-5 text-white" />
                ) : (
                  <SpeakerWaveIcon className="w-5 h-5 text-white" />
                )}
              </button>
            </div>
          )}
        </div>
      );
    }

    if (data.type === "image") {
      return (
        <Image
          src={data.mediaUrl || "/assets/Bondr.jpg"}
          alt={`Post by ${data.username}`}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 50vw, 33vw"
        />
      );
    }

    // Text post
    return (
      <div className="w-full h-full bg-gradient-to-br from-sky-400 via-purple-400 to-pink-400 flex items-center justify-center p-4">
        <p className="text-white text-center font-medium text-sm md:text-base line-clamp-4">
          {data.text}
        </p>
      </div>
    );
  };

  return (
    <div
      ref={postRef}
      className={`relative rounded-lg overflow-hidden cursor-pointer ${getGridSpan()} min-h-[200px] md:min-h-[250px]`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {renderMedia()}

      {/* Overlay */}
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-black/40 opacity-0 flex flex-col justify-between p-3"
      >
        {/* User Info */}
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-sky-400 to-pink-400 flex items-center justify-center">
            <span className="text-white text-xs font-bold">
              {data.name.charAt(0).toUpperCase()}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-white text-sm font-semibold">{data.name}</span>
            <span className="text-white/70 text-xs">@{data.username}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-center space-x-6">
          <button
            onClick={handleLike}
            className="flex items-center space-x-1 text-white hover:scale-110 transition-transform"
          >
            {isLiked ? (
              <HeartSolid className="w-6 h-6 text-red-500" />
            ) : (
              <HeartIcon className="w-6 h-6" />
            )}
            <span className="text-sm">{isLiked ? data.likes + 1 : data.likes}</span>
          </button>
          <button className="flex items-center space-x-1 text-white hover:scale-110 transition-transform">
            <ChatBubbleOvalLeftIcon className="w-6 h-6" />
            <span className="text-sm">{data.comments}</span>
          </button>
        </div>
      </div>

      {/* Video indicator */}
      {data.type === "video" && !isHovered && (
        <div className="absolute top-3 right-3 p-2 bg-black/50 rounded-full">
          <PlayIcon className="w-4 h-4 text-white" />
        </div>
      )}
    </div>
  );
};

export default ExplorePost;
