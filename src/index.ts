import { locationEvaluator } from './evaluators/location-evaluator';
import { argvEvaluator } from './evaluators/argv-evaluator';
import { Commands } from './commands';

const isInBrowser = (typeof window !== 'undefined');

/**
 * Externalise the evaluator to be able to parse command line style parameters on the fly rather than just from the
 * command line. Note that running the evaluator multiple times will make no difference to the arguments reported by
 * the Commands instance available as a require module, nor is it a great performance consideration.
 */
const evaluate = isInBrowser ? locationEvaluator : argvEvaluator;
const commands = new Commands(evaluate, isInBrowser);

export = Object.assign(
   commands,
   {
      evaluate,
   }
);

if (isInBrowser) {
   (window as any).commands = commands;
}

