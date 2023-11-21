import { normalizePeoples, normalizePerson } from './helpers';
import { Person } from '../model/types/peoplesSchema';
import { buildEndpoint } from 'src/shared/api';

export const PEOPLES_API_BASE = 'https://swapi.dev/api/people';

interface PeoplesHTTPResponse {
  [x: string]: any;
  body: ReadableStream<Uint8Array> | null;
  bodyUsed: boolean;
  headers: Headers;
  ok: boolean;
  redirected: boolean;
  status: number;
  statusText: string;
  type: string;
  url: string;
}

export interface NormalizedPeoples {
  count: number;
  items: Person[];
  currentPage?: number;
  search?: string;
}

interface FetchPeoplesNormalize {
  currentPage?: number,
  search?: string,
  favorites: Person[]
}


export const fetchPeoplesNormalize = async (
  { currentPage, search, favorites }: FetchPeoplesNormalize): Promise<NormalizedPeoples> => {
  const params = { page: currentPage, search };
  const endpoint = buildEndpoint(PEOPLES_API_BASE, params)
  const response: PeoplesHTTPResponse = await fetch(endpoint);
  const parsed = await response.json();

  const payload: NormalizedPeoples = {
    count: parsed.count,
    currentPage: currentPage,
    items: [],
  };

  // Peoples not found
  if (!parsed.results) {
    return payload;
  }

  payload.items = normalizePeoples(parsed.results, favorites);
  return payload;
}

export const fetchPersonNormalize = async (id: number, favorites: Person[]): Promise<Person> => {
  const response: PeoplesHTTPResponse = await fetch(`${PEOPLES_API_BASE}/${id}`);
  const parsed = await response.json();
  const result = normalizePerson(parsed, favorites);
  return result;
}


