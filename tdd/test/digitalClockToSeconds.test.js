var digitalClockToSeconds = require('../src/utils.js');


describe('digitalClockToSeconds must throw an Error when', () => {
	
	test('fields separator is not a column', () => {
	 	var input = '0,59';

	 	expect(() => {
	 		digitalClockToSeconds(input);
	 	}).toThrow('Bad input');
	});

	test('input have more than two fields', ()=>{
		var input = '0:0:50';

	 	expect(() => {
	 		digitalClockToSeconds(input);
	 	}).toThrow('Bad input');
	});


	test('second field is empty', ()=>{
		var input = '1:';

	 	expect(() => {
	 		digitalClockToSeconds(input);
	 	}).toThrow('Bad input');
	});

	test('minutes field is empty with separator', ()=>{
		var input = ':1';

	 	expect(() => {
	 		digitalClockToSeconds(input);
	 	}).toThrow('Bad input');
	});

	test('the length of the field is greater than two caracters', () => {
	 	var input = '100';

	 	expect(() => {
	 		digitalClockToSeconds(input);
	 	}).toThrow('Bad input');
	});

	test('field input is not a string', () => {
	 	var input = true;

	 	expect(() => {
	 		digitalClockToSeconds(input);
	 	}).toThrow('Bad input');
	});

	test('field is not a Number', () => {
	 	var input = '4r';

	 	expect(() => {
	 		digitalClockToSeconds(input);
	 	}).toThrow('Bad input');
	});


	test('input is empty', () => {
	 	var input = '';

	 	expect(() => {
	 		digitalClockToSeconds(input);
	 	}).toThrow('Bad input');
	});


	test('input only have spaces', () => {
	 	var input = '  ';

	 	expect(() => {
	 		digitalClockToSeconds(input);
	 	}).toThrow('Bad input');
	});

	test('field is negative', () => {
	 	var input = '-1';

	 	expect(() => {
	 		digitalClockToSeconds(input);
	 	}).toThrow('Bad input');
	});

	test('field is greater than 60', () => {
	 	var input = '60';

	 	expect(() => {
	 		digitalClockToSeconds(input);
	 	}).toThrow('Bad input');
	});

	test('there is spaces between two values of a field', () => {
	 	var input = '6 0';

	 	expect(() => {
	 		digitalClockToSeconds(input);
	 	}).toThrow('Bad input');
	});

});

describe("digitalClockToSeconds must calculate the right value when", () => {

	test('field have spaces before and after good value', () => {
	 	var input = ' 1 ';

	 	var result = digitalClockToSeconds(input);

	 	expect(result).toBe(1);
	});

	test('field is a unit integer', () => {
	 	var input = '1';

	 	var result = digitalClockToSeconds(input);

	 	expect(result).toBe(1);
	});

	test('field is a tens integer', () => {
	 	var input = '10';

	 	var result = digitalClockToSeconds(input);

	 	expect(result).toBe(10);
	});

	test('minutes:seconds have proper format', () => {
	 	var input = '2:59';

	 	var result = digitalClockToSeconds(input);
	 	
	 	expect(result).toBe(179);
	});



});



