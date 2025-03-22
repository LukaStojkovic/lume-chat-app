import HomePage from "@/pages/HomePage";
import LoginPage from "@/pages/LoginPage";
import ProfilePage from "@/pages/ProfilePage";
import SignupPage from "@/pages/SignupPage";
import { Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkAuth } from "./slices/authSlice";
import Spinner from "./components/ui/Spinner";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  const dispatch = useDispatch();
  const { authUser, isCheckingAuth } = useSelector((store) => store.auth);

  useEffect(() => {
    dispatch(checkAuth());
  }, [checkAuth]);

  if (isCheckingAuth && !authUser) {
    return <Spinner />;
  }

  return (
    <div>
      <Navbar />

      <Routes>
        <Route
          path="/"
          element={authUser ? <HomePage /> : <Navigate to="/login" />}
        />
        <Route
          path="/signup"
          element={!authUser ? <SignupPage /> : <Navigate to="/" />}
        />
        <Route
          path="/login"
          element={!authUser ? <LoginPage /> : <Navigate to="/" />}
        />
        <Route
          path="/profile"
          element={authUser ? <ProfilePage /> : <Navigate to="/login" />}
        />
        <Route path="*" exact={true} element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;
