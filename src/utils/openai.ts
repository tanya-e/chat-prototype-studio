
import { toast } from "sonner";
import { v4 as uuidv4 } from 'uuid';

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

// Secure key storage
const KEY_PREFIX = "securekey_";
const SESSION_ID = "session_id";

// Generate or retrieve a session ID
const getSessionId = (): string => {
  let sessionId = localStorage.getItem(SESSION_ID);
  if (!sessionId) {
    sessionId = uuidv4();
    localStorage.setItem(SESSION_ID, sessionId);
  }
  return sessionId;
};

// Encrypt the API key with a simple encryption (for demonstration purposes)
const encryptKey = (key: string): string => {
  const sessionId = getSessionId();
  // Simple XOR encryption with session ID (not production-grade encryption)
  return key.split('').map((char, i) => {
    return String.fromCharCode(char.charCodeAt(0) ^ sessionId.charCodeAt(i % sessionId.length));
  }).join('');
};

// Decrypt the API key
const decryptKey = (encryptedKey: string): string => {
  const sessionId = getSessionId();
  // Simple XOR decryption with session ID
  return encryptedKey.split('').map((char, i) => {
    return String.fromCharCode(char.charCodeAt(0) ^ sessionId.charCodeAt(i % sessionId.length));
  }).join('');
};

export const setOpenAIApiKey = (key: string) => {
  // Basic validation for OpenAI API key format
  if (!key.startsWith('sk-') || key.length < 20) {
    toast.error("Invalid OpenAI API key format");
    return false;
  }
  
  const encryptedKey = encryptKey(key);
  localStorage.setItem(`${KEY_PREFIX}${getSessionId()}`, encryptedKey);
  return true;
};

export const getOpenAIApiKey = (): string => {
  const encryptedKey = localStorage.getItem(`${KEY_PREFIX}${getSessionId()}`);
  return encryptedKey ? decryptKey(encryptedKey) : "";
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

// Clear the API key
export const clearApiKey = () => {
  localStorage.removeItem(`${KEY_PREFIX}${getSessionId()}`);
};

