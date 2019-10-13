var modules = require('../src/utils.js');
var toBool = modules.toBool;

describe("toBool must return true when", () => {
	test("input is boolean and true", () =>{
		var input = true;

		var result = toBool(input);

		expect(result).toEqual(true);
	});
});