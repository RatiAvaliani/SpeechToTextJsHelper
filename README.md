# Google Speech To Text API JS Helper
This helper will get you up and running faster in PHP.

### Getting Started 

* You need to get recorder.js
  * CDN ->> https://cdnjs.cloudflare.com/ajax/libs/recorderjs/0.1.0/recorder.min.js
  * NPM ->> yarn add recorder-js # or npm install recorder-js --save

* Set html up.
* Input you info in the speech.js
* Copy and Paste the PHP
  * Insert you API-key 
  ```
  $client =  new SpeechClient([
    'credentials' => '../Your key (json file)'
  ]);
  ```
 * You are done.
