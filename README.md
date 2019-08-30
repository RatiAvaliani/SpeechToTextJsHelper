# Google Speech To Text API JS Helper
This helper will get you up and running faster in PHP.

### Getting Started 

* You need to get recorder.js
  * CDN ->> https://cdnjs.cloudflare.com/ajax/libs/recorderjs/0.1.0/recorder.min.js
  * NPM ->> yarn add recorder-js # or npm install recorder-js --save

* Set html up (example)
 ```
 <input type="text" class="example" name="example" id="example" value="">
 <img class="google_mic_button" src="google_mic.png">
 
   <div class="modal" id="example" tabindex="-1" role="dialog">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title text-center"></button>
        </div>
        <div class="modal-body">
          <p></p>
        </div>
        <div class="modal-footer"> 
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  </div>
 ```
 
* Input you info in the speech.js
 * you can change Sample Rate Hertz in speech.js(:123), speech-to-text-google-api.php(:12)
 * input your info 
 ```
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
		"noInput" : "Please try again.",
		"noMic" : "The microphone is not enabled."
	}
 ```
* Copy and Paste the PHP
  * Insert you API-key 
  ```
  $client =  new SpeechClient([
    'credentials' => '../Your key (example.json)'
  ]);
  ```
 * You are done.
