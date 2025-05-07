
import React, { useState } from "react";
import FlowsList from "../components/branding-prototype/FlowsList";
import MessengerPreview from "../components/branding-prototype/MessengerPreview";
import { BrandingFlowType } from "../types/branding-flows";
import { Link } from "react-router-dom";

const BrandingFlowsPrototype: React.FC = () => {
  const [selectedFlow, setSelectedFlow] = useState<BrandingFlowType>("onFinReply");
  const [theme, setTheme] = useState<"light" | "dark">("light");

  const handleFlowChange = (flow: BrandingFlowType) => {
    setSelectedFlow(flow);
  };

  // Toggle theme for demonstration purposes
  const toggleTheme = () => {
    setTheme(prev => prev === "light" ? "dark" : "light");
  };

  return (
    <div className={`min-h-screen bg-gray-50 dark:bg-gray-900 ${theme === "dark" ? "dark" : ""}`}>
      <div className="container mx-auto py-8">
        <div className="mb-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Branding Disappearance Prototype</h1>
          <div className="flex space-x-4">
            <Link to="/" className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg">
              Back to Home
            </Link>
            <button
              onClick={toggleTheme}
              className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg"
            >
              Toggle {theme === "light" ? "Dark" : "Light"} Mode
            </button>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-1/3">
            <FlowsList selectedFlow={selectedFlow} onFlowSelect={handleFlowChange} />
          </div>
          <div className="md:w-2/3">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 h-[600px] flex items-center justify-center">
              <div className="w-[400px] h-[95vh] max-h-[550px] rounded-2xl overflow-hidden shadow-lg">
                <MessengerPreview key={selectedFlow} flowType={selectedFlow} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrandingFlowsPrototype;
