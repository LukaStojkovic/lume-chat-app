import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers, setSelectedUser } from "@/slices/chatSlice";
import SidebarSkeleton from "./skeletons/SidebarSkeleton";
import { Users } from "lucide-react";
import { useSocketContext } from "@/context/SocketContext";

const Sidebar = () => {
  const dispatch = useDispatch();
  const { users, selectedUser, isUsersLoading } = useSelector(
    (store) => store.chat
  );
  const { onlineUsers } = useSocketContext();
  const [checked, setChecked] = useState(false);

  const filteredUsers = checked
    ? users.filter((user) => onlineUsers.includes(user._id))
    : users;

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  if (isUsersLoading) return <SidebarSkeleton />;

  return (
    <aside className="h-full w-20 lg:w-72 border-r border-neutral-300 dark:border-neutral-700 bg-white dark:bg-[#171717] flex flex-col transition-all duration-200">
      <div className="border-b border-neutral-300 dark:border-neutral-700 w-full p-5">
        <div className="flex items-center gap-2">
          <Users className="size-6 text-gray-900 dark:text-gray-100" />
          <span className="font-medium hidden lg:block text-gray-900 dark:text-gray-100">
            Contacts
          </span>
        </div>

        <div className="mt-3 hidden lg:flex items-center gap-2">
          <label className="cursor-pointer flex items-center gap-2 text-gray-900 dark:text-gray-100">
            <input
              type="checkbox"
              className="checkbox checkbox-sm"
              onChange={() => setChecked((prev) => !prev)}
              checked={checked}
            />
            <span className="text-sm">Show online users</span>
          </label>
          <span className="text-xs text-zinc-500 dark:text-zinc-400">
            ({onlineUsers.length - 1} online)
          </span>
        </div>
      </div>

      <div className="overflow-y-auto w-full py-3">
        {filteredUsers.map((user) => (
          <button
            key={user._id}
            onClick={() => dispatch(setSelectedUser(user))}
            className={`w-full p-3 flex items-center gap-3 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors cursor-pointer ${
              selectedUser?._id === user._id
                ? "bg-neutral-200 dark:bg-neutral-700 ring-1 ring-neutral-300 dark:ring-neutral-600"
                : ""
            }`}
          >
            <div className="relative mx-auto lg:mx-0">
              <img
                src={user.profilePicture || "/avatar.jpg"}
                alt={user.name}
                className="size-12 object-cover rounded-full"
              />
              {onlineUsers.includes(user._id) && (
                <span className="absolute bottom-0 right-0 size-3 bg-green-500 rounded-full ring-2 ring-white dark:ring-gray-900" />
              )}
            </div>

            <div className="hidden lg:block text-left min-w-0">
              <div className="font-medium truncate text-gray-900 dark:text-gray-100">
                {user.fullName}
              </div>
              <div className="text-sm text-zinc-400 dark:text-zinc-500">
                {onlineUsers.includes(user._id) ? "Online" : "Offline"}
              </div>
            </div>
          </button>
        ))}

        {filteredUsers.length === 0 && (
          <div className="text-center text-zinc-500 dark:text-zinc-400 py-4">
            No online users
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
