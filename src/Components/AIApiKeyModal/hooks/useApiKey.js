import { useState, useEffect } from "react"

export const useApiKey = () => {
  const [apiKey, setApiKey] = useState(null);
  const [showApiKeyModal, setShowApiKeyModal] = useState(false);

  // Initialize API key
  useEffect(() => {
    const storedKey = sessionStorage.getItem("OPENAI_API_KEY");
    if (!storedKey) {
      setShowApiKeyModal(true);
    } else {
      setApiKey(storedKey);
    }
  }, []);

  // Save the api key
  const handleSaveApiKey = (key) => {
    sessionStorage.setItem("OPENAI_API_KEY", key);
    setApiKey(key);
    setShowApiKeyModal(false);
  };

  return {
    apiKey,
    setApiKey,
    showApiKeyModal,
    setShowApiKeyModal,
    handleSaveApiKey
  }
}