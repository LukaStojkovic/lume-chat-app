import ChatContainer from "@/components/ChatContainer";
import NoChatSelected from "@/components/NoChatSelected";
import Sidebar from "@/components/Sidebar";
import React from "react";
import { useSelector } from "react-redux";

export default function HomePage() {
  const { selectedUser } = useSelector((store) => store.chat);

  return (
    <div className="h-screen bg-gray-200 dark:bg-[#212121]">
      <div className="flex items-center justify-center pt-25 px-4">
        <div className="bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md w-full max-w-6xl h-[calc(100vh-8rem)]">
          <div className="flex h-full rounded-lg overflow-hidden">
            <Sidebar />
            {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
          </div>
        </div>
      </div>
    </div>
  );
}
