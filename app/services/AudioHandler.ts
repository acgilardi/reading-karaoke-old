import {ControlsHandler} from './ControlsHandler'

export function AudioHandler() {

    var sampleURL = "../dev/app/assets/music/TinwkleTwinkleSimpleBells.mp3";
    var volSens = 1;
    var beatHoldTime = 20;
    var beatDecayRate = 0.97;


    var waveData = []; //waveform - from 0 - 1 . no sound is 0.5. Array [binCount]
    var levelsData = []; //levels of each frequecy - from 0 - 1 . no sound is 0. Array [levelsCount]
    var level = 0; // averaged normalized level from 0 - 1
    var bpmTime = 0; // bpmTime ranges from 0 to 1. 0 = on beat. Based on tap bpm
    var ratedBPMTime = 550;//time between beats (msec) multiplied by BPMRate
    var levelHistory = []; //last 256 ave norm levels
    var bpmStart;

    var sampleAudioURL = "../res/mp3/Cissy_Strut_Edit.mp3";
    var BEAT_HOLD_TIME = 40; //num of frames to hold a beat
    var BEAT_DECAY_RATE = 0.98;
    var BEAT_MIN = 0.15; //a volume less than this is no beat

    //BPM STUFF
    var count = 0;
    var msecsFirst = 0;
    var msecsPrevious = 0;
    var msecsAvg = 633; //time between beats (msec)

    var timer;
    var gotBeat = false;
    var beatCutOff = 0;
    var beatTime = 0;

    var debugCtx;
    var debugW = 330;
    var debugH = 250;
    var chartW = 300;
    var chartH = 250;
    var aveBarWidth = 30;
    var debugSpacing = 2;
    var gradient;

    var freqByteData; //bars - bar data is from 0 - 256 in 512 bins. no sound is 0;
    var timeByteData; //waveform - waveform data is from 0-256 for 512 bins. no sound is 128.
    var levelsCount = 16; //should be factor of 512

    var binCount; //512
    var levelBins;

    var isPlayingAudio = false;

    var source;
    var buffer;
    var audioBuffer;
    var dropArea;
    var audioContext;
    var analyser;
    var myScriptProcessor;

    function init() {

        //EVENT HANDLERS
        //window.addEventListener('update', update, false);
        //events.on("update", update);

        audioContext = new AudioContext();
        //audioContext = new window.webkitAudioContext();

        analyser = audioContext.createAnalyser();
        analyser.smoothingTimeConstant = 0.8; //0<->1. 0 is no time smoothing
        analyser.fftSize = 1024;
        analyser.connect(audioContext.destination);
        binCount = analyser.frequencyBinCount; // = 512
        levelBins = Math.floor(binCount / levelsCount); //number of bins in each level


        myScriptProcessor = audioContext.createScriptProcessor(1024, 1, 1);
        console.log(myScriptProcessor.bufferSize);
        myScriptProcessor.onaudioprocess = audioProcess;

        freqByteData = new Uint8Array(binCount);
        timeByteData = new Uint8Array(binCount);

        var length = 256;
        for (var i = 0; i < length; i++) {
            levelHistory.push(0);
        }

        loadSampleAudio();
    }

    function initSound() {
        source = audioContext.createBufferSource();
        source.connect(analyser);
    }

    //load sample MP3
    function loadSampleAudio() {

        stopSound();

        initSound();


        // Load asynchronously
        var request = new XMLHttpRequest();
        request.open("GET", sampleURL, true);
        request.responseType = "arraybuffer";

        request.onload = function () {


            audioContext.decodeAudioData(request.response, function (buffer) {
                audioBuffer = buffer;
                startSound();
            }, function (e) {
                console.log(e);
            });


        };
        request.send();
    }

    function onTogglePlay() {

        //if (ControlsHandler.audioParams.play){
        startSound();
        //}else{
        //    stopSound();
        // }
    }

    function startSound() {
        source.buffer = audioBuffer;
        source.loop = true;
        source.start(0.0);

        source.connect(myScriptProcessor);
        myScriptProcessor.connect(audioContext.destination);

        isPlayingAudio = true;
        //startViz();

        //function draw() {
        //    var bufferLength = analyser.frequencyBinCount;
        //    var dataArray = new Uint8Array(bufferLength);
        //    analyser.getByteTimeDomainData(dataArray);
        //    console.log(dataArray);
        //}
        //
        //draw();
    }

    function stopSound() {
        isPlayingAudio = false;
        if (source) {
            source.disconnect(myScriptProcessor);
            myScriptProcessor.disconnect(audioContext.destination);

            source.stop(0);
            source.disconnect();
        }
        //debugCtx.clearRect(0, 0, debugW, debugH);
    }

    function audioProcess(audioProcessingEvent) {

        // The input buffer is the song we loaded earlier
        var inputBuffer = audioProcessingEvent.inputBuffer;
        //console.log('frame process');

        // The output buffer contains the samples that will be modified and played
        var outputBuffer = audioProcessingEvent.outputBuffer;

        update();

        //// Loop through the output channels (in this case there is only one)
        //for (var channel = 0; channel < outputBuffer.numberOfChannels; channel++) {
        //    var inputData = inputBuffer.getChannelData(channel);
        //    var outputData = outputBuffer.getChannelData(channel);
        //
        //    // Loop through the 4096 samples
        //    for (var sample = 0; sample < inputBuffer.length; sample++) {
        //        // make output equal to the same as the input
        //        outputData[sample] = inputData[sample];
        //
        //        // add noise to each output sample
        //        outputData[sample] += ((Math.random() * 2) - 1) * 0.2;
        //    }
        //}
    }

    function onBeat() {
        console.log('beat');
    }

    //called every frame
    //update published viz data
    function update() {

        if (!isPlayingAudio) return;

        //GET DATA
        analyser.getByteFrequencyData(freqByteData); //<-- bar chart
        analyser.getByteTimeDomainData(timeByteData); // <-- waveform

        //console.log(freqByteData);

        //normalize waveform data
        for (var i = 0; i < binCount; i++) {
            waveData[i] = ((timeByteData[i] - 128) / 128 ) * 1;
        }
        //TODO - cap levels at 1 and -1 ?

        //normalize levelsData from freqByteData
        for (var i = 0; i < levelsCount; i++) {
            var sum = 0;
            for (var j = 0; j < levelBins; j++) {
                sum += freqByteData[(i * levelBins) + j];
            }
            levelsData[i] = sum / levelBins / 256 * 1; //freqData maxs at 256

            //adjust for the fact that lower levels are percieved more quietly
            //make lower levels smaller
            //levelsData[i] *=  1 + (i/levelsCount)/2;
        }
        //TODO - cap levels at 1?

        //GET AVG LEVEL
        var sum = 0;
        for (var j = 0; j < levelsCount; j++) {
            sum += levelsData[j];
        }

        level = sum / levelsCount;

        levelHistory.push(level);
        levelHistory.shift();

        //BEAT DETECTION
        if (level > beatCutOff && level > BEAT_MIN) {
            onBeat();
            beatCutOff = level * 1.1;
            beatTime = 0;
        } else {
            if (beatTime <= beatHoldTime) {
                beatTime++;
            } else {
                beatCutOff *= beatDecayRate;
                beatCutOff = Math.max(beatCutOff, BEAT_MIN);
            }
        }

        bpmTime = (new Date().getTime() - bpmStart) / msecsAvg;
    }

    return {
        update: update,
        init: init,
        level: level,
        levelsData: levelsData,
        onTogglePlay: onTogglePlay,
        stopSound: stopSound
    };

}