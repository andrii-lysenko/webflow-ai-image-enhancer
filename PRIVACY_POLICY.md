# Privacy Policy - AI Image Enhancement for Webflow

**Effective Date**: June 4, 2025  
**Last Updated**: June 4, 2025

## 1. INTRODUCTION

This Privacy Policy describes how the AI Image Enhancement extension for Webflow ("Extension", "Service", "we", "our") handles your personal information and data. We are committed to protecting your privacy and being transparent about our data practices.

**Key Privacy Principles:**

- We collect **NO personal data** or user information
- We do **NOT store** your API keys or images on our servers
- All processing happens **locally in your browser** or directly with third-party services
- We operate as a **privacy-first, open-source tool**

## 2. INFORMATION WE DO NOT COLLECT

### 2.1 Personal Information

We do **NOT** collect, store, or process:

- Names, email addresses, or contact information
- User accounts or authentication data
- Demographic or profile information
- Usage analytics or behavioral data
- Device fingerprints or tracking identifiers

### 2.2 API Keys and Credentials

- Your Google AI Studio API key is stored **only in your browser's memory** during your session
- We **never** transmit, store, or have access to your API credentials
- API keys are **not** persisted to any form of storage (localStorage, sessionStorage, etc.)
- When you close the extension, your API key is automatically cleared

### 2.3 Images and Content

- We do **NOT** store, cache, or process your images on our servers
- Images are transmitted **directly** from your browser to Google's AI services
- We **never** have access to your image content or AI prompts
- Enhanced or generated images are handled entirely within your browser session

### 2.4 Webflow Data

- We do **NOT** access your Webflow account information
- We do **NOT** store information about your Webflow sites or projects
- We only interact with the selected image elements you choose to enhance

## 3. HOW THE EXTENSION WORKS (DATA FLOW)

### 3.1 API Key Handling

1. **Input**: You enter your Google AI Studio API key in the onboarding screen
2. **Validation**: The extension validates the key format locally (checks if it starts with "AIza")
3. **Storage**: The key is stored temporarily in your browser's memory (React state)
4. **Usage**: The key is used to authenticate directly with Google's AI services
5. **Clearing**: The key is automatically cleared when you close the extension

### 3.2 Image Processing Flow

1. **Selection**: You select an image element in your Webflow project
2. **Upload** (Generate mode): You optionally upload reference images
3. **Processing**: Images and prompts are sent **directly** to Google's Gemini API using your credentials
4. **Response**: AI-generated content is returned directly to your browser
5. **Application**: You choose whether to apply the results to your Webflow project

### 3.3 No Server-Side Processing

- The extension operates entirely **client-side** (in your browser)
- We maintain **no backend servers** that process your data
- All AI interactions happen directly between your browser and Google's services
- We act only as a **conduit** to facilitate these interactions

## 4. THIRD-PARTY SERVICES

### 4.1 Google AI Studio / Gemini API

- **Data Shared**: Images, text prompts, and your API key (for authentication)
- **Purpose**: AI image enhancement and generation processing
- **Their Policies**: Google's AI Studio Terms of Service and Privacy Policy apply
- **Our Role**: We facilitate the connection but do not process or store this data
- **Direct Relationship**: You have a direct contractual relationship with Google

### 4.2 Webflow Platform

- **Data Shared**: Enhanced images applied to your selected elements
- **Purpose**: Integration with Webflow Designer interface
- **Their Policies**: Webflow's Terms of Service and Privacy Policy apply
- **Our Role**: We use Webflow's Designer Extension APIs to interact with selected elements
- **Permissions**: Only accesses image elements you explicitly select

### 4.3 No Other Third Parties

- We do **NOT** integrate with analytics services (Google Analytics, etc.)
- We do **NOT** use tracking or marketing tools
- We do **NOT** share data with advertising networks
- We do **NOT** use customer support platforms that might collect data

## 5. LOCAL BROWSER STORAGE

### 5.1 What We Store Locally

The extension may store the following **only in your browser**:

- User interface preferences (theme, settings)
- Extension state during your session
- Temporary image previews for the user interface

### 5.2 What We Do NOT Store Locally

- Your API key (cleared when extension closes)
- Your images or AI-generated content
- Your Webflow account information
- Usage history or analytics data

### 5.3 How to Clear Local Data

You can clear any locally stored data by:

- Clearing your browser's cache and cookies
- Using your browser's developer tools to clear local storage
- Uninstalling and reinstalling the extension

## 6. OPEN SOURCE TRANSPARENCY

### 6.1 Code Transparency

- This extension is **open source** under the MIT License
- All source code is publicly available on GitHub
- You can inspect exactly how your data is handled
- Community contributions are welcome and reviewed publicly

### 6.2 No Hidden Data Collection

- There are **no hidden tracking scripts** or data collection mechanisms
- The codebase can be audited by anyone
- All third-party integrations are clearly documented

## 7. DATA SECURITY

### 7.1 Our Security Measures

- **No servers to secure**: We don't store data, so there's no server-side security risk
- **Client-side only**: All data handling happens in your secure browser environment
- **Direct API connections**: Your data goes directly to Google using secure HTTPS connections
- **No man-in-the-middle**: We don't intercept or process your data in transit

### 7.2 Your Security Responsibilities

- **API Key Security**: Keep your Google AI Studio API key secure and don't share it
- **Browser Security**: Use a secure, up-to-date browser
- **Network Security**: Use secure internet connections when processing sensitive images

### 7.3 Google's Security

- Your images and prompts are protected by Google's enterprise-grade security
- Google's privacy and security policies apply to data they receive
- We recommend reviewing Google's AI Studio privacy documentation

## 8. CHILDREN'S PRIVACY

- This extension is not intended for children under 13 years of age
- We do not knowingly collect personal information from children
- If you are under 13, please do not use this extension
- Parents should monitor their children's use of AI-powered tools

## 9. INTERNATIONAL DATA TRANSFERS

### 9.1 Our Role

- We do **NOT** transfer any data internationally (we don't collect data)
- Any data transfers occur directly between your browser and Google's services

### 9.2 Google's Handling

- Google may process your images and prompts in various international locations
- Google's privacy policy governs how they handle international data transfers
- We recommend reviewing Google's data handling practices if this is a concern

## 10. YOUR PRIVACY RIGHTS

### 10.1 Rights We Cannot Exercise (Because We Have No Data)

Since we don't collect or store your personal data, we cannot:

- Provide data access (we don't have your data)
- Delete your data (we don't store it)
- Correct your data (we don't maintain it)
- Port your data (we don't possess it)

### 10.2 Rights You Have Directly

- **Control**: You have complete control over what data you share with the extension
- **Transparency**: You can inspect our open-source code to verify our practices
- **Choice**: You can stop using the extension at any time without data consequences
- **Google Rights**: You have rights regarding data processed by Google under their policies

### 10.3 For EU/GDPR Users

- We are **NOT** a data controller or processor of your personal data
- Google acts as the data processor for images and prompts you send to their API
- You maintain control as the data controller for any personal data in your images
- You should ensure you have proper legal basis before processing personal data through AI services

### 10.4 For California/CCPA Users

- We do **NOT** sell personal information (we don't collect it)
- We do **NOT** share personal information for marketing purposes
- There are no "Do Not Sell" opt-outs needed (we don't sell data)

## 11. CHANGES TO THIS PRIVACY POLICY

### 11.1 How We Update This Policy

- We may update this Privacy Policy periodically
- Material changes will be communicated through the extension or our GitHub repository
- The "Last Updated" date at the top will reflect any changes
- Continued use after changes constitutes acceptance

### 11.2 Types of Changes

Potential future changes might include:

- Updates to reflect new features (while maintaining our no-data-collection approach)
- Clarifications based on user questions
- Updates to comply with new privacy regulations
- Changes to third-party service integrations

## 12. CONTACT INFORMATION

### 12.1 Privacy Questions

For questions about this Privacy Policy or our privacy practices:

- **GitHub Issues**: [Open an issue on our repository](https://github.com/andrii-lysenko/webflow-ai-image-enhancer/issues)
- **Email**: bat.weblfow.ai.image@gmail.com

### 12.2 Third-Party Privacy Questions

For questions about how third-party services handle your data:

- **Google AI Studio**: [Google's Privacy Policy](https://policies.google.com/privacy)
- **Webflow**: [Webflow's Privacy Policy](https://webflow.com/legal/privacy)

## 13. LEGAL BASIS FOR PROCESSING (GDPR)

### 13.1 Our Processing

Since we do not collect or process personal data, no legal basis is required for our activities.

### 13.2 Your Processing

When you use the extension to process images that may contain personal data:

- **You** are the data controller
- **You** must ensure you have appropriate legal basis (consent, legitimate interest, etc.)
- **You** are responsible for GDPR compliance for any personal data in your images

## 14. DATA RETENTION

### 14.1 Our Retention Policy

- **API Keys**: Not retained (cleared when extension closes)
- **Images**: Not stored by us (processed directly with Google)
- **Usage Data**: Not collected
- **Preferences**: Stored locally in your browser until you clear them

### 14.2 Third-Party Retention

- **Google**: May retain data according to their policies
- **Webflow**: May retain project data according to their policies
- We recommend reviewing their respective data retention policies

## 15. AUTOMATED DECISION MAKING

### 15.1 Our Automated Processing

- We do **NOT** engage in automated decision-making about users
- We do **NOT** create user profiles or make algorithmic decisions

### 15.2 AI Processing

- Google's AI services make automated decisions about image enhancement/generation
- These decisions are based solely on your prompts and images
- We do not influence or control these AI decisions

## 16. PRIVACY BY DESIGN

### 16.1 Our Approach

This extension was built with privacy-by-design principles:

- **Data minimization**: We collect no data
- **Purpose limitation**: We only facilitate AI processing
- **Transparency**: Open-source code provides full visibility
- **User control**: You control all data sharing decisions

### 16.2 Technical Implementation

- No tracking scripts or analytics
- No user identification or session tracking
- No server-side data storage
- Direct client-to-API communication

## 17. DEFINITIONS

- **Extension**: The AI Image Enhancement for Webflow software application
- **Personal Data**: Any information that can identify an individual
- **Processing**: Any operation performed on data (which we don't do)
- **Data Controller**: The entity that determines purposes and means of data processing
- **Data Processor**: The entity that processes data on behalf of a controller
- **Third-Party Services**: Google AI Studio and Webflow platform

---

**Summary: This extension is designed to respect your privacy. We don't collect, store, or process your personal data. All processing happens directly between your browser and the AI services you choose to use.**

**This extension is not affiliated with Webflow Inc. or Google LLC.**

---

_This Privacy Policy was last reviewed and updated on June 4, 2025. We are committed to maintaining the highest standards of privacy protection for our users._
