console.log('loading utils.js')

function ErrorIfstartIsNotLowerThanEnd(start, end){
	if (typeof start !== 'number' || typeof end !== 'number' || end <= start){
		throwBadInput();
	}
}

function ErrorIfTimeIsNotInVideoRange(time){
	if (typeof time !== 'number' || time < 0 || time > videoPlayer.duration) {
		throwBadInput();
	}
}

function digitalClockToSeconds(time) {
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
		value += fields[i] * ratios[i+baseIndex];
	}
	return value;
}

function throwBadInput(){
	console.error('Bad input expected([minutes:]seconds)');
	throw new Error('Bad input expected([minutes:]seconds)');
}

function isValidField(field){
	field = field.trim();
	var value  =  parseInt(field);
	var isString = typeof field === 'string';
	var inRange = value >= 0 && value <= 59;
	var inMaxLength = field.length < 3
	var emptyField = field.length === 0;

	return ( inMaxLength && isString && !isNaN(field) && !emptyField && inRange );
}


function toBool(input){
	if (typeof input === 'string') return input === 'true';
	if (typeof input === 'boolean') return input;
	return false;
}

/*
module.exports.digitalClockToSeconds = digitalClockToSeconds;
module.exports.toBool = toBool;
module.exports.ErrorIfstartIsNotLowerThanEnd = ErrorIfstartIsNotLowerThanEnd;
*/