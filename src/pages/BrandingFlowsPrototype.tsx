
import React, { useState } from "react";
import MessengerContainer from "../components/messenger/MessengerContainer";
import { Link } from "react-router-dom";
import MessengerPreview from "../components/branding-prototype/MessengerPreview";

const BrandingFlowsPrototype: React.FC = () => {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  // Toggle theme for demonstration purposes
  const toggleTheme = () => {
    setTheme(prev => prev === "light" ? "dark" : "light");
  };

  return <div className={`min-h-screen bg-gray-50 dark:bg-gray-900 ${theme === "dark" ? "dark" : ""}`}>
      <div className="container mx-auto py-8">
        <div className="mb-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Branding Prototype</h1>
          <div className="flex space-x-4">
            <Link to="/" className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg">
              Back to Home
            </Link>
            <button onClick={toggleTheme} className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg">
              Toggle {theme === "light" ? "Dark" : "Light"} Mode
            </button>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-1/3">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
              <h2 className="text-lg font-medium mb-4">Branding Flow</h2>
              <div className="space-y-2">
                <button className="w-full text-left p-3 rounded-md transition-colors bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200">
                  <div className="font-medium">On user first message</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Branding disappears when user sends a message</div>
                </button>
              </div>
            </div>
          </div>
          <div className="md:w-2/3">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 h-[700px]">
              <h2 className="text-lg font-medium mb-4">Preview</h2>
              <div className="h-[600px] border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                <MessengerPreview flowType="onUserMessage" />
              </div>
            </div>
          </div>
        </div>
        
        {/* Add the MessengerContainer here, which includes the launcher and messenger */}
        <MessengerContainer />
      </div>
    </div>;
};

export default BrandingFlowsPrototype;
