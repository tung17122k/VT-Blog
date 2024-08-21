import { Routes } from "react-router-dom";
import { AuthProvider } from "./context/authContext";
import "./App.css";

function App() {
  return (
    <div>
      <AuthProvider>
        <Routes></Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
