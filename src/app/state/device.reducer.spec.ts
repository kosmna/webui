import { deviceReducer, deviceInitialState } from './device.reducer';

describe('Device Reducer', () => {
  describe('unknown action', () => {
    it('should return the initial state', () => {
      const action = {} as any;

      const result = deviceReducer(deviceInitialState, action);

      expect(result).toBe(deviceInitialState);
    });
  });
});
