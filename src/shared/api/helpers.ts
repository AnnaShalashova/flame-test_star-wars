import { Params } from './types';

export function buildEndpoint(base: string, params: Params): string {
  const { search, page, ...rest } = params;
  const searchParam = search ? `search=${search}` : '';
  const pageParam = page ? `page=${page}` : '';
  const defaultParams = searchParam + pageParam;
  const restParams = Object.entries(rest).reduce(
    (acc, [key, value]) => `${acc}&${key}=${value}`,
    defaultParams,
  );
  const resolvedEndpoint = `${base}/?${restParams}`;
  return resolvedEndpoint;
}
