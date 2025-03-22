import { useSocketContext } from "@/context/SocketContext";
import { setMessages } from "@/slices/chatSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function useListenMessages() {
  const { socket } = useSocketContext();
  const dispatch = useDispatch();
  const { selectedUser } = useSelector((store) => store.chat);

  useEffect(() => {
    socket?.on("newMessage", (newMessage) => {
      if (newMessage.senderId !== selectedUser._id) return;
      dispatch(setMessages(newMessage));
    });

    return () => socket.off("newMessage");
  }, [socket, dispatch, selectedUser]);
}
