import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/authContext";
import SignUpPage from "./pages/SignUpPage";
import SignInPage from "./pages/SignInPage";
import "./App.css";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import PostDetailPage from "./pages/PostDetailPage";
import DashboardPage from "./pages/DashboardPage";

function App() {
  return (
    <div>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<HomePage></HomePage>}></Route>
          <Route path="/sign-up" element={<SignUpPage></SignUpPage>}></Route>
          <Route path="/sign-in" element={<SignInPage></SignInPage>}></Route>
          <Route path="*" element={<NotFoundPage></NotFoundPage>}></Route>
          <Route
            // path="/:slug"
            path="/post-detail"
            element={<PostDetailPage></PostDetailPage>}
          ></Route>
          <Route
            path="/dashboard"
            element={<DashboardPage></DashboardPage>}
          ></Route>
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
