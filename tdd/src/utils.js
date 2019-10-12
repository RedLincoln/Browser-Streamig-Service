
function clockFormatToSeconds(time) {
	if (typeof time !== 'string') throwBadInput();
	var fields = time.split(":");
	if (fields.length > 2) throwBadInput();

	fields.forEach (field => {
		if ( !isValidField(field))
			throwBadInput();
	});
	
	var ratios = [60, 1];
	var baseIndex = ratios.length - fields.length;	
	var i;
	var value = 0;
	for (i = 0; i < fields.length ; i++){
		value += parseInt(fields[i] * ratios[i+baseIndex]);
	}
	return value;
}

function throwBadInput(){
	throw new Error('Bad input');
}

function isValidField(field){
	var value = parseInt(field);
	var isString = typeof field === 'string';
	var inRange = value >= 0 && value <= 60;
	var inMaxLength = field.length < 3
	var emptyField = field.trim().length === 0;

	return ( inMaxLength && isString && !isNaN(field) && !emptyField && inRange );
}

module.exports = clockFormatToSeconds;