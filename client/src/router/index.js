import Auth from '../pages/Auth/Auth';
import ShoppingList from '../pages/ShoppingList/ShoppingList';

export const publicRoutes = [
  { path: '/login', component: Auth, exact: true },
  { path: '/signup', component: Auth, exact: true },
];

export const privateRoutes = [
  { path: ['/list', '/list/:listId'], component: ShoppingList, exact: true },
];
