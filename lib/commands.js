/**
 * @class
 */
(function () {

   "use strict";

   /**
    *
    * @constructor
    * @name Commands
    *
    * @param {Function} evaluator The function to run to get the commands
    * @param {Boolean} liveEvaluation Whether the evaluator should run every time options are interrogated
    */
   function Commands(evaluator, liveEvaluation) {
      this.evaluator = evaluator;
      this.liveEvaluation = liveEvaluation;
   }

   /**
    * @type {Function}
    */
   Commands.prototype.evaluator = null;

   /**
    * @type {Boolean}
    */
   Commands.prototype.liveEvaluation = false;

   /**
    * @type {Object}
    */
   Commands.prototype._args = null;

   /**
    * Gets the value of the supplied key from the arguments sent to the script. If the key was not set, the
    * defaultValue argument will be returned instead.
    *
    * @param {String} key
    * @param {String} defaultValue
    * @return {String}
    */
   Commands.prototype.get = function(key, defaultValue) {
      if(this.evaluator) {
         this._args = this.evaluator();
         if(!this.liveEvaluation) {
            delete this.evaluator;
         }
      }

      return (this._args[key] === undefined) ? defaultValue : this._args[key];
   };

   /**
    * Gets whether the supplied key was set as an option.
    *
    * @param {String} key
    * @return {Boolean}
    */
   Commands.prototype.exists = function(key) {
      return this.get(key) !== undefined;
   };

   /**
    * Reads options from the search and hash sections of the current location to return options, any name that starts
    * with two dashes will be treated as an option in the same way as the command line version (eg: --foo&--no-bar becomes
    * { foo: true, bar: false }), otherwise it is just name value pairs pushed into a map.
    *
    * @return {Object}
    */
   Commands.locationEvaluator = function() {
      var option, arg,
          options = {},
          source = location.search.substr(1).split('&')
                     .concat(location.hash.substr(1).split('&'))
                     .filter(Commands.locationEvaluator.removeEmptyElements);

      while(source.length) {
         option = source.pop().split('=', 2);

         if(arg = option[0].match(/^--(.+)/)) {
            if(arg[1].substr(0,3) == 'no-') {
               options[Commands.toCamelCase(arg[1].substring(3))] = false;
            }
            else {
               options[Commands.toCamelCase(arg[1])] = true;
            }
         }
         else {
            options[Commands.toCamelCase(option[0])] = option.length > 1 ? option[1] : null;
         }
      }

      return options;
   };

   /**
    * Used as an internal function for filtering arrays - removes any item that is an empty string.
    *
    * @param {String} item
    * @return {Boolean}
    */
   Commands.locationEvaluator.removeEmptyElements = function(item) {
      return !!item;
   };

   /**
    * Evaluates arguments based on those supplied to the node application, always assumes that
    * the order of arguments is the executable path followed by the script name and then the optional
    * arguments.
    */
   Commands.argvEvaluator = function() {
      var arg,
          argv = process.argv.slice(2),
          options = {};

      for(var i = 0; i < argv.length; i++) {
         if(arg = argv[i].match(/^--(.+)/)) {
            if(arg[1].substr(0,3) == 'no-') {
               options[Commands.toCamelCase(arg[1].substring(3))] = false;
            }
            else {
               options[Commands.toCamelCase(arg[1])] = true;
            }
         }
         else if(argv[i].charAt(0) == '-') {
            options[Commands.toCamelCase(argv[i].substring(1))] = argv[++i];
         }
      }

      return options;
   };

   /**
    * Creates a new string that has been converted to camel case where any non letter is treated as a word break.
    * @return {String}
    */
   Commands.toCamelCase = function(input) {
      return input.toLowerCase().replace(/[^a-z0-9]+(.)/, function(all, camelLetter) {
         return camelLetter.toUpperCase();
      });
   };

   if(typeof module == 'undefined') {
      window.commands = new Commands(Commands.locationEvaluator, true);
   }
   else {
      module.exports = new Commands(Commands.argvEvaluator, false);
   }

}());