
function clockFormatToSeconds(time) {
	if (time.length >= 3 || typeof time !== 'string' || isNaN(time) || time.trim().length === 0){
		throw new Error('Bad input');
	}
	var value = parseInt(time);
	return value;
}

module.exports = clockFormatToSeconds;