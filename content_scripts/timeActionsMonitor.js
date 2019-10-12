console.log("timeActionsMonitor.js");

var timeControl = {

    initialize : function (){
        videoPlayer.ontimeupdate = this.actionControl;
        video_button.onclick = this.skipTime;
    },

    skipTime: function(){
        videoPlayer.currentTime = sessionStorage.skipTime;
    },

    actionControl: function(){
        if (timeControl.canSkipOpening()){
            timeControl.skipOpeningWithoutAsking();
        }else if(timeControl.canSkipEnding()){
            timeControl.skipEndingWithoutAsking();
        }else if (timeControl.isInOpeningSkipMessageRange() && buttonIsDisable()){
            timeControl.askForOpeningSkip();
        }else if (timeControl.isInEndingSkipMessageRange() && buttonIsDisable()){
            timeControl.askForEndingSkip();
        }else if (!timeControl.isInOpeningSkipMessageRange() && !timeControl.isInEndingSkipMessageRange()){
            hideVideoButton();
        }
    },

    skipOpeningWithoutAsking: function(){
        videoPlayer.currentTime = parseInt(sessionStorage.openingEnd);
        videoPlayer.play();
    },

    skipEndingWithoutAsking: function(){
        videoPlayer.currentTime = parseInt(sessionStorage.endingEnd);
        videoPlayer.play();   
    },

    askForOpeningSkip: function(){
        showVideoButtonWith("Skip Opening");
        sessionStorage.skipTime = sessionStorage.openingEnd;
    },

    askForEndingSkip: function(){
        showVideoButtonWith("Skip Ending");
        sessionStorage.skipTime = sessionStorage.endingEnd;
    },

    isInOpeningSkipMessageRange: function(){
        return (videoPlayer.currentTime > parseInt(sessionStorage.openingStart)) && 
               (videoPlayer.currentTime < parseInt(sessionStorage.openingStart) + MESSAGE_TIME);
    },

    isInEndingSkipMessageRange: function(){
        return (videoPlayer.currentTime > parseInt(sessionStorage.endingStart)) && 
               (videoPlayer.currentTime < parseInt(sessionStorage.endingStart) + MESSAGE_TIME);
    },

    canSkipOpening: function(){
        return toBool(sessionStorage.isSkipingOpening) &&
               (videoPlayer.currentTime > parseInt(sessionStorage.openingStart)) && 
               (videoPlayer.currentTime < parseInt(sessionStorage.openingEnd));
    },

    canSkipEnding: function(){
        return toBool(sessionStorage.isSkipingEnding) &&
               (videoPlayer.currentTime > parseInt(sessionStorage.endingStart)) && 
               (videoPlayer.currentTime < parseInt(sessionStorage.endingEnd));
    },

};

timeControl.initialize();