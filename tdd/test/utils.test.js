var clockFormatToSeconds = require('../src/utils.js');

test('field units must be well calculated', () => {
 	var input = '1';

 	var result = clockFormatToSeconds(input);

 	expect(result).toBe(1);
});


test('field tens must be well calculated', () => {
 	var input = '10';

 	var result = clockFormatToSeconds(input);

 	expect(result).toBe(10);
});


test('field hundreds or more must couse an Error', () => {
 	var input = '100';

 	expect(() => {
 		clockFormatToSeconds(input);
 	}).toThrow('Bad input');
});

test('field input must be a string', () => {
 	var input = true;

 	expect(() => {
 		clockFormatToSeconds(input);
 	}).toThrow('Bad input');
});

test('field input must contain only integer(s)', () => {
 	var input = 'tr';

 	expect(() => {
 		clockFormatToSeconds(input);
 	}).toThrow('Bad input');
});


test('field input empty must couse an Error', () => {
 	var input = '';

 	expect(() => {
 		clockFormatToSeconds(input);
 	}).toThrow('Bad input');
});


test('field input spaces must couse an Error', () => {
 	var input = '  ';

 	expect(() => {
 		clockFormatToSeconds(input);
 	}).toThrow('Bad input');
});



