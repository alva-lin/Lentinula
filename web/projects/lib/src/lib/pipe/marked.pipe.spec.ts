import { MarkedPipe } from './marked.pipe';

describe('MarkdownPipe', () => {
  it('create an instance', () => {
    const pipe = new MarkedPipe();
    expect(pipe).toBeTruthy();
  });
});
