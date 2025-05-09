import React from "react";

export default function Spinner() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-10 h-10 border-4 border-gray-300 dark:border-gray-700 border-t-blue-500 dark:border-t-blue-300 rounded-full animate-spin"></div>
    </div>
  );
}
