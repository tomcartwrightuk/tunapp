// As you can tell by the use of all functions™, this snippet comes from
// smallhadroncollider
// https://gist.github.com/smallhadroncollider/22b01340c88b0c6f7794617b72e7ada4

const A = 440;

const range = (start, stop) => Array(stop - start + 1).fill().map((_, i) => start + i);

const octaveRange = range(0, 8).map(val => [
  val,
  val - 4
]);

const semitoneOffsets = [
  [
    "C", -9
  ],
  [
    "C#", -8
  ],
  [
    "Db", -8
  ],
  [
    "D", -7
  ],
  [
    "D#", -6
  ],
  [
    "Eb", -6
  ],
  [
    "E", -5
  ],
  [
    "F", -4
  ],
  [
    "F#", -3
  ],
  [
    "Gb", -3
  ],
  [
    "G", -2
  ],
  [
    "G#", -1
  ],
  [
    "Ab", -1
  ],
  [
    "A", 0
  ],
  [
    "A#", 1
  ],
  [
    "Bb", 1
  ],
  [
    "B", 2
  ],
];

export default() => (octaveRange.reduce((ob, [range, multiplier]) => semitoneOffsets.reduce((ob, [note, semitones]) => ({
  ...ob,
  [note + range]: A * Math.pow(2, (semitones + (multiplier * 12)) / 12)
}), ob), {}));
