import { CamelcaseToHumanPipe } from '@app/shared/pipes/camelcase-to-human.pipe';

describe('CamelcaseToHumanPipe', () => {
  it('create an instance', () => {
    const pipe = new CamelcaseToHumanPipe();
    expect(pipe).toBeTruthy();
  });
});
