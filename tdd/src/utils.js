
function clockFormatToSeconds(time) {
	if (time.length >= 3){
		throw new Error('Bad input');
	}
	var value = parseInt(time);
	return value;
}

module.exports = clockFormatToSeconds;