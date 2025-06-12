import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MessengerContainer from "../components/messenger/MessengerContainer";

const Index = () => {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  // Toggle theme for demonstration purposes
  const toggleTheme = () => {
    setTheme(prev => prev === "light" ? "dark" : "light");
  };

  useEffect(() => {
    // Apply theme to document
    document.documentElement.className = theme;
  }, [theme]);

  return (
    <div
      className={`min-h-screen ${theme === "dark" ? "dark" : ""}`}
      style={{
        background: 'linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab)',
        backgroundSize: '400% 400%',
        animation: 'gradient 15s ease infinite'
      }}
    >
      <div className="container mx-auto py-8">
        <div className="mb-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-white drop-shadow-lg">Web Messenger Prototype</h1>
          <div className="flex space-x-4">
            <Link to="/design-tokens" className="px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-lg hover:bg-white/30 transition-colors">
              View Design Tokens
            </Link>
            <button
              onClick={toggleTheme}
              className="px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-lg hover:bg-white/30 transition-colors"
            >
              Toggle {theme === "light" ? "Dark" : "Light"} Mode
            </button>
          </div>
        </div>

        <p className="mb-6 text-white drop-shadow-lg">
          A messaging component prototype with AI assistant and human agent handoff.
          <br />
          Click the launcher in the bottom right corner to open the messenger.
          <br />
          Try typing "I want to speak to a human" in the messenger to see the handoff flow.
        </p>

        {/* Messenger container will handle the launcher and messenger */}
        <MessengerContainer />
      </div>
    </div>
  );
};

export default Index;
