import { useState, useEffect } from "react";
import {
  DEFAULT_SETTINGS,
  SettingsState,
  AIProvider,
} from "../config/constants";

const LOCAL_STORAGE_KEY = "ai-enhancer-ai-image-settings";

export const useSettings = () => {
  const [settings, setSettings] = useState<SettingsState>(() => {
    const storedSettings = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (storedSettings) {
      try {
        const parsedSettings = JSON.parse(storedSettings) as SettingsState;
        // Ensure aiProvider is correctly typed, default if not found or invalid
        if (!Object.values(AIProvider).includes(parsedSettings.aiProvider)) {
          parsedSettings.aiProvider = DEFAULT_SETTINGS.aiProvider;
        }
        return { ...DEFAULT_SETTINGS, ...parsedSettings };
      } catch (error) {
        console.error("Error parsing settings from localStorage", error);
        return DEFAULT_SETTINGS;
      }
    }
    return DEFAULT_SETTINGS;
  });

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(settings));
  }, [settings]);

  const saveSettings = (newSettings: Partial<SettingsState>) => {
    setSettings((prevSettings) => ({ ...prevSettings, ...newSettings }));
  };

  return { settings, saveSettings };
};
