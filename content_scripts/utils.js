console.log("utils.js");

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function isValidStartEndTime(opening, ending) {
	if (isNaN(opening)) opening = timeFormatToSeconds(opening);
	if (isNaN(ending)) ending = timeFormatToSeconds(ending);
	return opening !== null && ending !==  null && ending > opening;
}


function isValidTimeFormat(time){
	var segments = time.split(":");
	if (segments.length > 3) return false;
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
	var ratio = [24*60, 60, 1];
	var i;
	for (i = 0; i < segments.length; i++){
		result += parseInt(segments[i])*ratio[i];
	}

	return ratio;
}

function toBool(string){
    return (string == "true");
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
