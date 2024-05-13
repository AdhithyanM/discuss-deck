import path from "path";
import { fileURLToPath } from "url";

/**
 * Usage:
 * To use this function, pass `import.meta.url` from the module where you need the file or directory path.
 * This is typically done like this:
 *
 * ```javascript
 * import { getDirnameAndFilename } from './path-utils';
 * const { __filename, __dirname } = getDirnameAndFilename(import.meta.url);
 * console.log('Current file:', __filename);
 * console.log('Current directory:', __dirname);
 * ```
 *
 * This function is especially useful in ECMAScript modules (ESM) where __dirname and __filename
 * are not available by default as they are in CommonJS modules.
 */
export const getDirnameAndFilename = (
  metaUrl: string
): { __filename: string; __dirname: string } => {
  const __filename = fileURLToPath(metaUrl);
  const __dirname = path.dirname(__filename);
  return { __filename, __dirname };
};
