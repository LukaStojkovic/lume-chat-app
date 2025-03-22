import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMessages } from "@/slices/chatSlice";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./skeletons/MessageSkeleton";
import { formatMessageTime } from "@/lib/utils";
import useListenMessages from "@/hooks/useListenMessages";

export default function ChatContainer() {
  const dispatch = useDispatch();
  const { authUser } = useSelector((store) => store.auth);
  useListenMessages();
  const { messages, isMessagesLoading, selectedUser } = useSelector(
    (store) => store.chat
  );

  const messageEndRef = useRef(null);

  useEffect(() => {
    dispatch(getMessages(selectedUser._id));
  }, [selectedUser._id, getMessages]);

  useEffect(() => {
    if (messageEndRef.current && messages)
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (isMessagesLoading)
    return (
      <div className="flex-1 flex flex-col overflow-auto">
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );

  return (
    <div className="flex-1 flex flex-col overflow-auto">
      <ChatHeader />

      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-neutral-50 dark:bg-neutral-900 rounded-lg shadow-lg scrollbar-thin scrollbar-thumb-gray-500 dark:scrollbar-thumb-gray-700 scrollbar-track-gray-100 dark:scrollbar-track-gray-800">
        {messages.length <= 0 && (
          <div className="flex justify-center items-center h-full">
            <span className="text-xl text-gray-500 font-semibold">
              No messages yet. Start the conversation!
            </span>
          </div>
        )}
        {messages.map((message) => (
          <div
            key={message._id}
            className={`flex ${
              message.senderId === authUser._id
                ? "flex-row-reverse"
                : "flex-row"
            } items-start space-x-3`}
            ref={messageEndRef}
          >
            <div className="flex-shrink-0 mx-2">
              <div className="w-10 h-10 rounded-full border-2 border-neutral-300 dark:border-neutral-700 overflow-hidden">
                <img
                  src={
                    message.senderId === authUser._id
                      ? authUser.profilePicture || "/avatar.jpg"
                      : selectedUser.profilePicture || "/avatar.jpg"
                  }
                  alt="profile pic"
                  className="object-cover w-full h-full"
                />
              </div>
            </div>

            <div>
              <div className="bg-white dark:bg-neutral-800 rounded-lg p-3 shadow-md max-w-[100%]">
                <div className="chat-header flex items-center justify-between mb-2">
                  <time className="text-xs text-neutral-500 dark:text-neutral-400">
                    {formatMessageTime(message.createdAt)}
                  </time>
                </div>
                <div className="chat-bubble flex flex-col">
                  {message.image && (
                    <img
                      src={message.image}
                      alt="Attachment"
                      className="max-w-[200px] rounded-md mb-2 object-cover"
                    />
                  )}
                  {message.text && (
                    <p className="text-sm text-neutral-700 dark:text-neutral-300">
                      {message.text}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <MessageInput />
    </div>
  );
}
