import { describe, it, expect } from 'vitest';
import { getEnglishEntry, formatLabel, pad } from './helpers';

describe('getEnglishEntry', () => {
  it('returns the English entry from a names array', () => {
    const names = [
      { language: { name: 'fr' }, name: 'Bonjour' },
      { language: { name: 'en' }, name: 'Hello' },
    ];
    expect(getEnglishEntry(names)?.name).toBe('Hello');
  });
});
