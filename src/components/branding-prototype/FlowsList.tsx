
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
    }
  ];

  return (
    <div className="bg-card dark:bg-gray-800 border border-border rounded-lg shadow-sm p-5">
      <h2 className="text-lg mb-4 font-normal text-gray-800 dark:text-gray-200">Branding Flows</h2>
      <div className="space-y-2">
        {flows.map((flow) => (
          <button
            key={flow.id}
            onClick={() => onFlowSelect(flow.id)}
            className={`w-full text-left p-3 rounded-md transition-colors font-mono text-xs uppercase tracking-wider ${
              selectedFlow === flow.id
                ? "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 border-l-2 border-gray-400"
                : "hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400"
            }`}
          >
            <div className="font-mono">{flow.label}</div>
            <div className="text-xs normal-case font-sans mt-1 text-gray-500 dark:text-gray-400">{flow.description}</div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default FlowsList;
