import { DeviceIdToNamePipe } from '@app/cosmyna/pipes/device-id-to-name.pipe';

describe('DeviceIdToNamePipe', () => {
  it('create an instance', () => {
    const pipe = new DeviceIdToNamePipe();
    expect(pipe).toBeTruthy();
  });
});
