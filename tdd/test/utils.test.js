var clockFormatToSeconds = require('../src/utils.js');

test('seconds units must be well calculated', () => {
 	var oneSecond = "1";

 	var result = clockFormatToSeconds(oneSecond);

 	expect(result).toBe(1);
});


test('seconds tens must be well calculated', () => {
 	var oneSecond = "10";

 	var result = clockFormatToSeconds(oneSecond);

 	expect(result).toBe(10);
});


test('seconds hundreds or more most couse an Error', () => {
 	var oneSecond = "100";

 	expect(() => {
 		clockFormatToSeconds(oneSecond);
 	}).toThrow('Bad input');
});

