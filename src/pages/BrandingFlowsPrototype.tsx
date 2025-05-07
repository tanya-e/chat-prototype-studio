
import React, { useState } from "react";
import MessengerContainer from "../components/messenger/MessengerContainer";
import { Link } from "react-router-dom";
import { BrandingFlowType } from "@/types/branding-flows";
import FlowsList from "../components/branding-prototype/FlowsList";

const BrandingFlowsPrototype: React.FC = () => {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [selectedFlowType, setSelectedFlowType] = useState<BrandingFlowType>("onUserMessage");

  // Toggle theme for demonstration purposes
  const toggleTheme = () => {
    setTheme(prev => prev === "light" ? "dark" : "light");
  };
  
  return <div className={`min-h-screen bg-gray-50 dark:bg-gray-900 ${theme === "dark" ? "dark" : ""}`}>
      <div className="container mx-auto py-8">
        <div className="mb-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold">'Powered by' flows explorations</h1>
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
          <h2 className="text-lg font-semibold mb-2">About these flows</h2>
          <p className="text-gray-700 dark:text-gray-300">
            "Powered by Fin" appears at the start of the conversation under the composer and disappears after a particular event. 
            Below are explorations of these different trigger events that control when the branding disappears.
          </p>
        </div>
        
        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-1/3">
            <FlowsList selectedFlow={selectedFlowType} onFlowSelect={setSelectedFlowType} />
          </div>
        </div>
        
        {/* Only the MessengerContainer with the actual launcher and messenger */}
        <MessengerContainer flowType={selectedFlowType} />
      </div>
    </div>;
};
export default BrandingFlowsPrototype;
