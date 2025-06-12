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
          <h1 className="text-2xl font-bold text-white drop-shadow-lg">Messenger UI Experiments</h1>
          <div className="flex space-x-4">
            <Link to="/" className="px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-lg hover:bg-white/30 transition-colors">
              Back to Home
            </Link>
            <button onClick={toggleTheme} className="px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-lg hover:bg-white/30 transition-colors">
              Toggle {theme === "light" ? "Dark" : "Light"} Mode
            </button>
          </div>
        </div>

        <div className="mb-6 bg-white/10 backdrop-blur-sm rounded-lg shadow-md p-6">
          <div className="mb-4">
            <Button variant="outline" className="bg-white/20 border-white/30 text-white hover:bg-white/30">
              Messenger UI Experiments
            </Button>
          </div>
          <div>
            <h2 className="text-lg font-semibold mb-2 text-white">About this messenger</h2>
            <p className="text-white/90">
              This page shows the current experimental messenger UI. All switching and classic UI code has been removed for clarity and focus.
            </p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-2/3 mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg shadow-md p-4 h-[600px] flex items-center justify-center">
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
