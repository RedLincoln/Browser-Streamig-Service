
function clockFormatToSeconds(time) {
	var value = parseInt(time);

	if (time.length >= 3 || typeof time !== 'string' || isNaN(time) || time.trim().length === 0 || value < 0){
		throw new Error('Bad input');
	}
	
	return value;
}

module.exports = clockFormatToSeconds;