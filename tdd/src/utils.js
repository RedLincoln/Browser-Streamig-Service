
function clockFormatToSeconds(time) {
	if (time.length >= 3 || typeof time !== 'string'){
		throw new Error('Bad input');
	}
	var value = parseInt(time);
	return value;
}

module.exports = clockFormatToSeconds;