import { CommandsEvaluator, EvaluatedCommands } from './evaluators/types';

/**
 *
 * @param {CommandsEvaluator} evaluator The function to run to get the commands
 * @param {Boolean} liveEvaluation Whether the evaluator should run every time options are interrogated
 */
export class Commands {

   private _args: EvaluatedCommands;
   private _evaluated = false;

   constructor(private evaluator: CommandsEvaluator<any>, private liveEvaluation: boolean) {
   }

   private _refresh () {
      if (!this._evaluated) {
         this._args = this.evaluator();
         this._evaluated = !this.liveEvaluation;
      }
   }

   /**
    * Gets a copy of all options
    */
   public all () {
      this._refresh();

      return {
         ...this._args,
      };
   }

   /**
    * Gets the value of the supplied key from the arguments sent to the script. If the key was not set, the
    * defaultValue argument will be returned instead.
    */
   get (key: string, defaultValue?: any) {
      return this.exists(key) ? this._args[key] : defaultValue;
   }

   /**
    * Gets whether the supplied key was set as an option.
    */
   exists (key: string): boolean {
      this._refresh();
      return !!key && Object.prototype.hasOwnProperty.call(this._args, key);
   }
}
