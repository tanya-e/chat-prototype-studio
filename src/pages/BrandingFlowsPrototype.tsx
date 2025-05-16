
import React, { useState } from "react";
import MessengerContainer from "../components/messenger/MessengerContainer";
import { Link } from "react-router-dom";
import { BrandingFlowType } from "@/types/branding-flows";
import FlowsList from "../components/branding-prototype/FlowsList";

type PrototypeTab = "flows";

const BrandingFlowsPrototype: React.FC = () => {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [selectedFlowType, setSelectedFlowType] = useState<BrandingFlowType>("onUserMessage");
  const [activeTab, setActiveTab] = useState<PrototypeTab>("flows");
  
  // Toggle theme for demonstration purposes
  const toggleTheme = () => {
    setTheme(prev => prev === "light" ? "dark" : "light");
  };
  
  return <div className={`min-h-screen bg-gray-50 dark:bg-gray-900 ${theme === "dark" ? "dark" : ""}`}>
      <div className="container mx-auto py-8">
        <div className="mb-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Intercom Messenger Explorations</h1>
          <div className="flex space-x-4">
            <Link to="/" className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg">
              Back to Home
            </Link>
            <Link to="/messenger-ui-experiments" className="px-4 py-2 bg-blue-500 text-white rounded-lg">
              UI Experiments
            </Link>
            <button onClick={toggleTheme} className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg">
              Toggle {theme === "light" ? "Dark" : "Light"} Mode
            </button>
          </div>
        </div>
        
        <div className="mb-6 bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <div className="mb-4">
            <button 
              className="px-4 py-2 rounded-md bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200"
            >
              Branding Flows
            </button>
          </div>
          
          <div>
            <h2 className="text-lg font-semibold mb-2">About these flows</h2>
            <p className="text-gray-700 dark:text-gray-300">
              "Powered by Fin" appears at the start of the conversation under the composer and disappears after a particular event. 
              Below are explorations of these different trigger events that control when the branding disappears.
            </p>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-1/3">
            <FlowsList selectedFlow={selectedFlowType} onFlowSelect={setSelectedFlowType} />
          </div>
          
          <div className="md:w-2/3">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 h-[600px] flex items-center justify-center">
              <MessengerContainer flowType={selectedFlowType} />
            </div>
          </div>
        </div>
      </div>
    </div>;
};

export default BrandingFlowsPrototype;
