import { CommandEvaluator, CommandValues } from '../command-reader';
import { commandValuesAppender } from '../command-values-appender';

/**
 * Reads options from the search and hash sections of the current location to return options, any name that starts
 * with two dashes will be treated as an option in the same way as the command line version (eg: --foo&--no-bar becomes
 * { foo: true, bar: false }), otherwise it is just name value pairs pushed into a map.
 */
export const locationEvaluator: CommandEvaluator = () => {

   const options: CommandValues = {};

   const source: string[] = location.search.substr(1).split('&')
      .concat(location.hash.substr(1).split('&'))
      .filter(removeEmptyElements);

   while (source.length) {
      const option = source.pop()!.split('=', 2);
      const arg = option[0].match(/^--(.+)/);

      if (arg) {
         if (arg[1].substr(0, 3) == 'no-') {
            commandValuesAppender(options, arg[1].substring(3), false);
         }
         else {
            commandValuesAppender(options, arg[1], true);
         }
      }
      else {
         commandValuesAppender(options, option[0], option.length > 1 ? option[1] : null);
      }
   }

   return options;
};


/**
 * Used as an internal function for filtering arrays - removes any item that is an empty string.
 */
function removeEmptyElements (item: string): boolean {
   return !!item;
}
