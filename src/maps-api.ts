import axios from 'axios';
import { FuzzySearchParams, FuzzySearchResponse, Result } from './types';

// https://developer.tomtom.com/search-api/documentation/search-service/fuzzy-search
export async function getPlaceAutocomplete(key: string, address: string) {
  const params: FuzzySearchParams = {
    key,
    limit: 100,
    countrySet: 'AU', // only search Australia
  };
  const autocomplete = await axios.get<FuzzySearchResponse>(
    `https://api.tomtom.com/search/2/search/${address}.json'`,
    {
      params,
    }
  );

  return autocomplete.data.results.map(({ id, address }: Result) => {
    return {
      placeId: id,
      streetName: address.streetName,
      streetNumber: address.streetNumber,
      municipality: address.municipality,
      country: address.country,
      countryCode: address.countryCode,
      freeformAddress: address.freeformAddress,
    };
  });
}
