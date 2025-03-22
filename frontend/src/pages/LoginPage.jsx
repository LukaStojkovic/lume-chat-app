import { useState } from "react";
import { Link } from "react-router-dom";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import AuthMotionScreen from "@/components/AuthMotionScreen";
import { useDispatch, useSelector } from "react-redux";
import MiniSpinner from "@/components/ui/MiniSpinner";
import { useForm } from "react-hook-form";
import { login } from "@/slices/authSlice";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { isLoggingIn } = useSelector((store) => store.auth);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();

  function onSubmit(formData) {
    dispatch(login(formData));
  }

  return (
    <div className="h-screen grid lg:grid-cols-2 bg-gray-100 dark:bg-gray-900">
      <div className="flex flex-col justify-center items-center p-6 sm:p-12 bg-white shadow-xl rounded-lg dark:bg-gray-800">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-2 group">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center group-hover:bg-opacity-80 transition-all">
                <Mail className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-3xl font-semibold mt-2 text-gray-900 dark:text-white">
                Welcome Back
              </h1>
              <p className="text-base text-gray-600 dark:text-gray-300">
                Sign in to access your account
              </p>
            </div>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium text-gray-900 dark:text-white">
                  Email
                </span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <Input
                  type="email"
                  className="w-full pl-10 bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600"
                  placeholder="you@example.com"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
                      message: "Invalid email format",
                    },
                  })}
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium text-gray-900 dark:text-white">
                  Password
                </span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <Input
                  type={showPassword ? "text" : "password"}
                  className="w-full pl-10 bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600"
                  placeholder="••••••••"
                  {...register("password", {
                    required: "Password is required",
                  })}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            <Button
              className="w-full bg-blue-500 hover:bg-blue-600 text-white dark:bg-blue-600 dark:hover:bg-blue-700"
              disabled={isLoggingIn}
            >
              {isLoggingIn ? (
                <>
                  <MiniSpinner />
                  Loading...
                </>
              ) : (
                "Sign in"
              )}
            </Button>
          </form>

          <div className="text-center">
            <p className="text-gray-600 dark:text-gray-300">
              Don&apos;t have an account?{" "}
              <Link
                to="/signup"
                className="text-blue-500 hover:underline dark:text-blue-400"
              >
                Create account
              </Link>
            </p>
          </div>
        </div>
      </div>

      <AuthMotionScreen
        title="Join the conversation!"
        subtitle="Stay connected with your friends and family, share messages, and enjoy seamless communication."
      />
    </div>
  );
};

export default LoginPage;
