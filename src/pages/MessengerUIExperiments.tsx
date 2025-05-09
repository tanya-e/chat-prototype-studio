
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { BrandingFlowType } from "@/types/branding-flows";
import MessengerContainer from "../components/messenger-experimental/MessengerContainer";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const MessengerUIExperiments: React.FC = () => {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [selectedVariant, setSelectedVariant] = useState<"classic" | "experimental">("classic");
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
            <h2 className="text-lg font-semibold mb-2">About these experiments</h2>
            <p className="text-gray-700 dark:text-gray-300">
              This page allows side-by-side testing of updated UI component variants while preserving all existing Messenger functionality.
              Toggle between classic and experimental variants to compare designs.
            </p>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-1/3">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
              <Tabs defaultValue="variant" className="mb-6">
                <TabsList className="w-full">
                  <TabsTrigger value="variant" className="flex-1">UI Variants</TabsTrigger>
                  <TabsTrigger value="branding" className="flex-1">Branding Flows</TabsTrigger>
                </TabsList>
                
                <TabsContent value="variant">
                  <h2 className="text-lg font-medium mb-4">UI Component Variants</h2>
                  <div className="space-y-2">
                    <button 
                      className={`w-full text-left p-3 rounded-md transition-colors ${selectedVariant === "classic" ? "bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200" : "hover:bg-gray-100 dark:hover:bg-gray-700"}`} 
                      onClick={() => setSelectedVariant("classic")}
                    >
                      <div className="font-medium">Classic UI</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">Original messenger component styles</div>
                    </button>
                    
                    <button 
                      className={`w-full text-left p-3 rounded-md transition-colors ${selectedVariant === "experimental" ? "bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200" : "hover:bg-gray-100 dark:hover:bg-gray-700"}`}
                      onClick={() => setSelectedVariant("experimental")}
                    >
                      <div className="font-medium">Experimental UI</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">New minimal messenger component styles</div>
                    </button>
                  </div>
                </TabsContent>
                
                <TabsContent value="branding">
                  <h2 className="text-lg font-medium mb-4">Branding Flow Types</h2>
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
                </TabsContent>
              </Tabs>
              
              <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
                <h3 className="font-medium mb-2">Selected Configuration</h3>
                <ul className="list-disc list-inside text-sm">
                  <li>UI Variant: {selectedVariant === "classic" ? "Classic" : "Experimental"}</li>
                  <li>Branding Flow: {
                    selectedFlowType === "onUserMessage" ? "On User Message" : 
                    selectedFlowType === "afterDelay" ? "After Delay" : 
                    "On Fin Reply"
                  }</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="md:w-2/3">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 h-[600px] flex items-center justify-center">
              <MessengerContainer 
                flowType={selectedFlowType} 
                variant={selectedVariant} 
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessengerUIExperiments;
