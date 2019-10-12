
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function buttonIsDisable(){
    return video_button_div.style.display == "none";
}

function inVideoRange(value){
	return value >= 0 && value <= videoPlayer.duration;
}

function isValidStartEndTime(start, end) {
	if (isNaN(start)) start = timeFormatToSeconds(start);
	if (isNaN(end)) end = timeFormatToSeconds(end);
	return start !== null && end !==  null && end > start &&
		   inVideoRange(start) && inVideoRange(end);
}


function isValidTimeFormat(time){
	var segments = time.split(":");
	if (segments.length > 2) return false;
	segments.forEach ( segment => {
		if (isNaN(segment)) return false;
	});
	return true;
}

function timeFormatToSeconds (time) {
	if (!isValidTimeFormat(time)){
		console.error("Error: Invalid Time Format (" + time + ") expecting hh:mm:ss as Integers");
		return null;
	}
	var segments = time.split(":");
	
	var result = 0;
	var ratio = [60, 1];
	var baseIndex = ratio.length - segments.length;
	var i;
	for (i = 0; i < segments.length; i++){
		var ratioIndex = baseIndex + i;
		result += parseInt(segments[i])*ratio[ratioIndex];
	}
	
	return result;
}

function toBool(string){
	if (typeof string === 'boolean') return string
	if (typeof string === 'string') return string == "true"
    return false;
}

function showVideoButtonWith(message){
    video_button.innerHTML = message;
    video_button.style.display = "block";
    video_button_div.style.display = "block";
}

function hideVideoButton(){
    video_button.style.display = "none";
    video_button_div.style.display = "none";
}
