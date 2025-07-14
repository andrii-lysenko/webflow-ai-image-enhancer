/**
 * AI Image Enhancement - Webflow Designer Extension
 *
 * Copyright (c) 2024 AI Image Enhancement - Webflow Designer Extension
 * Licensed under the MIT License
 *
 * A powerful Webflow Designer Extension that brings AI-powered image
 * enhancement and generation capabilities directly into your design workflow.
 */

import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { ThemeProvider, Box } from "@mui/material";

import { theme } from "./components/theme";
import "./App.css";
import { Chat } from "./sections/chat";
import { ChatProvider } from "./sections/chat/context/chatContext";
import { Navigation } from "./sections/navigation";
import { Onboarding } from "./sections/onboarding";
import { Help } from "./sections/help";
import {
  getStoredApiToken,
  setStoredApiToken,
  clearStoredApiToken,
} from "./lib/utils/token";

// Constants

/**
 * Main App component that handles routing and global state
 */
function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <AppContent />
      </ThemeProvider>
    </BrowserRouter>
  );
}

/**
 * Main app content that manages the API token state
 */
function AppContent() {
  const [apiToken, setApiToken] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    // Check for saved API token in localStorage
    const savedToken = getStoredApiToken();
    if (savedToken) {
      setApiToken(savedToken);
    }

    setTimeout(() => {
      if (typeof webflow !== "undefined") {
        // Set extension size for Webflow
        webflow.setExtensionSize("comfortable");
      }
    }, 500);
  }, []);

  const handleTokenSubmit = (token: string, saveToStorage: boolean) => {
    setApiToken(token);

    if (saveToStorage) {
      setStoredApiToken(token);
    } else {
      // Remove any existing saved token if user chooses not to save
      clearStoredApiToken();
    }
  };

  const handleLogout = () => {
    setApiToken("");
    clearStoredApiToken();
  };

  useEffect(() => {
    if (apiToken) {
      navigate("/");
    }
  }, [apiToken]);

  // Show onboarding if no token
  if (!apiToken) {
    return <Onboarding onTokenSubmit={handleTokenSubmit} />;
  }

  // Show main app with token
  return (
    <Box className="app-container">
      <Navigation onLogout={handleLogout} />
      <Box className="content-container">
        <Routes>
          <Route
            path="/"
            element={
              <ChatProvider token={apiToken} mode="enhance">
                <Chat />
              </ChatProvider>
            }
          />
          <Route
            path="/generate"
            element={
              <ChatProvider token={apiToken} mode="generate">
                <Chat />
              </ChatProvider>
            }
          />
          <Route path="/help" element={<Help />} />
        </Routes>
      </Box>
    </Box>
  );
}

export default App;
