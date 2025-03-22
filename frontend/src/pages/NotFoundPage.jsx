import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 dark:bg-[#212121] text-gray-900 dark:text-gray-100">
      <h1 className="text-6xl font-bold">404</h1>
      <p className="text-xl mt-2">Page Not Found</p>
      <Link to="/">
        <Button className="mt-4 cursor-pointer">Go Home</Button>
      </Link>
    </div>
  );
}
