/* Place helper functions here. */

//Alex's helpers functions:

import {hash} from "bcrypt";

export const argString = ({
  required = true,
  trim,
  nonEmpty, //Equivalent to lower = 0
  lower,
  upper
} = {}) => {
  let chain = [];

  //Default for string type
  chain.push((arg, argName) => {
    if (typeof arg !== "string")
      throw `Argument "${argName}" must be of type string`;
    return arg;
  });

  if (trim) {
    chain.push((arg, _) => arg.trim());
  }

  if (nonEmpty)
    lower = 1;

  if (lower !== undefined) {
    let emsg = [`Argument "`, `" must be at least ${lower} characters`];
    if (lower === 1) emsg = [`Argument "`, `" cannot be empty or only spaces`];

    chain.push((arg, argName) => {
      if (arg.length < lower)
        throw emsg[0] + argName + emsg[1];
      return arg;
    });
  }

  if (upper !== undefined) {
    chain.push((arg, argName) => {
      if (arg.length > upper)
        throw `Argument "${argName}" cannot be more than ${upper} characters`;
      return arg;
    });
  }

  return (arg, argName) => {
    if (required && arg === undefined)
      throw `Argument "${argName}" is required`;

    for (let func of chain)
      arg = func(arg, argName);
    return arg;
  };
};

export const argNumber = ({
  required = true,
  integer,
  lower,
  upper
} = {}) => {
  let chain = [];

  chain.push((arg, argName) => {
    if (typeof arg !== "number")
      throw `Argument "${argName}" must be of type number`;
    return arg;
  });

  if (integer) {
    chain.push((arg, argName) => {
      if (!Number.isInteger(arg))
        throw `Argument "${argName}" must be an integer`;
      return arg;
    });
  }

  if (lower !== undefined) {
    chain.push((arg, argName) => {
      if (arg < lower)
        throw `Argument "${argName}" must be greater than or equal to ${lower}`;
      return arg;
    });
  }

  if (upper !== undefined) {
    chain.push((arg, argName) => {
      if (arg > upper)
        throw `Argument "${argName}" cannot be greater than ${upper}`;
      return arg;
    });
  }

  return (arg, argName) => {
    if (required && arg === undefined)
      throw `Argument "${argName}" is required`;

    for (let func of chain)
      arg = func(arg, argName);
    return arg;
  };
};

export const argObject = (keys, {
  required = true,
  extraneous, //If true, arg can contain keys not in keys
  discardExtra, //If true, extraneous arguments are discarded in the returned object
  requiredKeys, //Map of key names to booleans (by default, all are required)
  numRequired, //Least number of keys required (assumed <= num. keys)
  prependArgName = true
} = {}) => {
  const prettyList = (ls) => {
    let str = "";
    for (let prop of ls) {
      if (str === "") str = prop;
      else str += ", " + prop;
    }
    return str;
  };

  //INVARIANT: numRequired should be less than or equal to the length of requiredKeys or keys
  if (requiredKeys !== undefined) {
    if (numRequired === undefined)
      numRequired = Object.keys(requiredKeys).length;
  } else {
    requiredKeys = {};
    let value = (numRequired === undefined) ? true : false;
    for (let key in keys) requiredKeys[key] = value;
    if (numRequired === undefined)
      numRequired = Object.keys(keys).length;
  }

  //If equivalent, throw if an attribute not in keys is found
  //For requiredKeys, at the end, make sure all requirements were "checked off"
  //For numRequired, at the end, make sure at least that amount of keys were "hit"
  return (arg, argName) => {
    if (required && arg === undefined)
      throw `Argument "${argName}" is required`;
    if (typeof arg !== "object" || arg === null)
      throw `Argument "${argName}" must be of type object`;

    let new_arg = {}; //Map new values
    let checklist = Object.assign({}, requiredKeys); //Keys with "true" are marked off in the loop; copy
    let counter = 0; //Used for comparing to numRequired

    for (let k in arg) {
      let v = arg[k];
      let func = keys[k];

      //Extraneous key - only an error if equivalent was selected
      if (func === undefined) {
        if (!extraneous) throw `Unexpected key "${k}" in "${argName}"`;
        else {
          //Otherwise, carry on
          if (!discardExtra) new_arg[k] = v;
          continue;
        }
      }

      let nextArgName = k;
      if (prependArgName) nextArgName = `${argName}.${k}`;

      v = func(v, nextArgName);
      new_arg[k] = v;

      checklist[k] = false;
      counter++;
    }

    let still_required = [];
    for (let key in requiredKeys) {
      if (requiredKeys[key]) still_required.push(key);
    }

    if (counter < numRequired)
      throw `Argument "${argName}" expects at least ${numRequired} keys`;
    if (still_required.length > 0)
      throw `Argument "${argName}" requires the following keys: ${prettyList(still_required)}`;

    return new_arg;
  };
};

export const argArray = (callback, {
  required = true,
  lower,
  upper,
  prependArgName = true
} = {}) => {
  let chain = [];

  chain.push((arg, argName) => {
    if (!(arg instanceof Array) || arg === null)
      throw `Argument "${argName}" must be of type Array`;
  });

  if (lower !== undefined) {
    chain.push((arg, argName) => {
      if (arg.length < lower)
        throw `Argument "${argName}" must have at least ${lower} items`;
    });
  }

  if (upper !== undefined) {
    chain.push((arg, argName) => {
      if (arg.length > upper)
        throw `Argument "${argName}" cannot have more than ${upper} items`;
    });
  }

  return (arg, argName) => {
    if (required && arg === undefined)
      throw `Argument "${argName}" is required`;

    for (let func of chain)
      func(arg, argName);

    let new_arg = [];
    for (let index in arg) {
      let nextArgName = index;
      if (prependArgName) nextArgName = `${argName}[${index}]`;

      new_arg.push(callback(arg[index], nextArgName, index));
    }

    return new_arg;
  };
};

///////////////////////////////////////////////////////////////////////////////

export const checkString = argString({trim: true, nonEmpty: true});
export const checkObject = (keys, arg, argName) => {
  return argObject(keys, {
    extraneous: true,
    discardExtra: true,
    numRequired: 1,
    prependArgName: true
  })(arg, argName);
};
export const checkPositive = argNumber({lower: Number.MIN_VALUE});
export const checkPositiveInteger = argNumber({integer: true, lower: 1});
export const checkNonNegative = argNumber({lower: 0});
export const checkNonNegativeInteger = argNumber({integer: true, lower: 0});

export const hashPassword = async (password) => {
  return await hash(password, 10);
};
