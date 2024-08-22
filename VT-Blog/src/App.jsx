import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/authContext";
import SignUpPage from "./pages/SignUpPage";
import SignInPage from "./pages/SignInPage";
import "./App.css";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  return (
    <div>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<HomePage></HomePage>}></Route>
          <Route path="/sign-up" element={<SignUpPage></SignUpPage>}></Route>
          <Route path="/sign-in" element={<SignInPage></SignInPage>}></Route>
          <Route path="*" element={<NotFoundPage></NotFoundPage>}></Route>
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
