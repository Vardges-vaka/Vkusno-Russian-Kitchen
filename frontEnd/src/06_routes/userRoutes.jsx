import { lazy } from "react";

// Route definitions for the public site, nested under LanguageLayout so every
// path carries its language: /en/menu, /ru/menu, /ar/menu.
//
// These are relative to the /:lang parent - no leading slash, or they would
// escape the layout and lose the prefix.
const Home = lazy(() => import("../05_pages/public/home/Home.jsx"));
const Menu = lazy(() => import("../05_pages/public/menu/Menu.jsx"));
const MenuItem = lazy(() => import("../05_pages/public/menu/MenuItem.jsx"));
const Contact = lazy(() => import("../05_pages/public/contact/Contact.jsx"));
const Privacy = lazy(() => import("../05_pages/public/legal/Privacy.jsx"));
const FAQ = lazy(() => import("../05_pages/public/legal/FAQ.jsx"));
const NotFound = lazy(() => import("../05_pages/public/notFound/NotFound.jsx"));

const UserRoutes = [
  { index: true, element: <Home /> },
  { path: "menu", element: <Menu /> },
  // A direct hit renders the full dish page. Clicking a card from the grid
  // passes `background` in location state, and App renders the overlay
  // variant over the menu instead - see AppRoutes.
  { path: "menu/:slug", element: <MenuItem variant="page" /> },
  { path: "contact", element: <Contact /> },
  { path: "privacy", element: <Privacy /> },
  { path: "faq", element: <FAQ /> },
  { path: "*", element: <NotFound /> },
];

export { MenuItem };
export default UserRoutes;
