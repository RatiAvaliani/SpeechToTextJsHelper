<?php
use Google\Cloud\TextToSpeech\V1\AudioConfig;
use Google\Cloud\Speech\V1\SpeechClient;
use Google\Cloud\Speech\V1\RecognitionAudio;
use Google\Cloud\Speech\V1\RecognitionConfig;
use Google\Cloud\Speech\V1\RecognitionConfig\AudioEncoding;

function googleSpeechToText () {
    /***************************************************************************
     * POST 'google'
     *
     * google text to speech api call
     **************************************************************************/ 

    $sampleRateHertz = 16000;
    $languageCode = 'en-US'; 
    $textToSpeech = true; 

    try { 
        if (!$textToSpeech) {
            return json_encode(array('status' => 0));
        }

        $audioFile = file_get_contents($_FILES['audio_data']['tmp_name']);
        
        $audio = (new RecognitionAudio())->setContent($audioFile); 
        $config = (new RecognitionConfig())->setEncoding(AudioEncoding::LINEAR16)->setSampleRateHertz($sampleRateHertz)->setLanguageCode($languageCode);  
        $client =  new SpeechClient([
            'credentials' => '../google_speech_to_text_key.json'
        ]);
        
        $response = $client->recognize($config, $audio);

        foreach ($response->getResults() as $result) {
            $alternatives = $result->getAlternatives();
            $mostLikely = $alternatives[0];
            $transcript = $mostLikely->getTranscript(); 
        }

        $client->close();

        if (!isset($transcript)) {
            return json_encode(array('status' => 3, 'name' => $_POST['name']));
        }
        
        return json_encode(array('Transcript' => $transcript, 'status' => 1, 'name' => $_POST['name']));
    } catch (PDOException $e) {
        return json_encode(array('status' => 3));
    }  
};
