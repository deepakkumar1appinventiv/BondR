"use client";

import AddPostModal from "@/components/modals/AddPostModal";
import AddStoryModal from "@/components/modals/AddStoryModal";
import CommentModal from "@/components/modals/CommentModal";
import MobileNav from "@/components/MobileNav";
import { PostFeed } from "@/components/PostFeed";
import Sidebar from "@/components/Sidebar";
import { SignUpPrompt } from "@/components/SignUpPrompt";
import { Widgets } from "@/components/Widgets";
import { Explore } from "@/components/explore";
import { Notification } from "@/components/Notification";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

export default function Home() {
  const activeView = useSelector((state: RootState) => state.navigation.activeView);

  const renderMainContent = () => {
    switch (activeView) {
      case "Explore":
        return <Explore />;
      case "Notification":
        return <Notification />;
      case "Home":
      default:
        return <PostFeed />;
    }
  };

  return (
    <>
      <div className="text-[#0f1419] min-h-screen max-w-[1400px] mx-auto flex justify-center pb-14 sm:pb-0">
        {/* Left Sidebar */}
        <Sidebar />

        {/* Main Content Area */}
        <main className="flex-1 flex min-w-0">
          {renderMainContent()}
        </main>

        {/* Right Widgets */}
        <Widgets />
      </div>

      {/* Mobile Bottom Navigation */}
      <MobileNav />

      <CommentModal />
      <AddPostModal />
      <AddStoryModal />
      <SignUpPrompt />
    </>
  );
}
