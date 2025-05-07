
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
          <h1 className="text-2xl font-bold">Trigger prototypes</h1>
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
              <h2 className="text-lg font-medium mb-4">Trigger options</h2>
              <div className="space-y-2">
                <button 
                  className={`w-full text-left p-3 rounded-md transition-colors ${
                    selectedFlowType === "onUserMessage" 
                      ? "bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200" 
                      : "hover:bg-gray-100 dark:hover:bg-gray-700"
                  }`} 
                  onClick={() => setSelectedFlowType("onUserMessage")}
                >
                  <div className="font-medium">On user first message</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Branding disappears when user sends a message</div>
                </button>
                
                <button 
                  className={`w-full text-left p-3 rounded-md transition-colors ${
                    selectedFlowType === "afterDelay" 
                      ? "bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200" 
                      : "hover:bg-gray-100 dark:hover:bg-gray-700"
                  }`} 
                  onClick={() => setSelectedFlowType("afterDelay")}
                >
                  <div className="font-medium">On Set Delay (after 4 seconds)</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Branding disappears after 4 seconds</div>
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Only the MessengerContainer with the actual launcher and messenger */}
        <MessengerContainer flowType={selectedFlowType} />
      </div>
    </div>;
};
export default BrandingFlowsPrototype;
