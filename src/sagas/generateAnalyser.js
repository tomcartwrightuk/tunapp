// Thanks to PitchDetect: https://github.com/cwilso/PitchDetect/blob/master/js/pitchdetect.js

import noteFromFrequency from '../utils/note-from-frequency';
import autoCorrelate from '../utils/auto-correlate';

const noteIsSimilarEnough = (valueToDisplay, previousValueToDisplay) => { // Check threshold for number, or just difference for notes.
  if (typeof(valueToDisplay) == 'number') {
    return Math.abs(valueToDisplay - previousValueToDisplay) < SMOOTHING_THRESHOLD;
  } else {
    return valueToDisplay === previousValueToDisplay;
  }
}

const SMOOTHING_THRESHOLD = 5;
const SMOOTHING_COUNT_THRESHOLD = 5;
const NOTE_STRINGS = [
  "C",
  "C#",
  "D",
  "D#",
  "E",
  "F",
  "F#",
  "G",
  "G#",
  "A",
  "A#",
  "B"
];
const MEDIA_CONSTANTS = {
  audio: true
};

export default(stream) => {
  return (emitter) => {
    const audioContext = new window.AudioContext();
    const analyser = audioContext.createAnalyser();
    analyser.minDecibels = -100;
    analyser.maxDecibels = -10;
    analyser.smoothingTimeConstant = 0.85;

    if (!navigator ?. mediaDevices ?. getUserMedia) {
      alert('Sorry, getUserMedia is required for the app.')
      return;
    }

    const source = audioContext.createMediaStreamSource(stream);
    source.connect(analyser);
    visualize();

    function visualize() {
      let previousValueToDisplay = 0;
      let smoothingCount = 0;

      const calculateNote = function () {
        requestAnimationFrame(calculateNote);
        const bufferLength = analyser.fftSize;
        const buffer = new Float32Array(bufferLength);
        analyser.getFloatTimeDomainData(buffer);
        const autoCorrelateValue = autoCorrelate(buffer, audioContext.sampleRate)

        // Handle rounding
        const valueToDisplay = autoCorrelateValue;

        if (autoCorrelateValue === -1) {
          // document.getElementById('note').innerText = 'Too quiet...';
          // console.log('too quiet')
          return;
        }
        // Check if this value has been within the given range for n iterations
        if (noteIsSimilarEnough(valueToDisplay, previousValueToDisplay)) {
          if (smoothingCount < SMOOTHING_COUNT_THRESHOLD) {
            smoothingCount++;
            return;
          } else {
            previousValueToDisplay = valueToDisplay;
            smoothingCount = 0;
          }
        } else {
          previousValueToDisplay = valueToDisplay;
          smoothingCount = 0;
          return;
        }

        const note = NOTE_STRINGS[noteFromFrequency(autoCorrelateValue) % 12];

        const payload = { frequency: valueToDisplay, note};
        emitter(payload)
        console.log(payload)
      }

      calculateNote();
    }

    return () => {
      stream.getTracks().forEach(track => {
        track.stop()
      });
    }
  };
}
