"use strict";

const crypto = require("crypto");

var config = {
  salt: function(length) {
    // 'Math.ceil(length * 3 / 4)' generates a base64 value.
    return crypto
      .randomBytes(Math.ceil(32 * 3 / 4))
      .toString("base64")
      .slice(0, length);
    // If returning a value in hex format, do the following:
    //return crypto.randomBytes(Math.ceil(length/2)).toString('hex').slice(0, length);
  },
  iterations: 20000, // Specify iteration count.
  keylen: 512, //  Specify algorithm byte length.
  digest: "sha512" // Specify algorithm.
};

// Generate Hash
function hashPassword(passwordInput) {
  // Add salt:
  var salt = config.salt(32); // Pass in salt length.
  // Add iterations:
  var iterations = config.iterations;
  // Hash password:
  var hash = crypto.pbkdf2Sync(
    passwordInput,
    salt,
    iterations,
    config.keylen,
    config.digest
  ); // Pass in password, salt, iterations, keylength, and algorithm (sha256 or sha512),.
  // Encode hash:
  var hashedPassword = hash.toString("base64");
  // If using hex, do the following:
  // var hashedPassword = hash.toString('hex');

  // Dev log:
  // console.log("Hashed password: ", hashedPassword);
  // console.log("Salt: ", salt);

  // TODO: save salt, hash, and iterations to database for later retrieval.
  return { salt: salt, hash: hashedPassword, iterations: iterations };
}

function isPasswordCorrect(passwordAttempt, originalHash) {
  var savedHash = originalHash.hash; // Retrieve saved hash.
  var savedSalt = originalHash.salt; // Retrieve saved salt.
  var savedIterations = originalHash.iterations; // Retrieve saved iterations.

  var hash = crypto.pbkdf2Sync(
    passwordAttempt,
    savedSalt,
    savedIterations,
    config.keylen,
    config.digest
  );

  var hashedPassword = hash.toString("base64");
  // Compared saved hash to attempted password hash.
  // Returns a boolean.
  return savedHash === hashedPassword;
}


module.exports = {
    hashPassword, isPasswordCorrect
}