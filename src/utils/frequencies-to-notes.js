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
    "D", -7
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
    "G", -2
  ],
  [
    "Ab", -1
  ],
  [
    "A", 0
  ],
  [
    "Bb", 1
  ],
  [
    "B", 2
  ],
];

export default() => 
octaveRange
  .reduce(
    (arr, [range, multiplier]) => semitoneOffsets
      .reduce((ob, [note, semitones]) => (
        arr.concat([
          {
            note: note + range,
            frequency: (A * Math.pow(2, (semitones + (multiplier * 12)) / 12)).toFixed(2)
          }  
        ]))
      , ob),
    []);

result.map((entry, i) => {
  const previousNote = result[i-1];
  const nextNote = result[i+1];
  console.log(i)
  if (i === 0) {
    const upperBound = (previousNote.frequency + entry.frequency) / 2
    return {
      entry, upperBound, lowerBound: 5.00
    }
  }
  if (i === result.length-1) {
    const lowerBound = (nextNote.frequency + entry.frequency) / 2
    return {
      entry, upperBound: 5000.00, lowerBound
    }
  }

  const lowerBound = (nextNote.frequency + entry.frequency) / 2
  const upperBound = (previousNote.frequency + entry.frequency) / 2
  return { ...entry, upperBound, lowerBound }
})
