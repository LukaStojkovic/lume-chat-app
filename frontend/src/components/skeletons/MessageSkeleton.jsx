const MessageSkeleton = () => {
  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-white dark:bg-[#171717]">
      {Array.from({ length: 6 }).map((_, idx) => (
        <div key={idx} className="flex items-center gap-3 animate-pulse">
          <div className="size-12 bg-gray-300 dark:bg-[#212121] rounded-full" />

          <div className="hidden lg:block flex-col gap-1 w-full">
            <div className="h-4 bg-gray-300 dark:bg-[#212121] rounded-md w-3/4" />
            <div className="h-3 bg-gray-300 dark:bg-[#212121] rounded-md w-1/2" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default MessageSkeleton;
