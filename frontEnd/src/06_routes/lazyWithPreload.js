import { createElement, lazy } from "react";

// React.lazy always pauses on its first render, even when the page's file is
// already in memory. A page saved at build time must be attached without a
// pause, or React swaps the saved page for the loading spinner. main.jsx
// therefore calls preload() for the current page first. After that the
// wrapper renders the loaded page directly and never pauses.
export const lazyWithPreload = (load) => {
  const LazyPage = lazy(load);
  let LoadedPage = null;

  const Page = (props) => createElement(LoadedPage ?? LazyPage, props);

  Page.preload = () =>
    load().then((module) => {
      LoadedPage = module.default;
    });

  return Page;
};
