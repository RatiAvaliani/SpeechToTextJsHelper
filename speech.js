var speech = {
	tags : {
		"textToSpeechButton" : "Button for the text to speech (#example)",
		"modal" : "Bootstap modal for meassages (#example)",
		"textToSpeechId" : "Input Id from html (#example)",
		"neMes" : "Bootstap modal for error meassages (#example)",
		"error" : "Bootstap modal meassage (#example)"
	},
	urls: {
		"activeMic" : "Listening Icon (example.com/img.png)",
		"disabledMic" : "Not Listening Icon (example.com/img.png)",
		"loadGif" : "Loading Gif (example.com/img.png)",
		"googleApi" : "Url for google Api (example.com/img.png)"
	},
	mess : {
		"sorry_we_didnt_hear_you" : "Sorry we didn't hear you :( please try again.",
		"the_microphone_is_not_enabled" : "The microphone is not enabled please enable it, if you want to use the function."
	},
	_this : null,
	getTextToSpeechId : function () {
		return $(this.tags.textToSpeechId).val();
	},
	checkTextToSpeech : function () {
		$(this.tags.textToSpeechButton).on('click', function () {

			speech.setGetButton($(this)); 
			if (speech.getTextToSpeechId() == 0) {
				speech.showModule(); 			
			} else { 
				navigator.mediaDevices.getUserMedia({ audio: true })
				.then(function(stream) {
				  	speech.Status.toggle();
					speech.Mic.set();
				})
				.catch(function(err) {
				  	speech.setModelText(speech.mess.the_microphone_is_not_enabled);
				  	$(speech.tags.neMes).modal('show');
				});
			}
		}); 
	},
	setModelText : function (val) {
		$(speech.tags.error).text(val);
	},
	showModule : function (status) {  
		if (status != undefined && status == 3) { 
			speech.setModelText(speech.mess.sorry_we_didnt_hear_you);
			$(this.tags.neMes).modal('show');
			return;
		}

		$(this.tags.modal).modal('show');
	},
	setGetButton : function (_this) {
		if (speech.Input.name == null)
			speech._this = _this;
		else
			speech._this = speech.Input.get().parent().find(speech.tags.textToSpeechButton); 

		return speech._this; 
	},
	Input: { // or textarea
		input : null,
		name : null,
		get : function () {
			if (speech.Input.name != null) {
				speech.Input.input = $("[name='"+speech.Input.name+"']");
				return speech.Input.input;
			}

			let input = speech._this.parent().find('input[type="text"]');
			let textarea = speech._this.parent().find('textarea');

			if (input.html() == "")  {
				speech.Input.input = input;
			} else {
				speech.Input.input = textarea;
			}
		},
		changeVal : function (val) { 
			speech.Input.get().val(val).keyup();
			speech.Input.name = null;
		}
	},
	Status : {
		check : function () {
			let status = speech._this.data('speech');

			if (status == 'active')
				return true;
			else 
				return false;
		},
		toggle : function () {
			if (speech.Status.check()) {
				speech.Status.disable();
				speech.Mic.stop();
			} else {
				speech.Status.activate();
				speech.Mic.start();
			}
		},
		disable : function () {
			speech._this.attr('src', speech.urls.loadGif).data('speech', 'disabled');
			return true;
		},
		activate : function () {
			speech._this.attr('src', speech.urls.activeMic).data('speech', 'active');
			return true;
		},
	}, 
	Mic: {
		gumStream: null,
		rec: null,
		input : null,
		audioContext : null,
		status : null,
		set : function () { 
			URL = window.URL || window.webkitURL;  
			var AudioContext = window.AudioContext || window.webkitAudioContext;
			speech.Mic.audioContext = new AudioContext({
  				latencyHint: 'interactive',
  				sampleRate: 16000,
			});   
		},
		start : function () {
			var constraints = {
			    audio: true,
			    video: false
			};

			navigator.mediaDevices.getUserMedia(constraints).then(function(stream) {  
			    speech.Mic.gumStream = stream; 
			    speech.Mic.input = speech.Mic.audioContext.createMediaStreamSource(stream); 
			    speech.Mic.rec = new Recorder(speech.Mic.input, {
			        numChannels: 1
			    });
			    speech.Mic.rec.record(); 
			})
		},
		stop : function () {
    		speech.Mic.rec.stop(); 
    		speech.Mic.gumStream.getAudioTracks()[0].stop();  
    		speech.Mic.rec.exportWAV(speech.Mic.send);
		},
		send: function (blob) {  
			let xhr = new XMLHttpRequest(); 
		   	
		  	xhr.onreadystatechange = function() {
    			if (xhr.readyState == XMLHttpRequest.DONE) {

        			let Transcript = JSON.parse(xhr.responseText);

        			if (Transcript.status == 0) {
        				speech.showModule();
        			} else if (Transcript.status == 3) {
        				speech.showModule(Transcript.status);
        			}

 					speech.Input.name = Transcript.name; 
 					speech.setGetButton();
        			speech.Input.changeVal(Transcript.Transcript);
        			speech._this.attr('src', speech.urls.disabledMic).data('speech', 'disabled'); 
    			}
			}

		  	var fd = new FormData();
		  	fd.append("audio_data", blob, 'audioFile');
		  	speech.Input.get(); 
		  	fd.append("name", speech.Input.input.attr('name'));
		  	
		  	xhr.open("POST",speech.urls.googleApi,true);
		  	xhr.send(fd);
		}
	},
	autoLoad : function () {
		this.checkTextToSpeech();
	}
};
$( document ).ready(function() {
	speech.autoLoad();
});