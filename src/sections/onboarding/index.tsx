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
  FormControlLabel,
  Checkbox,
  Tooltip,
  IconButton,
} from "@mui/material";
import { VpnKey, AutoAwesome, Info } from "@mui/icons-material";

interface Props {
  onTokenSubmit: (token: string, saveToStorage: boolean) => void;
}

export const Onboarding = ({ onTokenSubmit }: Props) => {
  const [apiToken, setApiToken] = useState("");
  const [saveToStorage, setSaveToStorage] = useState(false);
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

    onTokenSubmit(apiToken.trim(), saveToStorage);
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSubmit();
    }
    setError("");
  };

  const isSubmitDisabled = !apiToken || isLoading;

  return (
    <Container
      maxWidth="sm"
      sx={{
        py: { xs: 2, sm: 4 },
        height: "100%",
        bgcolor: "grey.50",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: 400,
      }}
    >
      <Paper
        elevation={0}
        sx={{
          p: { xs: 3, sm: 4 },
          borderRadius: 2,
          border: 1,
          borderColor: "grey.200",
          bgcolor: "white",
          width: "100%",
          maxWidth: 450,
          maxHeight: "90vh",
          overflow: "auto",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 0.5,
            alignItems: "center",
          }}
        >
          {/* Icon and Header */}
          <Box sx={{ textAlign: "center" }}>
            <AutoAwesome
              sx={{
                fontSize: { xs: 40, sm: 48 },
                color: "primary.main",
                mb: { xs: 0.5, sm: 1 },
              }}
            />
            <Typography
              variant="h5"
              component="h1"
              sx={{
                fontWeight: 600,
                mb: 1,
                color: "text.primary",
                fontSize: { xs: "1.1rem", sm: "1.25rem" },
              }}
            >
              Welcome to AI Image Enhancer!
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                lineHeight: 1.5,
                mb: 2,
                fontSize: { xs: "0.8rem", sm: "0.875rem" },
                px: { xs: 1, sm: 0 },
              }}
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
                fontSize: { xs: "0.75rem", sm: "0.875rem" },
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
                "& .MuiInputLabel-root": {
                  fontSize: { xs: "0.8rem", sm: "0.875rem" },
                },
                "& .MuiInputBase-input": {
                  fontSize: { xs: "0.8rem", sm: "0.875rem" },
                  fontFamily: "monospace",
                  padding: { xs: "12px 14px", sm: "16px 14px" },
                },
                "& .MuiOutlinedInput-root": {
                  borderRadius: 1,
                },
                "& .MuiFormHelperText-root": {
                  fontSize: { xs: "0.7rem", sm: "0.75rem" },
                },
              }}
              slotProps={{
                input: {
                  startAdornment: (
                    <VpnKey
                      sx={{
                        color: "action.active",
                        mr: 1,
                        fontSize: { xs: "1.1rem", sm: "1.2rem" },
                      }}
                    />
                  ),
                },
              }}
            />
          </Box>

          {/* Save to Storage Checkbox with Warning */}
          <Box sx={{ width: "100%" }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={saveToStorage}
                    onChange={(e) => setSaveToStorage(e.target.checked)}
                    size="medium"
                    sx={{
                      color: "warning.main",
                      "&.Mui-checked": {
                        color: "warning.main",
                      },
                    }}
                  />
                }
                label={
                  <Typography
                    variant="body2"
                    sx={{
                      fontSize: { xs: "0.7rem", sm: "0.75rem" },
                      color: "text.secondary",
                    }}
                  >
                    Remember API key
                  </Typography>
                }
                sx={{ m: 0 }}
              />
              <Typography
                variant="caption"
                sx={{
                  fontWeight: "bold",
                  color: "warning.main",
                  fontSize: { xs: "0.7rem", sm: "0.75rem" },
                }}
              >
                Warning
              </Typography>
              <Tooltip
                title={
                  <Typography variant="body2" sx={{ fontSize: "0.75rem" }}>
                    <strong>Security Warning:</strong> This stores your API key
                    in browser localStorage, which is not encrypted and may be
                    accessible to other scripts. Be especially cautious if using
                    a paid Google AI account. We recommend entering your key
                    each session for maximum security.
                    <em>
                      Use at your own risk - you are responsible for your API
                      key security.
                    </em>
                  </Typography>
                }
                arrow
                placement="top"
                componentsProps={{
                  tooltip: {
                    sx: {
                      maxWidth: 280,
                      fontSize: "0.75rem",
                      bgcolor: "warning.dark",
                    },
                  },
                  arrow: {
                    sx: {
                      color: "warning.dark",
                    },
                  },
                }}
              >
                <IconButton size="small" sx={{ p: 0 }}>
                  <Info sx={{ fontSize: "0.9rem", color: "warning.main" }} />
                </IconButton>
              </Tooltip>
            </Box>
          </Box>

          {/* Submit Button */}
          <Button
            fullWidth
            variant="contained"
            onClick={handleSubmit}
            disabled={isSubmitDisabled}
            sx={{
              py: { xs: 1.2, sm: 1.5 },
              borderRadius: 1,
              fontSize: { xs: "0.75rem", sm: "0.8rem" },
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
              "GET STARTED"
            )}
          </Button>

          {/* Additional Info */}
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{
              textAlign: "center",
              lineHeight: 1.4,
              fontSize: { xs: "0.65rem", sm: "0.75rem" },
            }}
          >
            By default, your API key is only stored in memory and will be
            cleared when you close the extension.
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};
