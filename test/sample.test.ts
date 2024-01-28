import { generateMessage } from "@/components/test";

describe('generateMessage', () => {
  it('should return 「Hello, World!」', () => {
    const actual = generateMessage('World');
    expect(actual).toBe('Hello, World!');
  });
  it('should throw an error if text is empty', () => {
    expect(() => generateMessage('')).toThrowError('text is invalid');
  });
  it('should throw an error if text includes NG', () => {
    expect(() => generateMessage('NG')).toThrowError('text is invalid');
  });
});