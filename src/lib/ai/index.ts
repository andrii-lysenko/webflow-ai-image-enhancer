import { ImageEnhancerAgent } from "./agents/ImageEnhancerAgent";
import { ImageGeneratorAgent } from "./agents/ImageGeneratorAgent";
import { AIModel } from "./models/AIModel";
import { GeminiModel } from "./models/GeminiModel";
import { OpenAIModel } from "./models/OpenAIModel";

export function getModelInstance(
  provider: string,
  apiKey: string,
  model: string
): () => AIModel {
  let instance: AIModel;
  return () => {
    if (!instance) {
      switch (provider) {
        case "openai":
          instance = new OpenAIModel(apiKey, model);
          return instance;
        case "gemini":
          instance = new GeminiModel(apiKey, model);
          return instance;
        default:
          instance = new OpenAIModel(apiKey, model);
          return instance;
      }
    }
    return instance;
  };
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
  const getModel = getModelInstance("gemini", apiKey, model);
  return getAgent(type, getModel());
}
