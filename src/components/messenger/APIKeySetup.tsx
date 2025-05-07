
import React, { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Checkbox } from '../ui/checkbox';
import { setOpenAIApiKey, getOpenAIApiKey, clearApiKey } from '@/utils/openai';
import { Bot, Copy, Info } from 'lucide-react';
import { toast } from 'sonner';

interface APIKeySetupProps {
  onKeySet: () => void;
}

const APIKeySetup: React.FC<APIKeySetupProps> = ({ onKeySet }) => {
  const [apiKey, setApiKey] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [shareKey, setShareKey] = useState(false);
  const [keySharedLink, setKeySharedLink] = useState('');
  
  useEffect(() => {
    // Check if API key is already set
    const savedApiKey = getOpenAIApiKey();
    if (savedApiKey) {
      setApiKey(savedApiKey);
    }
    
    // Check if there's a shared key in the URL
    const url = new URL(window.location.href);
    const sharedKey = url.searchParams.get('shared_key');
    if (sharedKey) {
      try {
        // Simple base64 decode
        const decodedKey = atob(sharedKey);
        setApiKey(decodedKey);
        toast.info("Using shared API key. You may save it or replace it with your own.");
      } catch (e) {
        console.error("Failed to decode shared key:", e);
      }
    }
  }, []);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!apiKey.trim()) return;
    
    setIsSubmitting(true);
    const success = setOpenAIApiKey(apiKey.trim());
    
    if (success) {
      setTimeout(() => {
        setIsSubmitting(false);
        onKeySet();
      }, 500);
    } else {
      setIsSubmitting(false);
    }
  };
  
  const generateShareableLink = () => {
    if (!apiKey.trim()) {
      toast.error("Please enter an API key first");
      return;
    }
    
    // Simple base64 encoding (not production-grade security)
    const encodedKey = btoa(apiKey.trim());
    const url = new URL(window.location.href);
    url.searchParams.set('shared_key', encodedKey);
    
    setKeySharedLink(url.toString());
    toast.success("Shareable link generated!");
  };
  
  const copyToClipboard = () => {
    if (!keySharedLink) return;
    
    navigator.clipboard.writeText(keySharedLink)
      .then(() => toast.success("Copied to clipboard!"))
      .catch(err => {
        console.error("Failed to copy:", err);
        toast.error("Failed to copy to clipboard");
      });
  };
  
  const handleClearKey = () => {
    clearApiKey();
    setApiKey('');
    toast.success("API key removed");
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
          
          <div className="flex items-center space-x-2 pt-2">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="text-xs flex items-center"
            >
              <Info size={14} className="mr-1" />
              {showAdvanced ? "Hide" : "Show"} advanced options
            </Button>
          </div>
          
          {showAdvanced && (
            <div className="border-t pt-4 mt-4 space-y-4">
              {apiKey && (
                <div className="space-y-2">
                  <p className="text-sm font-medium">Share this prototype</p>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="shareKey" 
                      checked={shareKey}
                      onCheckedChange={(checked) => setShareKey(checked as boolean)}
                    />
                    <label htmlFor="shareKey" className="text-sm">
                      Generate shareable link with API key
                    </label>
                  </div>
                  
                  {shareKey && (
                    <div className="space-y-2 pt-2">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={generateShareableLink}
                        className="w-full"
                      >
                        Generate link
                      </Button>
                      
                      {keySharedLink && (
                        <div className="relative">
                          <Input 
                            value={keySharedLink} 
                            readOnly 
                            className="pr-10"
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={copyToClipboard}
                            className="absolute right-0 top-0 h-full px-3"
                          >
                            <Copy size={16} />
                          </Button>
                        </div>
                      )}
                      <p className="text-xs text-messenger-text-muted flex items-center">
                        <Info size={12} className="mr-1 inline" />
                        The API key is encoded in the URL but not encrypted. Share only with trusted people.
                      </p>
                    </div>
                  )}
                </div>
              )}
              
              {getOpenAIApiKey() && (
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  onClick={handleClearKey}
                  className="w-full"
                >
                  Clear saved API key
                </Button>
              )}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default APIKeySetup;

