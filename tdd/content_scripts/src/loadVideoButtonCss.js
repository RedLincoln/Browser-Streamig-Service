
video_button_div.id = "video_button_div";
video_button_div.style.display = "none";
video_button_div.style.position  = "absolute";
video_button_div.style.bottom = "15%";
video_button_div.style.right = "1%";
video_button_div.style.width = "40%";
video_button_div.style.backgroundColor = "#696969";
video_button_div.style.opacity = "0.6";
video_button_div.style.zIndex = 1;
video_button_div.style.height = "30px";
video_button_div.style.border = "none";


video_button.style.display = "none";
video_button.id = "video_button";
video_button.style.backgroundColor ="transparent";
video_button.style.color = "white";
video_button.style.fontFamily ="Arial, Helvetica, sans-serif";
video_button.style.fontWeight= "bold";
video_button.style.border ="none";
video_button.style.textAlign ="center";
video_button.style.width= "100%";
video_button.style.height ="100%";  

video_button_div.appendChild(video_button);
videoDiv.appendChild(video_button_div);

video_button_div.onmouseover = function(){
	this.style.border = "3px solid white";
};

video_button_div.onmouseout = function(){
	this.style.border = "none";
};