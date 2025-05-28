import React, { useState } from "react";
import { Link } from "react-router-dom";
import { BrandingFlowType } from "@/types/branding-flows";
import MessengerContainer from "../components/messenger-experimental/MessengerContainer";
import { Button } from "@/components/ui/button";

const MessengerUIExperiments: React.FC = () => {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [selectedFlowType, setSelectedFlowType] = useState<BrandingFlowType>("onUserMessage");

  // Toggle theme for demonstration purposes
  const toggleTheme = () => {
    setTheme(prev => prev === "light" ? "dark" : "light");
  };

  return (
    <div className={`min-h-screen bg-gray-50 dark:bg-gray-900 ${theme === "dark" ? "dark" : ""}`}>
      <div className="container mx-auto py-8">
        <div className="mb-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Messenger UI Experiments</h1>
          <div className="flex space-x-4">
            <Link to="/" className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg">
              Back to Home
            </Link>
            <button onClick={toggleTheme} className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg">
              Toggle {theme === "light" ? "Dark" : "Light"} Mode
            </button>
          </div>
        </div>

        <div className="mb-6 bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <div className="mb-4">
            <Button variant="outline">Messenger UI Experiments</Button>
          </div>
          <div>
            <h2 className="text-lg font-semibold mb-2">About this messenger</h2>
            <p className="text-gray-700 dark:text-gray-300">
              This page shows the current experimental messenger UI. All switching and classic UI code has been removed for clarity and focus.
            </p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-2/3 mx-auto">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 h-[600px] flex items-center justify-center">
              <MessengerContainer 
                flowType={selectedFlowType}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessengerUIExperiments;
