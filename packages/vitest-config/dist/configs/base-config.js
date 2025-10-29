import { defineConfig } from "vitest/config";
export var baseConfig = defineConfig({
    test: {
        coverage: {
            provider: "istanbul",
            reporter: [
                [
                    "json",
                    {
                        file: "../coverage.json",
                    },
                ],
            ],
            enabled: true,
        },
    },
});
