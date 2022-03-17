import { AddSpacePipe } from '@app/shared/pipes/add-space.pipe';

describe('AddSpacePipe', () => {
  it('create an instance', () => {
    const pipe = new AddSpacePipe();
    expect(pipe).toBeTruthy();
  });
});
