import { describe } from '@jest/globals';
import { config } from 'dotenv';
import { getAutoCompleteDetails } from '../src';
import { getPlaceAutocomplete } from '../src/maps-api';

config();

// These are end-to-end tests and need an api key
describe('Tomtom Places E2E Tests', () => {
  describe('getAutoCompleteDetails', () => {
    it('returns a promise', () => {
      const res = getAutoCompleteDetails('Charlotte Street');
      expect(res).toBeInstanceOf(Promise);
    });

    it('can fetch from the autocomplete api', async () => {
      const res = await getAutoCompleteDetails('Charlotte Street');
      const firstRes = res[0];
      expect(firstRes).toHaveProperty('placeId');
      expect(firstRes).toHaveProperty('streetNumber');
      expect(firstRes).toHaveProperty('countryCode');
      expect(firstRes).toHaveProperty('country');
      expect(firstRes).toHaveProperty('freeformAddress');
      expect(firstRes).toHaveProperty('municipality');
    });

    it('only returns Australian addresses', async () => {
      const res = await getAutoCompleteDetails('Charlotte Street');
      res.forEach((result) => {
        expect(result.country).toBe('Australia');
      });
    });

    it('throws an error if the API key is not provided', async () => {
      const originalApiKey = process.env.TOMTOM_API_KEY;
      delete process.env.TOMTOM_API_KEY;

      await expect(getAutoCompleteDetails('Charlotte Street')).rejects.toThrow(
        'TOMTOM_API_KEY is not defined.'
      );

      process.env.TOMTOM_API_KEY = originalApiKey;
    });
  });

  describe('getPlaceAutocomplete', () => {
    it('handles no results', async () => {
      const res = await getPlaceAutocomplete(
        process.env.TOMTOM_API_KEY as string,
        'asfasffasfasafsafs'
      );
      expect(res).toStrictEqual([]);
    });

    it('handles error', async () => {
      expect(
        getPlaceAutocomplete(process.env.TOMTOM_API_KEY as string, '')
      ).rejects.toThrow();
    });

    it('successfully retrieves autocomplete results for a valid address', async () => {
      const res = await getPlaceAutocomplete(
        process.env.TOMTOM_API_KEY as string,
        'Charlotte'
      );

      expect(res.length).toBeGreaterThan(0);
      res.forEach((result) => {
        expect(result).toHaveProperty('placeId');
        expect(result).toHaveProperty('streetName');
        expect(result).toHaveProperty('streetNumber');
        expect(result).toHaveProperty('municipality');
        expect(result).toHaveProperty('country');
        expect(result).toHaveProperty('countryCode');
        expect(result).toHaveProperty('freeformAddress');
      });

      expect(res).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ streetName: 'Charlotte Street' }),
        ])
      );
    });
  });
});
