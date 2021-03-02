import { UriEncodedPipe } from './uri-encoded.pipe';

describe('UriEncodedPipe', () => {
  it('create an instance', () => {
    const pipe = new UriEncodedPipe();
    expect(pipe).toBeTruthy();
  });
});
