import React from "react";

export default function SidebarSkeleton() {
  return (
    <aside className="h-full w-20 lg:w-72 border-r border-base-300 flex flex-col gap-2 bg-white dark:bg-[#171717]">
      <div className="border-b border-base-300 w-full p-5">
        <div className="flex items-center gap-2 animate-pulse">
          <div className="w-6 h-6 bg-gray-300 dark:bg-[#212121] rounded-md" />
          <div className="h-4 bg-gray-300 dark:bg-[#212121] rounded-md w-24 hidden lg:block" />
        </div>
        <div className="flex items-center gap-2 animate-pulse">
          <div className="w-6 h-6 bg-gray-300 dark:bg-[#212121] rounded-md" />
          <div className="h-4 bg-gray-300 dark:bg-[#212121] rounded-md w-24 hidden lg:block" />
        </div>
      </div>

      <div className="overflow-y-auto w-full py-3 space-y-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="w-full p-3 flex items-center gap-3 animate-pulse"
          >
            <div className="size-12 bg-gray-300 dark:bg-[#212121] rounded-full" />
            <div className="hidden lg:block  flex-col gap-1 w-full">
              <div className="h-4 bg-gray-300 dark:bg-[#212121] rounded-md w-3/4 " />
              <div className="h-3 bg-gray-300  dark:bg-[#212121] rounded-md w-1/2" />
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
}
