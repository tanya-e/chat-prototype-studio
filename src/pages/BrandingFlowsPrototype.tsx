
import React, { useState } from "react";
import FlowsList from "../components/branding-prototype/FlowsList";
import MessengerPreview from "../components/branding-prototype/MessengerPreview";
import { BrandingFlowType } from "../types/branding-flows";

const BrandingFlowsPrototype: React.FC = () => {
  const [selectedFlow, setSelectedFlow] = useState<BrandingFlowType>("onFinReply");

  const handleFlowChange = (flow: BrandingFlowType) => {
    setSelectedFlow(flow);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto py-8">
        <h1 className="text-2xl font-bold mb-6">Branding Disappearance Prototype</h1>
        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-1/3">
            <FlowsList selectedFlow={selectedFlow} onFlowSelect={handleFlowChange} />
          </div>
          <div className="md:w-2/3">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 h-[600px] flex items-center justify-center">
              <MessengerPreview key={selectedFlow} flowType={selectedFlow} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrandingFlowsPrototype;
