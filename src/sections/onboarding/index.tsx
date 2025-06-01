import React, { useState } from "react";
import {
  Box,
  Paper,
  Container,
  TextField,
  Button,
  Typography,
  Alert,
  CircularProgress,
  Link,
} from "@mui/material";
import { VpnKey, AutoAwesome } from "@mui/icons-material";

interface OnboardingProps {
  onTokenSubmit: (token: string) => void;
}

export const Onboarding: React.FC<OnboardingProps> = ({ onTokenSubmit }) => {
  const [apiToken, setApiToken] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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

  const handleSubmit = async () => {
    setIsLoading(true);
    setError("");

    const validationError = validateApiToken(apiToken);
    if (validationError) {
      setError(validationError);
      setIsLoading(false);
      return;
    }

    try {
      // Could add API validation here in the future
      onTokenSubmit(apiToken.trim());
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      setIsLoading(false);
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSubmit();
    }
  };

  const isSubmitDisabled = !apiToken || isLoading;

  return (
    <Container
      maxWidth="sm"
      sx={{
        py: 4,
        height: "calc(100vh - 56px)",
        maxHeight: "calc(100vh - 56px)",
        bgcolor: "grey.50",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Paper
        elevation={0}
        sx={{
          p: 4,
          borderRadius: 2,
          border: 1,
          borderColor: "grey.200",
          bgcolor: "white",
          width: "100%",
          maxWidth: 450,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 3,
            alignItems: "center",
          }}
        >
          {/* Icon and Header */}
          <Box sx={{ textAlign: "center" }}>
            <AutoAwesome
              sx={{
                fontSize: 48,
                color: "primary.main",
                mb: 2,
              }}
            />
            <Typography
              variant="h5"
              component="h1"
              sx={{
                fontWeight: 600,
                mb: 1,
                color: "text.primary",
              }}
            >
              Welcome to AI Image Enhancer!
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ lineHeight: 1.5, mb: 2 }}
            >
              To get started, you'll need a Google AI Studio API key. You can
              obtain your API key from{" "}
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

          {/* Error Alert */}
          {error && (
            <Alert
              severity="error"
              sx={{
                width: "100%",
                borderRadius: 1,
                fontSize: "0.875rem",
              }}
            >
              {error}
            </Alert>
          )}

          {/* API Token Input */}
          <Box sx={{ width: "100%" }}>
            <TextField
              fullWidth
              type="password"
              label="Google AI Studio API Key"
              value={apiToken}
              onChange={(e) => setApiToken(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Gemini API Key"
              autoFocus
              sx={{
                "& .MuiInputLabel-root": { fontSize: "0.875rem" },
                "& .MuiInputBase-input": {
                  fontSize: "0.875rem",
                  fontFamily: "monospace",
                },
                "& .MuiOutlinedInput-root": {
                  borderRadius: 1,
                },
              }}
              slotProps={{
                input: {
                  startAdornment: (
                    <VpnKey
                      sx={{ color: "action.active", mr: 1, fontSize: "1.2rem" }}
                    />
                  ),
                },
              }}
              helperText="Your API key will be stored securely in your browser"
            />
          </Box>

          {/* Submit Button */}
          <Button
            fullWidth
            variant="contained"
            onClick={handleSubmit}
            disabled={isSubmitDisabled}
            sx={{
              py: 1.5,
              borderRadius: 1,
              fontSize: "0.8rem",
              fontWeight: 600,
              position: "relative",
            }}
          >
            {isLoading ? (
              <>
                <CircularProgress
                  size={20}
                  sx={{
                    color: "white",
                    mr: 1,
                  }}
                />
                Setting up...
              </>
            ) : (
              "Get Started"
            )}
          </Button>

          {/* Additional Info */}
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{
              textAlign: "center",
              lineHeight: 1.4,
              fontSize: "0.75rem",
            }}
          >
            Your API key is stored locally in your browser and is never shared.
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};
