
export type EvaluatedCommands = any;

export interface CommandsEvaluator<SOURCE> {
   (source?: SOURCE): EvaluatedCommands;
}
