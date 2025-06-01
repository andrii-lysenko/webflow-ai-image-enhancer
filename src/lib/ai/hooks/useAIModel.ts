import { useEffect, useState } from "react";
import { Agent } from "../agents/Agent";
import { AgentType, getModelInstance, getAgent } from "..";

export function useAIAgent(type: AgentType, apiKey: string, model: string) {
  const [agent, setAgent] = useState<Agent | null>(null);

  useEffect(() => {
    const getModel = getModelInstance("gemini", apiKey, model);
    const agent = getAgent(type, getModel());
    setAgent(agent);
  }, [type, apiKey, model]);

  return { agent };
}
