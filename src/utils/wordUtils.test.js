import { categorizeWords } from './wordUtils.js';

describe('categorizeWords', () => {
  it('basic categorization', () => {
    const words = ['apple', 'banana', 'apricot', 'blueberry', 'cherry'];
    const expected = {
      a: ['apple', 'apricot'],
      b: ['banana', 'blueberry'],
      c: ['cherry']
    };
    const result = categorizeWords(words);
    expect(result).toEqual(expected);
  });

  it('empty array', () => {
    const words = [];
    const expected = {};
    const result = categorizeWords(words);
    expect(result).toEqual(expected);
  });

  it('null/undefined input', () => {
    expect(categorizeWords(null)).toEqual({});
    expect(categorizeWords(undefined)).toEqual({});
  });

  it('single word', () => {
    const words = ['apple'];
    const expected = { a: ['apple'] };
    const result = categorizeWords(words);
    expect(result).toEqual(expected);
  });
});
