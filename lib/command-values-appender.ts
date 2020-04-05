import { CommandValuePrimitive, CommandValues } from './command-reader';

/**
 * Appends the named key value pair into the options object. When the key already exists, the value is appended
 * to the existing value as an array.
 *
 * @param {Object} options
 * @param {String} key
 * @param {String} value
 */
export const commandValuesAppender = function (options: CommandValues, key: string, value: CommandValuePrimitive) {
   const camelCaseKey = toCamelCase(key);
   const existingValue = options[camelCaseKey];

   if (!options.hasOwnProperty(camelCaseKey) || existingValue === undefined) {
      options[camelCaseKey] = value;
   }
   else {
      options[camelCaseKey] = [
         ...(Array.isArray(existingValue) ? existingValue : []),
         value,
      ];
   }
};


/**
 * Creates a new string that has been converted to camel case where any non letter is treated as a word break.
 */
function toCamelCase (input: string): string {
   return input.toLowerCase().replace(/[^a-z0-9]+(.)/g, function (all, camelLetter) {
      return camelLetter.toUpperCase();
   });
}
