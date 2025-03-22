import useDarkMode from "@/hooks/useDarkMode";
import { Sun, Moon } from "lucide-react";

export default function DarkModeToggle() {
  const [isDark, setIsDark] = useDarkMode();

  return (
    <button
      onClick={() => setIsDark(!isDark)}
      className="cursor-pointer p-2 rounded-lg transition-all bg-gray-200 dark:bg-[#242629]"
    >
      {isDark ? <Sun /> : <Moon />}
    </button>
  );
}
