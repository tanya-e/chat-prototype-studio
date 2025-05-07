
import { toast } from "sonner";

// Types for OpenAI API requests and responses
export interface OpenAIMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

export interface OpenAIResponse {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: {
    index: number;
    message: OpenAIMessage;
    logprobs: any;
    finish_reason: string;
  }[];
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

// API key stored in memory (will be replaced with proper secure storage in production)
let apiKey = "";

export const setOpenAIApiKey = (key: string) => {
  apiKey = key;
  localStorage.setItem("openai_api_key", key);
};

export const getOpenAIApiKey = () => {
  if (!apiKey) {
    apiKey = localStorage.getItem("openai_api_key") || "";
  }
  return apiKey;
};

export const hasApiKey = () => {
  return !!getOpenAIApiKey();
};

export const callOpenAI = async (
  messages: OpenAIMessage[],
  options: {
    model?: string;
    temperature?: number;
    max_tokens?: number;
  } = {}
): Promise<string | null> => {
  const key = getOpenAIApiKey();
  
  if (!key) {
    toast.error("OpenAI API key is missing. Please set it in the settings.");
    return null;
  }
  
  const defaultOptions = {
    model: "gpt-4o-mini",
    temperature: 0.7,
    max_tokens: 1000,
  };
  
  const requestOptions = { ...defaultOptions, ...options };
  
  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messages,
        ...requestOptions,
      }),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      console.error("OpenAI API error:", errorData);
      toast.error(`API error: ${errorData.error?.message || "Unknown error"}`);
      return null;
    }
    
    const data: OpenAIResponse = await response.json();
    return data.choices[0]?.message?.content || null;
  } catch (error) {
    console.error("OpenAI API call failed:", error);
    toast.error("Failed to connect to OpenAI. Please check your connection.");
    return null;
  }
};

export const generateAIResponse = async (
  conversationHistory: OpenAIMessage[]
): Promise<string | null> => {
  return callOpenAI(conversationHistory);
};
