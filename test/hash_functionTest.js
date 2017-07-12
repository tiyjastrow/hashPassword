const chai = require("chai");
const hashPassword = require("../hash_function").hashPassword;
const isPasswordCorrect = require("../hash_function").isPasswordCorrect;
const expect = chai.expect;
const assert = chai.assert;
chai.should();

describe("Hash Function", function() {
  const password = "someMadeUp_String123";
  const cryptedPassword = hashPassword(password);

  it("Should create a valid hash", function() {
    cryptedPassword.hash.should.not.contain(password);
    cryptedPassword.hash.length.should.be.greaterThan(256);
  });

  it("Should save the Salt and Iterations", function() {
    cryptedPassword.should.have.property("salt");
    cryptedPassword.should.have.property("iterations");
    cryptedPassword.salt.should.have.lengthOf(32);
    cryptedPassword.iterations.should.be.equal(20000);
  })
  
  it("Should be able to validate the password", function(){
    assert( isPasswordCorrect("someMadeUp_String123", cryptedPassword) );
  });
});