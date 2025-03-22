import { Camera, Mail, User } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { updateProfile } from "@/slices/authSlice";

const ProfilePage = () => {
  const { authUser, isUpdatingProfile } = useSelector((store) => store.auth);
  const [selectedImage, setSelectedImage] = useState(null);
  const dispatch = useDispatch();

  async function handleImageUpload(e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImage(base64Image);
      dispatch(updateProfile({ profilePicture: base64Image }));
    };
  }

  return (
    <div className=" dark:bg-[#212121] bg-[#E5E7EB] h-screen pt-20">
      <div className="max-w-2xl mx-auto p-4 py-8">
        <Card className="space-y-8 dark:bg-neutral-800 dark:border-neutral-700">
          <CardHeader>
            <div className="text-center">
              <h1 className="text-2xl font-semibold text-neutral-900 dark:text-white">
                Profile
              </h1>
              <p className="mt-2 text-neutral-500 dark:text-neutral-400">
                Your profile information
              </p>
            </div>
          </CardHeader>

          <CardContent className="flex flex-col items-center gap-4">
            <div className="relative">
              <img
                src={selectedImage || authUser.profilePicture || "/avatar.jpg"}
                className="size-32 rounded-full object-cover border-4 border-neutral-400 dark:border-neutral-600"
              />
              <label
                htmlFor="avatar-upload"
                className={`absolute bottom-0 bg-gray-200 right-0 dark:bg-neutral-700 bg-base-content hover:scale-105 p-2 rounded-full cursor-pointer transition-all duration-200 ${
                  isUpdatingProfile ? "animate-pulse pointer-events-none" : ""
                }`}
              >
                <Camera className="w-5 h-5 text-base-200" />
                <input
                  type="file"
                  id="avatar-upload"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={isUpdatingProfile}
                />
              </label>
            </div>
            <p className="text-sm text-zinc-400 dark:text-neutral-300">
              {isUpdatingProfile
                ? "Uploading..."
                : "Click the camera icon to update your photo"}
            </p>
          </CardContent>

          <CardContent className="space-y-6">
            <div className="space-y-1.5">
              <div className="text-sm text-zinc-400 flex items-center gap-2">
                <User className="w-4 h-4" />
                Full Name
              </div>
              <p className="px-4 py-2.5 bg-gray-200 dark:bg-neutral-700 rounded-lg border text-gray-600 dark:text-gray-400 dark:border-neutral-600">
                {authUser?.fullName}
              </p>
            </div>

            <div className="space-y-1.5">
              <div className="text-sm text-zinc-400 flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email Address
              </div>
              <p className="px-4 py-2.5 bg-gray-200 dark:bg-neutral-700 text-gray-600 rounded-lg border dark:text-gray-400 dark:border-neutral-600">
                {authUser?.email}
              </p>
            </div>
          </CardContent>

          <CardContent className="mt-6">
            <h2 className="text-lg font-medium mb-4 text-neutral-900 dark:text-white">
              Account Information
            </h2>
            <div className="space-y-3 text-sm text-neutral-500 dark:text-neutral-400">
              <div className="flex items-center justify-between py-2 border-b border-zinc-700 dark:border-neutral-600">
                <span>Member Since</span>
                <span>{authUser.createdAt?.split("T")[0]}</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span>Account Status</span>
                <span className="text-green-500">Active</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProfilePage;
