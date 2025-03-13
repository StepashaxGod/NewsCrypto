   const script = require("./login.js");
   const validateInputFormForTest = script.validateInputFormForTest;

test("if email: stepa@gmail.com and password: 123456", () => {
   expect(validateInputFormForTest("stepa@gmail.com", "123456")).toBe(true);  
}) // all correct

test("if email: stepa@gmail.com and password: 1234", () => {
   expect(validateInputFormForTest("stepa@gmail.com", "1234")).toBe(false);
}) // password incorrect 

test("if email: step]¶{ald, password: 123456", () => {
   expect(validateInputFormForTest("step]¶{ald", "123456")).not.toBe(true)
}) // email incorrect
// command - (npx jest) for all the tests
