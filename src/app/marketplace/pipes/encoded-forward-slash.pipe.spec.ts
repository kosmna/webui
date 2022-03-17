import { EncodedForwardSlashPipe } from '@app/marketplace/pipes/encoded-forward-slash.pipe';

describe('EncodedForwardSlashPipe', () => {
  let pipe: EncodedForwardSlashPipe;
  beforeEach(() => {
    pipe = new EncodedForwardSlashPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return null', () => {
    const output = pipe.transform(null);
    expect(output).toEqual(null);
  });

  it('should replace %2F with slash', () => {
    const output = pipe.transform('%2F');
    expect(output).toEqual('/');
  });
});
