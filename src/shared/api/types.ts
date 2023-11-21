export const enum FetchStatus {
  IDLE = 'idle',
  LOADING = 'loading',
  SUCCEDED = 'succeded',
  ERROR = 'error',
}

export type Params = {
  [key: string]: string | number | null | undefined;
};
