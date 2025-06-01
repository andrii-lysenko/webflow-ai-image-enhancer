import React, { useState } from "react";
import {
  Box,
  Paper,
  TextField,
  Button,
  Typography,
  Alert,
  Container,
  Divider,
  Link,
} from "@mui/material";
import { VpnKey, Save, Clear, Info } from "@mui/icons-material";

interface SettingsProps {
  apiToken: string;
  onTokenChange: (token: string) => void;
  onTokenClear: () => void;
}

// TODO: improve and release settings
export const Settings: React.FC<SettingsProps> = ({
  apiToken,
  onTokenChange,
  onTokenClear,
}) => {
  const [inputValue, setInputValue] = useState(apiToken);
  const [isModified, setIsModified] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const validateApiToken = (token: string): string | null => {
    if (!token || token.trim().length === 0) {
      return "Please enter your API token";
    }

    // Basic validation for Google AI Studio API keys
    if (!token.startsWith("AIza")) {
      return "Invalid API token format. Please check your Google AI Studio API key.";
    }

    if (token.length < 30) {
      return "API token appears to be too short. Please check your Google AI Studio API key.";
    }

    return null;
  };

  const handleInputChange = (value: string) => {
    setInputValue(value);
    setIsModified(value !== apiToken);
    setError("");
    setSuccess("");
  };

  const handleSave = () => {
    const validationError = validateApiToken(inputValue);
    if (validationError) {
      setError(validationError);
      return;
    }

    onTokenChange(inputValue.trim());
    setIsModified(false);
    setSuccess("API token updated successfully!");
    setTimeout(() => setSuccess(""), 3000);
  };

  const handleClear = () => {
    onTokenClear();
    setInputValue("");
    setIsModified(false);
    setError("");
    setSuccess("API token cleared!");
    setTimeout(() => setSuccess(""), 3000);
  };

  const handleReset = () => {
    setInputValue(apiToken);
    setIsModified(false);
    setError("");
    setSuccess("");
  };

  const maskToken = (token: string): string => {
    if (!token) return "";
    if (token.length <= 8) return token;
    return (
      token.slice(0, 4) +
      "•".repeat(Math.min(token.length - 8, 20)) +
      token.slice(-4)
    );
  };

  return (
    <Container maxWidth="md" sx={{ py: 3 }}>
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        sx={{ fontWeight: 600 }}
      >
        Settings
      </Typography>

      {/* API Token Section */}
      <Paper
        elevation={0}
        sx={{
          p: 3,
          mb: 3,
          border: 1,
          borderColor: "grey.200",
          borderRadius: 2,
        }}
      >
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
            Google AI Studio API Key
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            This key enables AI features in the extension. You can get your API
            key from{" "}
            <Link
              href="https://aistudio.google.com/apikey"
              target="_blank"
              rel="noopener noreferrer"
              sx={{ fontWeight: 500 }}
            >
              Google AI Studio
            </Link>
            .
          </Typography>
        </Box>

        {/* Current Token Display */}
        {apiToken && (
          <Box sx={{ mb: 2 }}>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Current API Token:
            </Typography>
            <Typography
              variant="body2"
              sx={{
                fontFamily: "monospace",
                backgroundColor: "grey.100",
                p: 1,
                borderRadius: 1,
                fontSize: "0.875rem",
              }}
            >
              {maskToken(apiToken)}
            </Typography>
          </Box>
        )}

        {/* Success/Error Messages */}
        {success && (
          <Alert severity="success" sx={{ mb: 2 }}>
            {success}
          </Alert>
        )}

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {/* API Token Input */}
        <TextField
          fullWidth
          type="password"
          label="Google AI Studio API Key"
          value={inputValue}
          onChange={(e) => handleInputChange(e.target.value)}
          placeholder="Enter your API key"
          sx={{
            mb: 2,
            "& .MuiInputBase-input": {
              fontFamily: "monospace",
              fontSize: "0.875rem",
            },
          }}
          InputProps={{
            startAdornment: <VpnKey sx={{ color: "action.active", mr: 1 }} />,
          }}
          helperText="Your API key is stored securely in your browser session"
        />

        {/* Action Buttons */}
        <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
          <Button
            variant="contained"
            startIcon={<Save />}
            onClick={handleSave}
            disabled={!isModified || !inputValue.trim()}
          >
            Save Changes
          </Button>

          {isModified && (
            <Button variant="outlined" onClick={handleReset}>
              Reset
            </Button>
          )}

          {apiToken && (
            <Button
              variant="outlined"
              color="error"
              startIcon={<Clear />}
              onClick={handleClear}
            >
              Clear Token
            </Button>
          )}
        </Box>

        <Divider sx={{ my: 3 }} />

        {/* Information Section */}
        <Box>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
            <Info sx={{ verticalAlign: "middle", mr: 1, fontSize: "1.2rem" }} />
            Information
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ lineHeight: 1.6 }}
          >
            • Your API key is stored locally in your browser session and is
            never shared
            <br />
            • The key is used only to communicate with Google's AI services
            <br />
            • You can update or remove your API key at any time
            <br />• If you experience issues, try refreshing the page or
            re-entering your key
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};
