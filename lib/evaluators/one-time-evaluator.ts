import { CommandEvaluator, CommandValues } from '../command-reader';

/**
 * Higher order evaluator - converts any other `CommandEvaluator` to an evaluator that always returns the
 * same value.
 */
export const oneTimeEvaluator: (fn: CommandEvaluator) => CommandEvaluator = (fn) => {
   let result: CommandValues;
   let called = false;

   return () => {
      if (!called) {
         called = true;
         result = fn();
      }

      return result;
   }
};
