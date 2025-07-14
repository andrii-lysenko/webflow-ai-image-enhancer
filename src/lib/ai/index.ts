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
