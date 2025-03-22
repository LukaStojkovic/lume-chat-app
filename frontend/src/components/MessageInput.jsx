import { sendMessage } from "@/slices/chatSlice";
import { Image, Send, X } from "lucide-react";
import React, { useRef, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

export default function MessageInput() {
  const { selectedUser } = useSelector((store) => store.chat);
  const fileInputRef = useRef();
  const dispatch = useDispatch();

  const [imagePreview, setImagePreview] = useState(null);
  const [text, setText] = useState("");

  function handleImageChange(e) {
    const file = e.target.files[0];

    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    const reader = new FileReader();

    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  }

  function removeImage() {
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  async function handleSendMessage(e) {
    e.preventDefault();
    if (!text.trim() && !imagePreview) return;
    try {
      const messageData = {
        text: text.trim(),
        image: imagePreview,
      };

      dispatch(sendMessage({ messageData, selectedUserId: selectedUser._id }));

      setText("");
      setImagePreview(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (err) {
      console.log("Failed to send message: ", err);
    }
  }

  return (
    <div className="p-4 w-full border-t border-neutral-300 bg-neutral-100 dark:border-neutral-700 dark:bg-neutral-900">
      {imagePreview && (
        <div className="mb-3 flex items-center gap-3">
          <div className="relative w-20 h-20 rounded-lg overflow-hidden border border-neutral-400 dark:border-neutral-600">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-full h-full object-cover"
            />
            <button
              onClick={removeImage}
              className="absolute top-0 right-0  w-5  h-5 flex items-center justify-center rounded-full bg-red-500  text-white hover:bg-red-600 transition"
              type="button"
            >
              <X className="size-4" />
            </button>
          </div>
        </div>
      )}

      <form onSubmit={handleSendMessage} className="flex items-center gap-3">
        <input
          type="text"
          className="flex-1 p-2 rounded-lg border border-neutral-400 dark:bg-neutral-800 dark:text-white dark:border-neutral-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Type a message..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <input
          type="file"
          accept="image/*"
          className="hidden"
          ref={fileInputRef}
          onChange={handleImageChange}
        />

        <button
          type="button"
          className={`p-2 rounded-full transition ${
            imagePreview ? "text-green-500" : "text-gray-500 dark:text-gray-400"
          } hover:bg-gray-200 dark:hover:bg-neutral-700`}
          onClick={() => fileInputRef.current?.click()}
        >
          <Image size={20} />
        </button>

        <button
          type="submit"
          className="p-2 rounded-full bg-blue-500 text-white hover:bg-blue-600 disabled:opacity-50 transition"
          disabled={!text.trim() && !imagePreview}
        >
          <Send size={20} />
        </button>
      </form>
    </div>
  );
}
