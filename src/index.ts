import { getPlaceAutocomplete } from './maps-api';
import { AutocompleteResult } from './types';

export async function getAutoCompleteDetails(
  address: string
): Promise<AutocompleteResult[]> {
  const apiKey = process.env.TOMTOM_API_KEY;
  if (!apiKey) {
    throw new Error('TOMTOM_API_KEY is not defined.');
  }

  try {
    const autocompleteResults: AutocompleteResult[] =
      await getPlaceAutocomplete(apiKey, address);
    return autocompleteResults;
  } catch (error) {
    console.error('Error fetching autocomplete details:', error);
    throw error;
  }
}
