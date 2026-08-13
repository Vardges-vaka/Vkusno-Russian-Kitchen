import { lazy } from "react";
import {
  PublicHeader,
  PublicFooter,
} from "../05_pages/public/_shared_comps/_public.shared_comps.index.js";

const Home = lazy(() => import("../05_pages/public/home/Home.jsx"));
const Menu = lazy(() => import("../05_pages/public/menu/Menu.jsx"));
const Contact = lazy(() => import("../05_pages/public/contact/Contact.jsx"));
const Privacy = lazy(() => import("../05_pages/public/legal/Privacy.jsx"));
const FAQ = lazy(() => import("../05_pages/public/legal/FAQ.jsx"));
const TnC = lazy(() => import("../05_pages/public/legal/TnC.jsx"));

const UserRoutes = [
  {
    path: "/",
    element: (
      <>
        <PublicHeader />
        <Home />
        <PublicFooter />
      </>
    ),
  },
  {
    path: "/menu",
    element: (
      <>
        <PublicHeader />
        <Menu />
        <PublicFooter />
      </>
    ),
  },
  {
    path: "/contact",
    element: (
      <>
        <PublicHeader />
        <Contact />
        <PublicFooter />
      </>
    ),
  },
  {
    path: "/tnc",
    element: (
      <>
        <PublicHeader />
        <TnC />
        <PublicFooter />
      </>
    ),
  },
  {
    path: "/privacy",
    element: (
      <>
        <PublicHeader />
        <Privacy />
        <PublicFooter />
      </>
    ),
  },
  {
    path: "/faq",
    element: (
      <>
        <PublicHeader />
        <FAQ />
        <PublicFooter />
      </>
    ),
  },
];

export default UserRoutes;
