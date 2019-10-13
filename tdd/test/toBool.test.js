var modules = require('../src/utils.js');
var toBool = modules.toBool;

describe("toBool must return true when", () => {
	test("input is boolean and true", () =>{
		var input = true;

		var result = toBool(input);

		expect(result).toEqual(true);
	});

	test("input is true string", () =>{
		var input = "true";

		var result = toBool(input);

		expect(result).toEqual(true);
	});

});

describe("toBool must return false when", () => {
	test("input is boolean and false", () =>{
		var input = false;

		var result = toBool(input);

		expect(result).toEqual(false);
	});

	test("input is string and not true", () =>{
		var input = 'f';

		var result = toBool(input);

		expect(result).toEqual(false);
	});

	test("input is 0", () =>{
		var input = 0;

		var result = toBool(input);

		expect(result).toEqual(false);
	});
});