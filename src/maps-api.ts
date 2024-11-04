import axios from 'axios';

import {
  AutocompleteResult,
  FuzzySearchParams,
  FuzzySearchResponse,
  PartialResult,
} from './types';

// https://developer.tomtom.com/search-api/documentation/search-service/fuzzy-search
export async function getPlaceAutocomplete(
  key: string,
  address: string
): Promise<AutocompleteResult[]> {
  const params: FuzzySearchParams = {
    key,
    limit: 100,
    countrySet: 'AU', // only search Australia
  };

  const autocomplete = await axios.get<FuzzySearchResponse>(
    `https://api.tomtom.com/search/2/search/${address}.json`,
    { params }
  );

  return autocomplete.data.results.map(
    ({ id, address }: PartialResult): AutocompleteResult => ({
      placeId: id,
      streetName: address.streetName,
      streetNumber: address.streetNumber,
      municipality: address.municipality,
      country: address.country,
      countryCode: address.countryCode,
      freeformAddress: address.freeformAddress,
    })
  );
}
