var hashFunction = require("./hash_function");

var newHash = hashFunction.hashPassword("chickenBones7!");
console.log("newHash = ", newHash);

var isValidated = hashFunction.isPasswordCorrect("chickenBones7!", newHash);
console.log("Is it valid? ", isValidated);