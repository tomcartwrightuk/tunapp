// From PitchDetect: https://github.com/cwilso/PitchDetect/blob/master/js/pitchdetect.js
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

export default(stream) => {
  return (emitter) => {
    const audioContext = new window.AudioContext();
    const analyser = audioContext.createAnalyser();
    analyser.minDecibels = -100;
    analyser.maxDecibels = -10;
    analyser.smoothingTimeConstant = 0.85;

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
        const pitch = autoCorrelateValue;

        if (autoCorrelateValue === -1) {
          return;
        }
        // Check if this value has been within the given range for n iterations
        if (noteIsSimilarEnough(pitch, previousValueToDisplay)) {
          if (smoothingCount < SMOOTHING_COUNT_THRESHOLD) {
            smoothingCount++;
            return;
          } else {
            previousValueToDisplay = pitch;
            smoothingCount = 0;
          }
        } else {
          previousValueToDisplay = pitch;
          smoothingCount = 0;
          return;
        }

        const payload = { pitch };
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
