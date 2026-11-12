import { lazyWithPreload } from "./lazyWithPreload.js";

// Route definitions for the public site, nested under LanguageLayout so every
// path carries its language: /en/menu, /ru/menu, /ar/menu.
//
// These are relative to the /:lang parent - no leading slash, or they would
// escape the layout and lose the prefix.
//
// lazyWithPreload instead of React.lazy: the same code-splitting, plus a
// preload() that main.jsx calls before attaching React to a saved page.
const Home = lazyWithPreload(() => import("../05_pages/public/home/Home.jsx"));
const Menu = lazyWithPreload(() => import("../05_pages/public/menu/Menu.jsx"));
const MenuItem = lazyWithPreload(
  () => import("../05_pages/public/menu/MenuItem.jsx"),
);
const Contact = lazyWithPreload(
  () => import("../05_pages/public/contact/Contact.jsx"),
);
const Careers = lazyWithPreload(
  () => import("../05_pages/public/careers/Careers.jsx"),
);
const CareersJob = lazyWithPreload(
  () => import("../05_pages/public/careers/CareersJob.jsx"),
);
const Kitchens = lazyWithPreload(
  () => import("../05_pages/public/kitchens/Kitchens.jsx"),
);
const Kitchen = lazyWithPreload(
  () => import("../05_pages/public/kitchens/Kitchen.jsx"),
);
const Privacy = lazyWithPreload(
  () => import("../05_pages/public/legal/Privacy.jsx"),
);
const FAQ = lazyWithPreload(() => import("../05_pages/public/legal/FAQ.jsx"));
const Delivery = lazyWithPreload(
  () => import("../05_pages/public/delivery/Delivery.jsx"),
);
const About = lazyWithPreload(
  () => import("../05_pages/public/about/About.jsx"),
);
const NotFound = lazyWithPreload(
  () => import("../05_pages/public/notFound/NotFound.jsx"),
);

const UserRoutes = [
  { index: true, element: <Home /> },
  { path: "menu", element: <Menu /> },
  // A direct hit renders the full dish page. Clicking a card from the grid
  // passes `background` in location state, and App renders the overlay
  // variant over the menu instead - see AppRoutes.
  //
  // namespaces: translation files this page reads that are not in the list
  // loaded at start-up (`ns` in i18n.Config.js). main.jsx loads them before
  // attaching React to a saved page. React Router ignores the field.
  {
    path: "menu/:slug",
    element: <MenuItem variant="page" />,
    namespaces: ["MenuItems"],
  },
  { path: "contact", element: <Contact /> },
  { path: "careers", element: <Careers /> },
  { path: "careers/:jobId", element: <CareersJob /> },
  { path: "kitchens", element: <Kitchens /> },
  { path: "kitchens/:slug", element: <Kitchen /> },
  { path: "privacy", element: <Privacy /> },
  { path: "faq", element: <FAQ /> },
  { path: "delivery", element: <Delivery /> },
  { path: "about", element: <About /> },
  { path: "*", element: <NotFound /> },
];

export { MenuItem };
export default UserRoutes;
