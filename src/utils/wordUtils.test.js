import test from 'node:test';
import assert from 'node:assert';
import { categorizeWords } from './wordUtils.js';

test('categorizeWords basic categorization', (t) => {
  const words = ['apple', 'banana', 'apricot', 'blueberry', 'cherry'];
  const expected = {
    a: ['apple', 'apricot'],
    b: ['banana', 'blueberry'],
    c: ['cherry']
  };
  const result = categorizeWords(words);
  assert.deepStrictEqual(result, expected);
});

test('categorizeWords empty array', (t) => {
  const words = [];
  const expected = {};
  const result = categorizeWords(words);
  assert.deepStrictEqual(result, expected);
});

test('categorizeWords null/undefined input', (t) => {
  assert.deepStrictEqual(categorizeWords(null), {});
  assert.deepStrictEqual(categorizeWords(undefined), {});
});

test('categorizeWords single word', (t) => {
  const words = ['apple'];
  const expected = { a: ['apple'] };
  const result = categorizeWords(words);
  assert.deepStrictEqual(result, expected);
});
