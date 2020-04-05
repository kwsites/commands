export type CommandValuePrimitive = string | boolean | null;

export type CommandValue = CommandValuePrimitive | CommandValuePrimitive[];

export type CommandValues = { [key: string]: CommandValue };

export type CommandEvaluator = () => CommandValues;

export class CommandReader {

   private _args: CommandValues = {};

   constructor(
      private _evaluator: () => CommandValues,
   ) {
   }

   /**
    * Gets a copy of all options
    * @return {Object}
    */
   public all() {
      this._evaluate();
      return {...this._args};
   };

   /**
    * Gets the value of the supplied key from the arguments sent to the script. If the key was not set, the
    * defaultValue argument will be returned instead.
    */
   public get(key: string, defaultValue?: CommandValue): CommandValue | undefined {
      return this.exists(key) ? this._args[key] : defaultValue;
   }

   /**
    * Gets whether the supplied key was set as an option.
    *
    * @param {String} key
    * @return {Boolean}
    */
   exists(key: string): boolean {
      this._evaluate();
      return this._args.hasOwnProperty(key) && typeof this._args[key] !== 'undefined';
   }

   private _evaluate() {
      this._args = this._evaluator();
   }

}
