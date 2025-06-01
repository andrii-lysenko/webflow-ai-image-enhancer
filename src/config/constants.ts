export enum AIProvider {
  GEMINI = "gemini",
  OPENAI = "openai",
}

export const AI_PROVIDER_OPTIONS = [
  { value: AIProvider.GEMINI, label: "Gemini" },
  { value: AIProvider.OPENAI, label: "OpenAI" },
];

export const GEMINI_MODELS = [
  { value: "gemini-2.0-flash", label: "Gemini 2.0 Flash" },
  {
    value: "gemini-2.5-flash-preview-05-20",
    label: "Gemini 2.5 Flash Preview",
  },
  { value: "gemini-1.5-flash", label: "Gemini 1.5 Flash" },
];

export const GEMINI_IMAGE_MODELS = [
  {
    value: "gemini-2.0-flash-preview-image-generation",
    label: "Gemini 2.0 Flash Preview Image Generation",
  },
];

export const OPENAI_MODELS = [{ value: "o4-mini", label: "o4-mini" }];

export const OPENAI_IMAGE_MODELS = [
  { value: "gpt-image-1", label: "GPT Image 1" },
];

export const DEFAULT_SETTINGS = {
  aiProvider: AIProvider.GEMINI,
  geminiModel: GEMINI_MODELS[0].value,
  openaiModel: OPENAI_MODELS[0].value,
  geminiImageModel: GEMINI_IMAGE_MODELS[0].value,
  openaiImageModel: OPENAI_IMAGE_MODELS[0].value,
  apiKey: "",
  customPrompt: "",
};

export type SettingsState = {
  aiProvider: AIProvider;
  geminiModel: string;
  openaiModel: string;
  geminiImageModel: string;
  openaiImageModel: string;
  apiKey: string;
  customPrompt: string;
};
