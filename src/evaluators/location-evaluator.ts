import { optionsAppender } from './options-appender';
import { CommandsEvaluator, EvaluatedCommands } from './types';

/**
 * Reads options from the search and hash sections of the current location to return options, any name that starts
 * with two dashes will be treated as an option in the same way as the command line version (eg: --foo&--no-bar becomes
 * { foo: true, bar: false }), otherwise it is just name value pairs pushed into a map.
 */
export const locationEvaluator: CommandsEvaluator<string[]> = (source) => {
   const options: EvaluatedCommands = {};

   if (!source) {
      source = [
         ...location.search.substr(1).split('&'),
         ...location.hash.substr(1).split('&'),
      ];
   }

   while (source.length) {
      const item: string = String(source.pop()).trim();
      if (!item) {
         continue;
      }

      const option = item.split('=', 2);
      const optionFlagArgument = option[0].match(/^--(no-)?(.+)/);

      if (optionFlagArgument) {
         const optionName = optionFlagArgument[2];
         const optionValue = !optionFlagArgument[1];

         optionsAppender(options, optionName, optionValue);
      } else {
         optionsAppender(options, option[0], option.length > 1 ? option[1] : null);
      }
   }

   return options;
}
