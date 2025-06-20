import { ImageEnhancerAgent } from "./agents/ImageEnhancerAgent";
import { ImageGeneratorAgent } from "./agents/ImageGeneratorAgent";
import { AIModel } from "./models/AIModel";
import { GeminiModel } from "./models/GeminiModel";
import { OpenAIModel } from "./models/OpenAIModel";

export function getModel(
  provider: string,
  apiKey: string,
  model: string
): AIModel {
  switch (provider) {
    case "openai":
      return new OpenAIModel(apiKey, model);
    case "gemini":
      return new GeminiModel(apiKey, model);
    default:
      return new OpenAIModel(apiKey, model);
  }
}

export type AgentType = "imageEnhancer" | "imageGenerator";

export function getAgent(type: AgentType, model: AIModel) {
  switch (type) {
    case "imageEnhancer":
      return new ImageEnhancerAgent(model);
    case "imageGenerator":
      return new ImageGeneratorAgent(model);
  }

  return new ImageGeneratorAgent(model);
}

export function createAIAgent(type: AgentType, apiKey: string, model: string) {
  return getAgent(type, getModel("gemini", apiKey, model));
}
