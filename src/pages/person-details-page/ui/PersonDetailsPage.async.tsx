import { lazy } from 'react';

export const PersonDetailsPageAsync = lazy(
  () => import('./PersonDetailsPage')
);
