import { defineProject, mergeConfig } from "vitest/config";
import { baseConfig } from "./base-config.js";
export var uiConfig = mergeConfig(baseConfig, defineProject({
    test: {
        environment: "jsdom",
    },
}));
