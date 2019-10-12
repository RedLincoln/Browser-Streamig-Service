var clockFormatToSeconds = require('../src/utils.js');

test('seconds units must be well calculated', () => {
 	var input = '1';

 	var result = clockFormatToSeconds(input);

 	expect(result).toBe(1);
});


test('seconds tens must be well calculated', () => {
 	var input = '10';

 	var result = clockFormatToSeconds(input);

 	expect(result).toBe(10);
});


test('seconds hundreds or more must couse an Error', () => {
 	var input = '100';

 	expect(() => {
 		clockFormatToSeconds(input);
 	}).toThrow('Bad input');
});

test('seconds input must be a string', () => {
 	var input = true;

 	expect(() => {
 		clockFormatToSeconds(input);
 	}).toThrow('Bad input');
});

test('seconds input must contain only integer(s)', () => {
 	var input = 'tr';

 	expect(() => {
 		clockFormatToSeconds(input);
 	}).toThrow('Bad input');
});



