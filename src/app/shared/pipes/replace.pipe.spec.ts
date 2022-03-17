import { ReplacePipe } from '@app/shared/pipes/replace.pipe';

describe('ReplacePipe', () => {
  let pipe: ReplacePipe;
  beforeEach(() => {
    pipe = new ReplacePipe();

  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('expect 0 to be transform to a dash', () => {
    expect(pipe.transform(0, 0, '-')).toBe('-');
  });

});
