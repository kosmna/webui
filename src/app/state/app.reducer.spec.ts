import { applicationReducer, appInitialState } from './app.reducer';

describe('App Reducer', () => {
  describe('unknown action', () => {
    it('should return the initial state', () => {
      const action = {} as any;

      const result = applicationReducer(appInitialState, action);

      expect(result).toBe(appInitialState);
    });
  });
});
