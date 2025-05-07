
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
  
  return (
    <div className={`min-h-screen bg-background ${theme === "dark" ? "dark" : ""}`}>
      <div className="container mx-auto py-8 px-4">
        <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <h1 className="text-xl font-normal tracking-tight text-gray-800 dark:text-gray-100">'Powered by' Flows</h1>
          <div className="flex flex-wrap gap-3">
            <Link 
              to="/" 
              className="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded border border-gray-200 dark:border-gray-700 text-xs uppercase font-mono tracking-wider transition-colors hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              Back
            </Link>
            <button 
              onClick={toggleTheme}
              className="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded border border-gray-200 dark:border-gray-700 text-xs uppercase font-mono tracking-wider transition-colors hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              {theme === "light" ? "Dark" : "Light"}
            </button>
          </div>
        </div>
        
        <div className="mb-6 bg-card dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-5">
          <h2 className="text-base font-normal mb-2 text-gray-800 dark:text-gray-200">About</h2>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            "Powered by Fin" appears at the start of the conversation under the composer and disappears after a particular event. 
            Select below to explore different trigger events that control when the branding disappears.
          </p>
        </div>
        
        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-1/3">
            <FlowsList selectedFlow={selectedFlowType} onFlowSelect={setSelectedFlowType} />
          </div>
          
          <div className="md:w-2/3">
            {/* Only the MessengerContainer with the actual launcher and messenger */}
            <MessengerContainer flowType={selectedFlowType} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrandingFlowsPrototype;
