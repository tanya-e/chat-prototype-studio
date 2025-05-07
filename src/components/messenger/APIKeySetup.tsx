
import React, { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { setOpenAIApiKey, getOpenAIApiKey, hasApiKey } from '@/utils/openai';
import { Bot } from 'lucide-react';

interface APIKeySetupProps {
  onKeySet: () => void;
}

const APIKeySetup: React.FC<APIKeySetupProps> = ({ onKeySet }) => {
  const [apiKey, setApiKey] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  useEffect(() => {
    // Check if API key is already set
    const savedApiKey = getOpenAIApiKey();
    if (savedApiKey) {
      setApiKey(savedApiKey);
    }
  }, []);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!apiKey.trim()) return;
    
    setIsSubmitting(true);
    setOpenAIApiKey(apiKey.trim());
    setTimeout(() => {
      setIsSubmitting(false);
      onKeySet();
    }, 500);
  };
  
  return (
    <div className="flex flex-col items-center justify-center h-full bg-messenger-base p-6">
      <div className="w-full max-w-md p-6 rounded-lg border border-messenger-border bg-white shadow-sm">
        <div className="flex items-center justify-center mb-6">
          <div className="bg-primary/10 p-3 rounded-full">
            <Bot size={24} className="text-primary" />
          </div>
        </div>
        
        <h2 className="text-xl font-semibold text-center mb-2">Connect to OpenAI</h2>
        <p className="text-messenger-text-muted text-center mb-6">
          Please enter your OpenAI API key to enable AI chat functionality
        </p>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="apiKey" className="block text-sm font-medium">
              OpenAI API Key
            </label>
            <Input
              id="apiKey"
              type="password"
              placeholder="sk-..."
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="w-full"
              autoComplete="off"
            />
            <p className="text-xs text-messenger-text-muted">
              Your API key is stored locally and never sent to our servers
            </p>
          </div>
          
          <Button 
            type="submit"
            className="w-full"
            disabled={!apiKey.trim() || isSubmitting}
          >
            {isSubmitting ? "Connecting..." : "Connect"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default APIKeySetup;
