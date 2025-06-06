import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider } from "./context/AuthContext";
import { UserProvider } from "./context/UserContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <UserProvider>
        <BrowserRouter>
          <ThemeProvider>
            <div className="min-h-screen flex flex-col font-sans bg-background text-gray-900 dark:bg-background-dark dark:text-gray-100 transition-colors duration-300">
              <Navbar />
              <div className="flex-grow">
                <App />
              </div>
              <Footer />
            </div>
          </ThemeProvider>
        </BrowserRouter>
      </UserProvider>
    </AuthProvider>
  </React.StrictMode>
);
