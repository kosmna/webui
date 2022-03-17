import { UnitFormatPipe } from '@app/shared/pipes/unit-format.pipe';

describe('UnitFormatPipe', () => {
  it('create an instance', () => {
    const pipe = new UnitFormatPipe();
    expect(pipe).toBeTruthy();
  });
});
