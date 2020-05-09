import { EvaluatedCommands } from './types';

/**
 * Appends the named key value pair into the options object. When the key already exists, the value is appended
 * to the existing value as an array.
 */
export function optionsAppender(options: EvaluatedCommands, key: string, value: any) {
   const camelCaseKey = toCamelCase(key);
   if (options[camelCaseKey] === undefined) {
      options[camelCaseKey] = value;
   } else if (Array.isArray(options[camelCaseKey])) {
      options[camelCaseKey].push(value);
   } else {
      options[camelCaseKey] = [options[camelCaseKey], value];
   }
}

/**
 * Creates a new string that has been converted to camel case where any non letter is treated as a word break.
 */
function toCamelCase(input: string): string {
   return input.toLowerCase().replace(/[^a-z0-9]+(.)/g, function (all, camelLetter) {
      return camelLetter.toUpperCase();
   });
}
