
var messageControl = {

    initialize: function(){
        browser.runtime.onMessage.addListener(this.onMessageListener);
    },   
    
    onMessageListener: function(message, sender, sendResponse) {
        if (messageControl.isSync(message.data.command)){
            var data = messageControl.extractSyncPropertiesFrom(sessionStorage);
            sendResponse(data);    
        }else if(messageControl.isStreaming(message.data.command)){
            messageControl.changeStreaming();
        }else if(messageControl.isSkipingOpening(message.data.command)){
            messageControl.changeSkipOpening(message.data);
        }else if (messageControl.isSkipingEnding(message.data.command)){
            messageControl.changeSkipEnding(message.data);
        }
    },

    changeStreaming: function(){
        sessionStorage.isStreaming = !toBool(sessionStorage.isStreaming);
    },

    changeSkipOpening: function(data){
        sessionStorage.isSkipingOpening = toBool(data.isSkipingOpening);
        if (toBool(sessionStorage.isSkipingOpening)){
            sessionStorage.openingStart = timeFormatToSeconds(data.openingStart);
            sessionStorage.openingEnd = timeFormatToSeconds(data.openingEnd);
        }
    },

    changeSkipEnding: function(data){
        sessionStorage.isSkipingEnding = !toBool(sessionStorage.isSkipingEnding);
        if (toBool(sessionStorage.isSkipingEnding)){
            sessionStorage.endingStart = timeFormatToSeconds(data.endingStart);
            sessionStorage.endingEnd = videoPlayer.duration;
        }
    },

    extractSyncPropertiesFrom: function(source){
        var result = {};
        var i;
        for (i = 0; i < syncPorperties.length; i++){
            result[syncPorperties[i]] = source[syncPorperties[i]];
        }
        return result;
    },

    isSync: function(command){
        return command === SYNC;
    },

    isStreaming: function(command){
        return command === STREAMING;
    },

    isSkipingOpening: function(command){
        return command === OPENING;
    },

    isSkipingEnding: function(command){
        return command === ENDING;
    },
};

messageControl.initialize();