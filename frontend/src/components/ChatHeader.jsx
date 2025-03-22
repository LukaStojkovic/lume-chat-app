import { useSocketContext } from "@/context/SocketContext";
import { setSelectedUser } from "@/slices/chatSlice";
import { XCircle } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

const ChatHeader = () => {
  const { selectedUser } = useSelector((store) => store.chat);
  const { onlineUsers } = useSocketContext();
  const dispatch = useDispatch();

  return (
    <div className="p-3 border-b border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="relative w-11 h-11 rounded-full overflow-hidden border border-neutral-400 dark:border-neutral-600">
            <img
              src={selectedUser.profilePicture || "/avatar.jpg"}
              alt={selectedUser.fullName}
              className="w-full h-full object-cover"
            />
          </div>

          <div>
            <h3 className="font-semibold text-lg text-neutral-800 dark:text-neutral-100">
              {selectedUser.fullName}
            </h3>
            <p
              className={`text-sm ${
                onlineUsers.includes(selectedUser._id)
                  ? "text-green-500"
                  : "text-neutral-500 dark:text-neutral-400"
              }`}
            >
              {onlineUsers.includes(selectedUser._id) ? "Online" : "Offline"}
            </p>
          </div>
        </div>

        <button
          onClick={() => dispatch(setSelectedUser(null))}
          className="p-1.5 rounded-full hover:bg-neutral-200 dark:hover:bg-neutral-700 transition"
        >
          <XCircle className="w-5 h-5 text-neutral-600 dark:text-neutral-300" />
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;
