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
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider, Box } from "@mui/material";

import { theme } from "./components/theme";
import "./App.css";
import { Chat } from "./sections/chat";
import { ChatProvider } from "./sections/chat/context/chatContext";
import { Settings } from "./sections/settings";
import { Navigation } from "./sections/navigation";
import { Onboarding } from "./sections/onboarding";

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

  useEffect(() => {
    webflow.setExtensionSize("comfortable");
  }, []);

  const handleTokenSubmit = (token: string) => {
    setApiToken(token);
  };

  const handleTokenClear = () => {
    setApiToken("");
  };

  // Show onboarding if no token
  if (!apiToken) {
    return <Onboarding onTokenSubmit={handleTokenSubmit} />;
  }

  // Show main app with token
  return (
    <Box className="app-container">
      <ChatProvider token={apiToken}>
        <Navigation />
        <Box className="content-container">
          <Routes>
            <Route path="/" element={<Chat mode="enhance" />} />
            <Route path="/generate" element={<Chat mode="generate" />} />
            <Route
              path="/settings"
              element={
                <Settings
                  apiToken={apiToken}
                  onTokenChange={setApiToken}
                  onTokenClear={handleTokenClear}
                />
              }
            />
            <Route
              path="/onboarding"
              element={<Onboarding onTokenSubmit={handleTokenSubmit} />}
            />
          </Routes>
        </Box>
      </ChatProvider>
    </Box>
  );
}

export default App;
