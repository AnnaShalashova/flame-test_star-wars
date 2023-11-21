import { type RouteObject } from 'react-router-dom';
import FavoritesPage from 'src/pages/favorites-page/ui/FavoritesPage';
import MainPage from 'src/pages/main-page/ui/MainPage';
import { NotFoundPage } from 'src/pages/notfound-page';
import PeopleDetailsPage from 'src/pages/person-details-page/ui/PersonDetailsPage';
import { PeoplesPage } from 'src/pages/peoples-page';

export enum AppRoutes {
  MAIN = 'main',
  PEOPLES = 'peoples',
  PEOPLE_DETAILS = 'people_details',
  FAVORITES = 'favorites',
  NOTFOUNDPAGE = 'notfound',
}

const RoutePath: Record<AppRoutes, string> = {
  [AppRoutes.MAIN]: '/',
  [AppRoutes.PEOPLES]: '/peoples',
  [AppRoutes.PEOPLE_DETAILS]: '/peoples/:id',
  [AppRoutes.FAVORITES]: '/favorites',
  [AppRoutes.NOTFOUNDPAGE]: '*',
};

export const routeConfig: RouteObject[] = [
  {
    path: RoutePath.main,
    element: <MainPage />,
  },
  {
    path: RoutePath.peoples,
    element: <PeoplesPage />,
  },
  {
    path: RoutePath.people_details,
    element: <PeopleDetailsPage />,
  },
  {
    path: RoutePath.favorites,
    element: <FavoritesPage />,
  },
  {
    path: RoutePath.notfound,
    element: <NotFoundPage />,
  },
];
