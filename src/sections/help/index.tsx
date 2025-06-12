import { Box, Typography, Card, CardContent, Chip, Stack } from "@mui/material";
import {
  AutoFixHigh,
  AutoAwesome,
  TipsAndUpdates,
  Security,
} from "@mui/icons-material";

export function Help() {
  return (
    <Box
      sx={{
        p: 3,
        maxWidth: 800,
        mx: "auto",
        overflow: "auto",
        height: "calc(100vh - 64px)",
        textAlign: "left",
      }}
    >
      <Typography variant="h4" gutterBottom sx={{ textAlign: "center", mb: 4 }}>
        How to Use AI Image Enhancer
      </Typography>

      {/* Overview */}
      <Card sx={{ mb: 3, textAlign: "center" }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            📖 Overview
          </Typography>
          <Typography variant="body1" color="text.secondary">
            This extension brings AI-powered image enhancement and generation
            directly into your Webflow design workflow. Use natural language to
            enhance existing images or generate entirely new ones.
          </Typography>
        </CardContent>
      </Card>

      {/* Enhance Mode */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
            <AutoFixHigh color="primary" />
            <Typography variant="h6">Enhance Mode</Typography>
            <Chip label="Improve existing images" size="small" />
          </Stack>
          <Typography variant="body2" color="text.secondary" paragraph>
            Perfect for improving images that are already in your Webflow
            project.
          </Typography>

          <Typography variant="subtitle2" sx={{ mb: 1 }}>
            How to use:
          </Typography>
          <Box component="ol" sx={{ pl: 2, m: 0 }}>
            <Typography component="li" variant="body2" sx={{ mb: 0.5 }}>
              Select an image element in your Webflow project
            </Typography>
            <Typography component="li" variant="body2" sx={{ mb: 0.5 }}>
              Navigate to the "Enhance" tab in this extension
            </Typography>
            <Typography component="li" variant="body2" sx={{ mb: 0.5 }}>
              Describe what you want to improve (e.g., "make it brighter and
              more vibrant")
            </Typography>
            <Typography component="li" variant="body2">
              Click send and review the enhanced result
            </Typography>
          </Box>
        </CardContent>
      </Card>

      {/* Generate Mode */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
            <AutoAwesome color="secondary" />
            <Typography variant="h6">Generate Mode</Typography>
            <Chip label="Create new images" size="small" color="secondary" />
          </Stack>
          <Typography variant="body2" color="text.secondary" paragraph>
            Create entirely new images from text descriptions with optional
            reference images.
          </Typography>

          <Typography variant="subtitle2" sx={{ mb: 1 }}>
            How to use:
          </Typography>
          <Box component="ol" sx={{ pl: 2, m: 0 }}>
            <Typography component="li" variant="body2" sx={{ mb: 0.5 }}>
              Navigate to the "Generate" tab
            </Typography>
            <Typography component="li" variant="body2" sx={{ mb: 0.5 }}>
              <strong>Optional:</strong> Upload reference images for style
              guidance
            </Typography>
            <Typography component="li" variant="body2" sx={{ mb: 0.5 }}>
              Write a detailed prompt describing the image you want
            </Typography>
            <Typography component="li" variant="body2">
              Click send and use the generated result
            </Typography>
          </Box>
        </CardContent>
      </Card>

      {/* Tips */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
            <TipsAndUpdates color="warning" />
            <Typography variant="h6">Pro Tips</Typography>
          </Stack>

          <Typography variant="subtitle2" sx={{ mb: 1 }}>
            Writing effective prompts:
          </Typography>
          <Box component="ul" sx={{ pl: 2, m: 0, mb: 2 }}>
            <Typography component="li" variant="body2" sx={{ mb: 0.5 }}>
              Be specific about style, lighting, and composition
            </Typography>
            <Typography component="li" variant="body2" sx={{ mb: 0.5 }}>
              Mention colors, mood, and artistic style if relevant
            </Typography>
            <Typography component="li" variant="body2">
              Use reference images to guide the AI's understanding
            </Typography>
          </Box>

          <Typography variant="subtitle2" sx={{ mb: 1 }}>
            Best practices:
          </Typography>
          <Box component="ul" sx={{ pl: 2, m: 0 }}>
            <Typography component="li" variant="body2" sx={{ mb: 0.5 }}>
              Start with simple prompts and refine as needed
            </Typography>
            <Typography component="li" variant="body2" sx={{ mb: 0.5 }}>
              Use reference images to maintain consistent style
            </Typography>
            <Typography component="li" variant="body2">
              Experiment with different descriptions for varied results
            </Typography>
          </Box>
        </CardContent>
      </Card>

      {/* Privacy */}
      <Card>
        <CardContent>
          <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
            <Security color="success" />
            <Typography variant="h6">Privacy & Security</Typography>
            <Chip label="Your data is safe" size="small" color="success" />
          </Stack>
          <Typography variant="body2" color="text.secondary">
            Your images and API key are processed securely. We don't store or
            collect any of your data. Images are sent directly to Google's
            Gemini API, and your API key is stored only in your browser session.
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}
