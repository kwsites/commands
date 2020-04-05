import { CommandEvaluator, CommandValues } from '../command-reader';
import { commandValuesAppender } from '../command-values-appender';


/**
 * Evaluates arguments based on those supplied to the node application, always assumes that
 * the order of arguments is the executable path followed by the script name and then the optional
 * arguments.
 */
export const argvEvaluator: CommandEvaluator = (argv: string[] = process.argv.slice(2)) => {
   const options: CommandValues = {};

   for (let i = 0, max = argv.length; i < max; i++) {
      const arg = argv[i].match(/^--(.+)/);

      if (arg) {
         if (arg[1].substr(0, 3) == 'no-') {
            commandValuesAppender(options, arg[1].substring(3), false);
         }
         else {
            commandValuesAppender(options, arg[1], true);
         }
      }
      else if (argv[i].charAt(0) == '-') {
         commandValuesAppender(options, argv[i].substring(1), argv[++i]);
      }
   }

   return options;
};
