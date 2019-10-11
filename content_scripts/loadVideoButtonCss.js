var videoDiv = document.getElementById("video1");

var video_button_div = document.createElement("div");
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

var btn = document.createElement("button");
btn.style.display = "none";
btn.id = "video_button";
btn.style.backgroundColor ="transparent";
btn.style.color = "white";
btn.style.fontFamily ="Arial, Helvetica, sans-serif";
btn.style.fontWeight= "bold";
btn.style.border ="none";
btn.style.textAlign ="center";
btn.style.width= "100%";
btn.style.height ="100%";  

video_button_div.appendChild(btn);
videoDiv.appendChild(video_button_div);

video_button_div.onmouseover = function(){
	this.style.border = "3px solid white";
};

video_button_div.onmouseout = function(){
	this.style.border = "none";
};