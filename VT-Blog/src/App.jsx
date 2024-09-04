import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/authContext";
import SignUpPage from "./pages/SignUpPage";
import SignInPage from "./pages/SignInPage";
import "./App.css";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import PostDetailPage from "./pages/PostDetailPage";
import DashboardPage from "./pages/DashboardPage";
import PostManage from "./module/post/PostManage";
import PostAddNew from "./module/post/PostAddNew";
import DashboardLayout from "./module/dashboard/DashboardLayout";
import CategoryAddNew from "./module/category/CategoryAddNew";
import CategoryManager from "./module/category/CategoryManager";

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
            path="/:slug"
            // path="/post-detail"
            element={<PostDetailPage></PostDetailPage>}
          ></Route>
          <Route element={<DashboardLayout></DashboardLayout>}>
            <Route
              path="/dashboard"
              element={<DashboardPage></DashboardPage>}
            ></Route>
            <Route
              path="/manage/post"
              element={<PostManage></PostManage>}
            ></Route>
            <Route
              path="/manage/add-post"
              element={<PostAddNew></PostAddNew>}
            ></Route>
            <Route
              path="/manage/add-category"
              element={<CategoryAddNew></CategoryAddNew>}
            ></Route>
            <Route
              path="/manage/category"
              element={<CategoryManager></CategoryManager>}
            ></Route>
          </Route>
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
