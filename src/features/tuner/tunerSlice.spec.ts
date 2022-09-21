import tunerReducer, {
  TunerState,
  increment,
  decrement,
  incrementByAmount,
} from './tunerSlice';

describe('tuner reducer', () => {
  const initialState: TunerState = {
    value: 3,
    status: 'idle',
  };
  it('should handle initial state', () => {
    expect(tunerReducer(undefined, { type: 'unknown' })).toEqual({
      value: 0,
      status: 'idle',
    });
  });

  it('should handle increment', () => {
    const actual = tunerReducer(initialState, increment());
    expect(actual.value).toEqual(4);
  });

  it('should handle decrement', () => {
    const actual = tunerReducer(initialState, decrement());
    expect(actual.value).toEqual(2);
  });

  it('should handle incrementByAmount', () => {
    const actual = tunerReducer(initialState, incrementByAmount(2));
    expect(actual.value).toEqual(5);
  });
});
