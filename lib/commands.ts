import { argvEvaluator, locationEvaluator, oneTimeEvaluator } from './evaluators';
import { CommandReader } from './command-reader';

if (typeof (module?.exports) !== 'undefined') {
   module.exports = new CommandReader(oneTimeEvaluator(argvEvaluator));
}
else if (typeof window !== 'undefined') {
   (window as any).commands = new CommandReader(locationEvaluator);
}
