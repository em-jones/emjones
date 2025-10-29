export declare const sharedConfig: {
    test: {
        globals: boolean;
        coverage: {
            provider: "istanbul";
            reporter: readonly [readonly ["json", {
                readonly file: "../coverage.json";
            }]];
            enabled: boolean;
        };
    };
};
export { baseConfig } from './configs/base-config.js';
export { uiConfig } from './configs/ui-config.js';
//# sourceMappingURL=index.d.ts.map