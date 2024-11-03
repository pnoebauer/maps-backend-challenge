// src/types.ts
export interface FuzzySearchParams {
  key: string;
  query?: string;
  typeahead?: boolean;
  limit?: number;
  ofs?: number;
  countrySet?: string;
  lat?: number;
  lon?: number;
  radius?: number;
  topLeft?: string;
  btmRight?: string;
  geobias?: string;
  language?: string;
  extendedPostalCodesFor?: string;
  minFuzzyLevel?: number;
  maxFuzzyLevel?: number;
  idxSet?: string;
  categorySet?: string;
  brandSet?: string;
  connectorSet?: string;
  minPowerKW?: number;
  maxPowerKW?: number;
  fuelSet?: string;
  vehicleTypeSet?: string;
  view?: string;
  openingHours?: string;
  timeZone?: string;
  mapcodes?: string;
  relatedPois?: string;
  entityTypeSet?: string;
}

interface GeoBias {
  lat: number;
  lon: number;
}

interface Summary {
  query: string;
  queryType: string;
  queryTime: number;
  numResults: number;
  offset: number;
  totalResults: number;
  fuzzyLevel: number;
  geoBias?: GeoBias;
  queryIntent: QueryIntent[];
}

interface QueryIntent {
  type: string;
  details: { [key: string]: unknown };
}

interface Address {
  streetNumber?: string;
  streetName?: string;
  municipality?: string;
  country?: string;
  countryCode?: string;
  freeformAddress?: string;
}

export interface Result {
  id: string;
  address: Address;
}

export interface FuzzySearchResponse {
  summary: Summary;
  results: Result[];
  // results: object[];
}
