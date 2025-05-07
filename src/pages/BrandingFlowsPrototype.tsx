import React, { useState } from "react";
import MessengerContainer from "../components/messenger/MessengerContainer";
import { Link } from "react-router-dom";
import { BrandingFlowType } from "@/types/branding-flows";
import FlowsList from "../components/branding-prototype/FlowsList";
import MessengerLoadingState from "../components/messenger/MessengerLoadingState";

type PrototypeTab = "flows" | "loading";
type LoadingStateTab = "toMessages" | "toConversation";

const BrandingFlowsPrototype: React.FC = () => {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [selectedFlowType, setSelectedFlowType] = useState<BrandingFlowType>("onUserMessage");
  const [activeTab, setActiveTab] = useState<PrototypeTab>("flows");
  const [loadingStateType, setLoadingStateType] = useState<LoadingStateTab>("toMessages");

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
            <button onClick={toggleTheme} className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg">
              Toggle {theme === "light" ? "Dark" : "Light"} Mode
            </button>
          </div>
        </div>
        
        <div className="mb-6 bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <div className="flex space-x-4 mb-4">
            <button 
              onClick={() => setActiveTab("flows")} 
              className={`px-4 py-2 rounded-md ${activeTab === "flows" 
                ? "bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200" 
                : "bg-gray-100 dark:bg-gray-700"}`}
            >
              Branding Flows
            </button>
            <button 
              onClick={() => setActiveTab("loading")} 
              className={`px-4 py-2 rounded-md ${activeTab === "loading" 
                ? "bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200" 
                : "bg-gray-100 dark:bg-gray-700"}`}
            >
              Loading States
            </button>
          </div>
          
          {activeTab === "flows" && (
            <div>
              <h2 className="text-lg font-semibold mb-2">About these flows</h2>
              <p className="text-gray-700 dark:text-gray-300">
                "Powered by Fin" appears at the start of the conversation under the composer and disappears after a particular event. 
                Below are explorations of these different trigger events that control when the branding disappears.
              </p>
            </div>
          )}
          
          {activeTab === "loading" && (
            <div>
              <h2 className="text-lg font-semibold mb-2">About these loading states</h2>
              <p className="text-gray-700 dark:text-gray-300">
                Loading states provide visual feedback during transitions between screens. They create a smoother user experience by suggesting that data is loading, even when it's just a UI transition.
              </p>
            </div>
          )}
        </div>
        
        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-1/3">
            {activeTab === "flows" && (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
                <h2 className="text-lg font-medium mb-4">New Conversation Start</h2>
                <div className="space-y-2">
                  <button className={`w-full text-left p-3 rounded-md transition-colors ${selectedFlowType === "onUserMessage" ? "bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200" : "hover:bg-gray-100 dark:hover:bg-gray-700"}`} onClick={() => setSelectedFlowType("onUserMessage")}>
                    <div className="font-medium">On user first message</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">Branding disappears when user sends a message</div>
                  </button>
                  
                  <button className={`w-full text-left p-3 rounded-md transition-colors ${selectedFlowType === "afterDelay" ? "bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200" : "hover:bg-gray-100 dark:hover:bg-gray-700"}`} onClick={() => setSelectedFlowType("afterDelay")}>
                    <div className="font-medium">On Set Delay (after 4 seconds)</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">Branding disappears after 4 seconds</div>
                  </button>

                  <button className={`w-full text-left p-3 rounded-md transition-colors ${selectedFlowType === "onFinReply" ? "bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200" : "hover:bg-gray-100 dark:hover:bg-gray-700"}`} onClick={() => setSelectedFlowType("onFinReply")}>
                    <div className="font-medium">On Fin Reply (with stagger)</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">Branding fades 300ms after Fin sends a message</div>
                  </button>
                </div>
              </div>
            )}
            
            {activeTab === "loading" && (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
                <h2 className="text-lg font-medium mb-4">Loading State Transitions</h2>
                <div className="space-y-2">
                  <button 
                    className={`w-full text-left p-3 rounded-md transition-colors ${loadingStateType === "toMessages" ? "bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200" : "hover:bg-gray-100 dark:hover:bg-gray-700"}`} 
                    onClick={() => setLoadingStateType("toMessages")}
                  >
                    <div className="font-medium">Conversation → Messages</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      When going back to all messages
                    </div>
                  </button>
                  
                  <button 
                    className={`w-full text-left p-3 rounded-md transition-colors ${loadingStateType === "toConversation" ? "bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200" : "hover:bg-gray-100 dark:hover:bg-gray-700"}`} 
                    onClick={() => setLoadingStateType("toConversation")}
                  >
                    <div className="font-medium">Messages → Conversation</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      When opening an existing conversation
                    </div>
                  </button>
                </div>
              </div>
            )}
          </div>
          
          <div className="md:w-2/3">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 h-[600px] flex items-center justify-center">
              {activeTab === "flows" ? (
                <MessengerContainer flowType={selectedFlowType} />
              ) : (
                <div className="w-full max-w-md h-full rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 shadow-lg">
                  <MessengerLoadingState type={loadingStateType} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>;
};

export default BrandingFlowsPrototype;
