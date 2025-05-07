
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const TokenItem = ({ name, lightValue, darkValue, isCopyable = true }: { 
  name: string;
  lightValue: string;
  darkValue?: string;
  isCopyable?: boolean;
}) => {
  const [copied, setCopied] = useState(false);
  
  const copyToClipboard = (value: string) => {
    navigator.clipboard.writeText(value).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="border rounded-lg p-3 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-medium text-sm">{name}</h3>
        {isCopyable && (
          <button 
            onClick={() => copyToClipboard(`var(${name})`)} 
            className="text-xs px-2 py-1 rounded bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            {copied ? "Copied!" : "Copy"}
          </button>
        )}
      </div>
      
      <div className="space-y-2">
        <div className="flex items-center">
          <div className="w-6 h-6 rounded mr-2" style={{ background: lightValue }}></div>
          <span className="text-xs">Light: {lightValue}</span>
        </div>
        
        {darkValue && (
          <div className="flex items-center">
            <div className="w-6 h-6 rounded mr-2" style={{ background: darkValue }}></div>
            <span className="text-xs">Dark: {darkValue}</span>
          </div>
        )}
      </div>
    </div>
  );
};

const DesignTokens = () => {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  
  const toggleTheme = () => {
    setTheme(prev => prev === "light" ? "dark" : "light");
  };

  React.useEffect(() => {
    // Apply theme to document
    document.documentElement.className = theme;
  }, [theme]);

  return (
    <div className={`min-h-screen ${theme === "dark" ? "dark" : ""} bg-background text-foreground`}>
      <div className="container mx-auto py-8 px-4">
        <div className="mb-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Design Tokens</h1>
          <div className="flex gap-4">
            <Link to="/" className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg">
              Back to Messenger
            </Link>
            <button
              onClick={toggleTheme}
              className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg"
            >
              Toggle {theme === "light" ? "Dark" : "Light"} Mode
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Base Tokens */}
          <Card>
            <CardHeader>
              <CardTitle>Base Tokens</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <TokenItem 
                name="--messenger-base" 
                lightValue="#FFFFFF" 
                darkValue="#1C1C1C"
              />
              <TokenItem 
                name="--messenger-border" 
                lightValue="#F5F5F5" 
                darkValue="#2E2E2E"
              />
              <TokenItem 
                name="--messenger-elevated" 
                lightValue="rgba(15, 15, 15, 0.16)" 
                darkValue="rgba(15, 15, 15, 0.54)"
              />
            </CardContent>
          </Card>
          
          {/* Text Tokens */}
          <Card>
            <CardHeader>
              <CardTitle>Text Tokens</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <TokenItem 
                name="--messenger-text-default" 
                lightValue="#1C1C1C" 
                darkValue="#F7F7F7"
              />
              <TokenItem 
                name="--messenger-text-muted" 
                lightValue="#737373" 
                darkValue="#A3A3A3"
              />
              <TokenItem 
                name="--messenger-icon-muted" 
                lightValue="#737373" 
                darkValue="#A3A3A3"
              />
            </CardContent>
          </Card>
          
          {/* Customer Action Tokens */}
          <Card>
            <CardHeader>
              <CardTitle>Customer Action Tokens</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <TokenItem 
                name="--messenger-customer-bg" 
                lightValue="#FCC5C5" 
                darkValue="#943838"
              />
              <TokenItem 
                name="--messenger-customer-text" 
                lightValue="#1C1C1C" 
                darkValue="#FFFFFF"
              />
            </CardContent>
          </Card>
          
          {/* AI/Agent Tokens */}
          <Card>
            <CardHeader>
              <CardTitle>AI/Agent Tokens</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <TokenItem 
                name="--messenger-ai-bg" 
                lightValue="#F5F5F5" 
                darkValue="#2E2E2E"
              />
              <TokenItem 
                name="--messenger-ai-text" 
                lightValue="#1C1C1C" 
                darkValue="#F7F7F7"
              />
            </CardContent>
          </Card>
          
          {/* Composer Tokens */}
          <Card>
            <CardHeader>
              <CardTitle>Composer Tokens</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <TokenItem 
                name="--messenger-composer-bg" 
                lightValue="rgba(56, 56, 56, 0.80)" 
                darkValue="rgba(56, 56, 56, 0.80)"
              />
              <TokenItem 
                name="--messenger-composer-border" 
                lightValue="#E5E5E5" 
                darkValue="#3E3E3E"
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DesignTokens;
