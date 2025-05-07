
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
    <div className={`min-h-screen ${theme === "dark" ? "dark" : ""}`}>
      <div className="container mx-auto py-8">
        <div className="mb-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Web Messenger Prototype</h1>
          <div className="flex space-x-4">
            <Link to="/design-tokens" className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg">
              View Design Tokens
            </Link>
            <Link to="/branding-flows" className="px-4 py-2 bg-blue-500 text-white dark:bg-blue-600 rounded-lg">
              Branding Flows Prototype
            </Link>
            <button
              onClick={toggleTheme}
              className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg"
            >
              Toggle {theme === "light" ? "Dark" : "Light"} Mode
            </button>
          </div>
        </div>
        <p className="mb-6">
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
