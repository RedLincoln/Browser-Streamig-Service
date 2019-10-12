
function clockFormatToSeconds(time) {
	var value = parseInt(time);

	var isString = typeof time === 'string';
	var inRange = value >= 0 && value <= 60;
	var inMaxLength = time.length < 3
	
	if ( !inMaxLength || !isString || isNaN(time) || time.trim().length === 0 || !inRange ){
		throw new Error('Bad input');
	}
	
	return value;
}

module.exports = clockFormatToSeconds;