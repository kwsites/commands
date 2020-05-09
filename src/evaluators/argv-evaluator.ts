import { optionsAppender } from './options-appender';
import { CommandsEvaluator, EvaluatedCommands } from './types';

/**
 * Evaluates arguments based on those supplied to the node application, always assumes that
 * the order of arguments is the executable path followed by the script name and then the optional
 * arguments.
 */
export const argvEvaluator: CommandsEvaluator<string[]> = (argv) => {

   const options: EvaluatedCommands = {};

   if (!argv) {
      argv = process.argv.slice(2);
   }

   for (let i = 0; i < argv.length; i++) {
      const optionFlagArgument = argv[i].match(/^--(no-)?(.+)/);

      if (optionFlagArgument) {
         const optionName = optionFlagArgument[2];
         const optionValue = !optionFlagArgument[1];

         optionsAppender(options, optionName, optionValue);
         continue;
      }

      if (argv[i].charAt(0) == '-') {
         optionsAppender(options, argv[i].substring(1), argv[++i]);
      }
   }

   return options;
}
