import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/authContext";
import SignUpPage from "./pages/SignUpPage";
import "./App.css";

function App() {
  return (
    <div>
      <AuthProvider>
        <Routes>
          <Route path="/sign-up" element={<SignUpPage></SignUpPage>}></Route>
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
