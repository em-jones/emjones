import { Brand } from 'effect';
/**
 * A branded type representing a semantic version in the format "MAJOR.MINOR.PATCH".
 * Example valid versions: "1.0.0", "2.1.3", "0.9.5"
 * @example
 * ```ts
 * import { SemanticVersion } from './index';
 *
 * const version: SemanticVersion = SemanticVersion('1.2.3'); // Valid
 * const invalidVersion: SemanticVersion = SemanticVersion('1.2'); // Error: Invalid semantic version
 * ```
 */
export type SemanticVersion = string & Brand.Brand<'SematicVersion'>;
export const SemanticVersion = Brand.refined<SemanticVersion>(v => v.match(/^\d+\.\d+\.\d+$/) !== null, v => Brand.error(`Invalid semantic version: ${v}`));

