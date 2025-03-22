import { Link } from "react-router-dom";
import { LogOut, MessageSquareMore, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/slices/authSlice";
import DarkModeToggle from "./ThemeToggleButton";

const Navbar = () => {
  const { authUser } = useSelector((store) => store.auth);
  const dispatch = useDispatch();

  async function handleLogout() {
    dispatch(logout());
  }

  return (
    <header className="border-b border-gray-300 dark:border-[#252525] fixed w-full top-0 z-40 backdrop-blur-lg bg-slate-100/80 dark:bg-[#171717]/80">
      <div className="container mx-auto px-4 h-16">
        <div className="flex items-center justify-between h-full">
          <div className="flex items-center gap-8">
            <Link
              to="/"
              className="flex items-center gap-2.5 hover:opacity-80 transition-all"
            >
              <div className="size-9 rounded-lg bg-primary/10 dark:bg-primary/20 flex items-center justify-center p-2">
                <MessageSquareMore className="w-5 h-5 text-primary dark:text-primary-light" />
              </div>
              <h1 className="text-lg font-bold text-gray-900 dark:text-gray-100">
                Lume
              </h1>
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <DarkModeToggle />

            {authUser && (
              <>
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-2 hover:bg-gray-200 dark:hover:bg-gray-700 focus:ring-2 rounded-md transition-all"
                >
                  <Link
                    to="/profile"
                    className="flex gap-2 justify-center items-center"
                  >
                    <User className="w-5 h-5 text-gray-900 dark:text-gray-100" />
                    <span className="hidden sm:inline text-gray-900 dark:text-gray-100">
                      Profile
                    </span>
                  </Link>
                </Button>

                <Button
                  onClick={handleLogout}
                  variant="outline"
                  size="sm"
                  className="gap-2 hover:bg-gray-200 dark:hover:bg-gray-700 focus:ring-2 rounded-md transition-all"
                >
                  <LogOut className="w-5 h-5 text-gray-900 dark:text-gray-100" />
                  <span className="hidden sm:inline text-gray-900 dark:text-gray-100">
                    Logout
                  </span>
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
