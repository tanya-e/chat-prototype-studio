
import React from "react";
import { BrandingFlowType } from "../../types/branding-flows";

interface FlowsListProps {
  selectedFlow: BrandingFlowType;
  onFlowSelect: (flow: BrandingFlowType) => void;
}

const FlowsList: React.FC<FlowsListProps> = ({ selectedFlow, onFlowSelect }) => {
  const flows = [
    {
      id: "onFinReply" as BrandingFlowType,
      label: "On Fin reply (with stagger)",
      description: "Branding fades 300ms after Fin sends a message"
    },
    {
      id: "afterDelay" as BrandingFlowType,
      label: "After 4s delay",
      description: "Branding disappears after 4 seconds"
    },
    {
      id: "onUserMessage" as BrandingFlowType,
      label: "On user input",
      description: "Branding disappears when user sends first message"
    },
    {
      id: "combo" as BrandingFlowType,
      label: "Combo: reply or input",
      description: "Whichever comes first: user sends a message or 4s after Fin's reply"
    },
    {
      id: "topBanner" as BrandingFlowType,
      label: "Top Banner",
      description: "Branding appears at the top and animates up when user sends a message"
    }
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
      <h2 className="text-lg font-medium mb-4">Branding Disappearance Flows</h2>
      <div className="space-y-2">
        {flows.map((flow) => (
          <button
            key={flow.id}
            onClick={() => onFlowSelect(flow.id)}
            className={`w-full text-left p-3 rounded-md transition-colors ${
              selectedFlow === flow.id
                ? "bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200"
                : "hover:bg-gray-100 dark:hover:bg-gray-700"
            }`}
          >
            <div className="font-medium">{flow.label}</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">{flow.description}</div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default FlowsList;
