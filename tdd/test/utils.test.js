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
 	var input = '4r';

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

test('field input must must be positive', () => {
 	var input = '-1';

 	expect(() => {
 		clockFormatToSeconds(input);
 	}).toThrow('Bad input');
});

test('seconds input must must be lewer to 60', () => {
 	var input = '60';

 	expect(() => {
 		clockFormatToSeconds(input);
 	}).toThrow('Bad input');
});

test('minutes:seconds must be well calculated', () => {
 	var input = '2:59';

 	var result = clockFormatToSeconds(input);
 	
 	expect(result).toBe(179);
});


test('minutes:seconds seperator must be a column', () => {
 	var input = '0,59';

 	expect(() => {
 		clockFormatToSeconds(input);
 	}).toThrow('Bad input');
});

test('must throw an Error wiht three or more fields', ()=>{
	var input = '0:0:50';

 	expect(() => {
 		clockFormatToSeconds(input);
 	}).toThrow('Bad input');
});


test('second empty must throw an Error', ()=>{
	var input = '1:';

 	expect(() => {
 		clockFormatToSeconds(input);
 	}).toThrow('Bad input');
});



test('minutes empty must throw an Error', ()=>{
	var input = ':1';

 	expect(() => {
 		clockFormatToSeconds(input);
 	}).toThrow('Bad input');
});

