# AI Image Enhancement - Webflow Designer Extension

A powerful **Webflow Designer Extension** that brings AI-powered image enhancement and generation capabilities directly into your Webflow design workflow. This extension allows you to enhance existing images and generate new ones using Google's advanced Gemini AI models.

## 🌟 Features

### 🎨 **Enhance Mode**

- **Smart Image Enhancement**: Select any image element in your Webflow project and enhance it with AI
- **Natural Language Instructions**: Describe how you want to improve the image using simple prompts
- **Real-time Processing**: Get enhanced images directly applied to your selected elements
- **Quality Improvements**: Enhance clarity, lighting, composition, and visual appeal

### 🚀 **Generate Mode**

- **AI Image Generation**: Create entirely new images based on text descriptions
- **Reference Image Support**: Upload reference images to guide the generation process
- **Style Transfer**: Generate variations based on existing visual styles
- **Custom Prompts**: Use detailed prompts to get exactly the images you need

### 🔧 **Smart Integration**

- **Seamless Webflow Integration**: Works natively within the Webflow Designer interface
- **Element Selection**: Automatically detects and works with selected image elements
- **Asset Management**: Generated/enhanced images are processed and ready for use
- **Non-destructive Workflow**: Original images remain untouched

## 🛡️ Privacy & Security

**Your data stays secure:**

- ✅ **No data collection** - We don't store or collect any of your images or API keys
- ✅ **Client-side processing** - Your API key is stored only in your browser session
- ✅ **Direct API communication** - Images are sent directly to Google's Gemini API
- ✅ **Open source** - Full transparency in how your data is handled
- ✅ **Free to use** - No subscription fees, you only pay for your Google AI Studio usage

## 📋 Prerequisites

Before getting started, ensure you have:

- **Node.js 16.20 or later**
- **A Webflow site** for development and testing
- **A registered Webflow App** installed to your test site ([Create an App Guide](https://developers.webflow.com/data/docs/designer-extensions/getting-started))
- **Google AI Studio API Key** ([Get your API key](https://aistudio.google.com/apikey))

## 🚀 Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/webflow-ai-image-extension.git
cd webflow-ai-image-extension
```

### 2. Install Dependencies

```bash
# Using Node Version Manager (nvm) - recommended
nvm use 20.9.0
# or install if not available
nvm install 20.9.0

npm install
```

### 3. Get Your Google AI Studio API Key

1. Visit [Google AI Studio](https://aistudio.google.com/apikey)
2. Create a new API key
3. Copy the key (starts with `AIza...`)

### 4. Development Server

```bash
# Start the development server
npm run dev

# Or use Webflow CLI
webflow extension serve
```

The extension will be served on `http://localhost:1337` (or your configured port).

### 5. Load in Webflow Designer

1. Open your Webflow site in the Designer
2. Click the "Apps" icon in the left panel
3. Find your app and click "Launch development App"
4. Enter your Google AI Studio API key when prompted

## 📖 Usage Guide

### Setting Up Your API Key

1. **First Launch**: When you first open the extension, you'll see an onboarding screen
2. **Enter API Key**: Paste your Google AI Studio API key
3. **Validation**: The extension validates the key format automatically
4. **Secure Storage**: Your key is stored securely in your browser session only

### Enhancing Images

1. **Select Image**: Click on any image element in your Webflow project
2. **Open Extension**: Launch the AI Image Enhancement extension
3. **Choose Enhance Mode**: Navigate to the "Enhance" tab
4. **Describe Enhancement**: Type what improvements you want (e.g., "make it brighter and more vibrant")
5. **Process**: Click send and wait for AI processing
6. **Review & Apply**: Review the enhanced image and choose to apply or decline

### Generating Images

1. **Open Extension**: Launch the AI Image Enhancement extension
2. **Choose Generate Mode**: Navigate to the "Generate" tab
3. **Add Reference (Optional)**: Upload reference images for style guidance
4. **Describe Image**: Write a detailed prompt for the image you want
5. **Generate**: Click send and wait for AI generation
6. **Use Result**: Download or apply the generated image to your project

## 🛠️ Technical Architecture

### Core Technologies

- **React 18** - Modern UI framework
- **TypeScript** - Type-safe development
- **Material-UI (MUI)** - Professional UI components
- **React Router** - Client-side routing
- **Vite** - Fast build tooling

### AI Integration

- **Google Gemini API** - Primary AI model for image processing
- **@google/genai** - Official Google AI SDK
- **Image Enhancement Agent** - Specialized for improving existing images
- **Image Generation Agent** - Optimized for creating new images

### Project Structure

```
src/
├── components/          # Shared UI components
├── sections/           # Main application sections
│   ├── chat/          # Chat interface for AI interaction
│   ├── navigation/    # App navigation
│   ├── onboarding/    # Initial setup flow
│   └── settings/      # Configuration management
├── lib/               # Core libraries
│   ├── ai/           # AI model integrations
│   └── utils/        # Utility functions
├── hooks/            # Custom React hooks
└── types/            # TypeScript type definitions
```

## 🔧 Configuration

### Environment Variables

Create `.env.development` and `.env.prod` files:

```env
# Development
VITE_API_ENDPOINT=http://localhost:3000

# Production
VITE_API_ENDPOINT=https://your-api-endpoint.com
```

### Webflow Configuration

The `webflow.json` file configures the extension:

```json
{
  "name": "ai-image-enhancer",
  "publicDir": "dist",
  "size": "comfortable",
  "apiVersion": "2"
}
```

## 🚢 Deployment

### Build for Production

```bash
# Build production bundle
npm run build:prod

# Build development bundle
npm run build:dev
```

### Deploy to Webflow

1. **Build the extension**: Run the build command
2. **Upload bundle**: Use the generated bundle file
3. **Submit to Marketplace**: Follow Webflow's app submission process

## 🔍 API Usage & Costs

This extension uses **your own Google AI Studio API key**, which means:

- **Direct billing** - Costs go directly to your Google Cloud account
- **Transparent pricing** - See [Google AI Studio pricing](https://aistudio.google.com/pricing)
- **Usage control** - You have full control over your API usage
- **No markup** - No additional fees from our extension

### Typical Costs (as of 2024)

- **Text generation**: $0.075 per 1M input tokens, $0.30 per 1M output tokens
- **Image generation**: Varies by model and image size
- **Most operations cost less than $0.01**

## 🤝 Contributing

We welcome contributions! Please see our contributing guidelines:

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Commit changes**: `git commit -m 'Add amazing feature'`
4. **Push to branch**: `git push origin feature/amazing-feature`
5. **Open a Pull Request**

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

**What this means:**

- ✅ **Free to use** - Personal and commercial use allowed
- ✅ **Free to modify** - Adapt the code to your needs
- ✅ **Free to distribute** - Share your modifications
- ✅ **No warranty** - Use at your own risk
- ✅ **Attribution required** - Keep the license notice

The MIT License is one of the most permissive and widely-used open source licenses, chosen to encourage maximum adoption and contribution to this Webflow community tool.

## 🆘 Support

### Common Issues

**"Invalid API token format"**

- Ensure your key starts with `AIza`
- Verify you're using a Google AI Studio key, not Google Cloud

**"Please select an image first"**

- Click on an image element in Webflow before using enhance mode
- Ensure the selected element is actually an image

**"Error generating image"**

- Check your API key is valid and has credits
- Verify your internet connection
- Try with a simpler prompt

### Getting Help

- **GitHub Issues**: [Report bugs or request features](https://github.com/your-username/webflow-ai-image-extension/issues)
- **Webflow Community**: Join discussions about Webflow extensions
- **Documentation**: [Webflow Designer Extensions Docs](https://developers.webflow.com/data/docs/designer-extensions/getting-started)

## 🙏 Acknowledgments

- **Webflow Team** - For the excellent Designer Extensions platform
- **Google AI Team** - For the powerful Gemini AI models
- **React Community** - For the amazing ecosystem
- **Contributors** - Everyone who helps improve this extension

---

**Made with ❤️ for the Webflow community**

_This extension is not affiliated with Webflow Inc. or Google LLC._
