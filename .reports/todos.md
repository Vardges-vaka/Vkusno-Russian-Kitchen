Small site fixes, no new writing from you

Finish the old addresses we skipped: /about, /faq, /privacy-policy, /contact, /index.html, /feed, /category, and /author.

Send a wrong-language dish link to the right one on the server. Today /ru/menu/russian-borscht only corrects itself after JavaScript runs, so a robot can keep the duplicate.

Add the normal icons: favicon.ico, the Apple touch icon, and a small manifest. The site only has the SVG logo.

Swap the Instagram footer icon from the 140 KB PNG to an SVG.

Put each dish photo into the sitemap next to its address.

Fill the structured data we already know: logo, phone, email, the menu link, Instagram, and Facebook. Leave hours, ratings, and per-kitchen pages alone.


Needs a yes from you first

A share picture, 1200×630. Until that file exists, WhatsApp and Facebook still show a card with no photo.

The bare address https://vkusno.ae/ can be sent to /en by the server. That helps Google, and it also sends every visitor who opens the bare address to English, including someone who last used Russian.

The homepage line, a halal sentence, and the missing pages (About, one page per kitchen, Delivery, Catering). The report is right that these matter, and they need your words before they can be built.

Real kitchen hours. The site says some kitchens are 24/7 and Google says they close around 11. Do not change either until you decide which is true.







Outside the website

The report ranks these above more code: claim and finish the Google Business profiles, reply to reviews, and fix Bing, Yandex, Dubiznes, and the stale Talabat branch. Search Console and Bing Webmaster come after you deploy. Analytics stays off until the privacy page says you use it.

The one large site job left is pre-rendering: every page has to arrive as real HTML, because Bing and the AI crawlers do not run the JavaScript. The small fixes above help, and they do not replace that.



*********************************


No. The site stays on React.

Next.js was only the bigger option in the report, and it would mean rebuilding the site. The fitting option keeps the current React and Vite setup and adds a build step that saves a finished copy of each page.

People still use the same React site. The map, the menu, and the order window stay as they are.


The site stays on React. The downsides are about the build, not about a new design.

What stays the same

People still get the same pages. The map, the dish window, and the order button still start after the page opens. A menu change or a new job still needs a build and a deploy, which is already true today.

The real downsides

The build becomes slower and easier to break. Every page has to render during the build. A missing translation, or a piece of code that expects a live browser, can stop the build. Today the build only has to produce the JavaScript.
You get two copies of each page: the saved HTML, and the React app that takes over after it loads. They can drift. A page can look right in the browser and wrong in the saved copy.
A visitor can see a short flash if the saved page and the live app disagree, for example about dark mode. The site already has a small script to stop that. It has to keep working.
You only see the saved pages in a production build. npm run dev still shows the live app, so a prerender bug can hide until you build.
The limits

One public version per address. The saved page cannot be “Russian because this person used Russian last time.” The address decides the language: /ru/... is Russian.
The saved page does not include a live Google Map. It includes the address and the hours. The map appears after the page opens, as it does now.
An unknown address does not become a real “page not found” by itself. That is a separate server rule.
A different share picture per dish is possible only if the picture tag is added in this same work. The saved page does not add that tag on its own.

Yes, there is a way through each of them. The limits are real, and they fit this site.

The saved page should be the same React page, not a second handmade copy. That is what keeps the text from drifting. The language comes from the address, so /ru/... is Russian in the saved file. Dark mode stays with the small script you already have, which runs before the page is painted. The build should fail if a saved dish page does not contain the dish name. You would see that when you run the build, before you push.

The map stays out of the saved file on purpose. The address and the hours are in the text, and the map starts after the page opens. One public version per address is also what you want. A personal “last language” cannot be saved into the file Google reads.

I would do it, as its own piece of work, not squeezed in beside a small fix. The cheap fixes are done. What is left is that Google, Bing, and the chat tools still receive an empty page. This site is a good fit because the menu, the kitchens, and the wording are already known at build time. Nothing on the public pages depends on who is logged in.

I would include the share-picture tag in that same work, so a shared dish can show that dish’s photo. I would not move the site to Next.js.




I'm going to make a detailed plan for prerendering on the current React and Vite setup. Since I'm in Plan mode, I'll research the codebase first and then put the plan together with CreatePlan. I'll start by reading the main entry, the app shell, the i18n setup, the context providers, the page metadata and layout pieces, and the Vite config and package file.

I'm weighing two ways to add prerendering: moving to React Router's framework mode, which means refactoring the routes, or writing a custom build step that server-renders the current app with a static router. The custom route keeps the existing react-router-dom setup, so I'm also checking the vercel rewrites and every page for browser-only APIs like window, localStorage, or matchMedia.

I'm checking how React 19's prerender from react-dom/static treats the lazy routes, since it waits for Suspense boundaries to resolve. The open question is where <title>, <meta>, and <link> from PageMeta end up when only the app is rendered into #root instead of a full document.

I'm checking how the hoistable <title>, <meta>, and <link> tags behave when only the app is prerendered into #root and not a full document. From what I remember, React puts them at the front of the streamed HTML, and on the client it looks for matching elements in document.head during hydration.

I'm checking whether hoisted tags from PageMeta land in the body when only the app is prerendered, since that would be invalid placement. If they do, the build step should pull them out and put them in the document head. I still can't run a render in Plan mode to confirm the exact behavior, so this stays an open question for the plan.

I'm checking whether I can test where the hoisted title and meta tags land without changing anything, since I'm in Plan mode. A small read-only node script that prints the prerender output would show it, but the Vite SSR path writes cache files, so I'm leaning away from that. I'll keep this as an open question for the plan unless a pure React experiment settles it.

I'm weighing whether a quick read-only node check can show where the hoisted title and meta tags end up when only the app is prerendered, since that determines how the build step should place them. I'm also checking whether prerender waits for the lazy routes to resolve and how the router behaves under a static setup.

I'm checking the React Router v7 setup next: whether StaticRouter is exported straight from react-router, since v7 dropped the separate server entry. I'll grep node_modules to confirm rather than relying on memory. I also need to see whether i18next takes initAsync now, since the older initImmediate option was renamed, and whether react-i18next can skip suspense once resources are preloaded.

I'm checking whether the client-side i18n loads its resources asynchronously, which could make useTranslation suspend during hydration. If the suspension lands inside a Suspense boundary, React should keep the server HTML in place until it resolves, but I'm not yet sure how a suspension at the root level behaves.

I'm weighing whether to inline the i18n resources into the page as JSON so the client can initialize synchronously before hydration. The alternative is loading the namespaces asynchronously before hydrating, but that adds a delay. Inlining only the namespaces each page uses would keep the payload smaller than the full ~95 KB across three languages.

I'm settling the hydration problem for the dish pages: the lazily loaded MenuItems namespace makes the first client render differ from the server output, since the server already has the long description. I'll need to load that namespace before hydrating, or inline it into the page.

I'm settling how the client gets the MenuItems namespace before hydrating a dish page, since the lazily loaded namespace would make the first client render differ from the server output. I'm weighing whether to load it based on the path or to have the build embed the namespaces used during prerender, which react-i18next can track through its namespace reporting.

I'm weighing whether to move the i18n namespaces for the dish pages into the prerendered HTML, or to load them before hydration, since MenuItems loads lazily and would otherwise make the first client render differ from the server output. I'm leaning toward a static map from route to namespaces, with MenuItems added only for the dish path, and I'll check the real code before settling on it.

I'm going to read through the main entry, the app shell, the i18n setup, the context providers, the page metadata and layout pieces, and the route files next, since I need the exact code before I can plan the prerender.

I'm going through the remaining files now: the config index for its env usage, the page components and their hooks, anything touching window, document, localStorage, matchMedia, or the observer APIs, the Vite config, package.json, and vercel.json for rewrites and headers, index.html, and the menu, careers, and sitemap scripts.

I'm checking Vercel's static serving next, specifically whether a request for /en/menu resolves to en/menu/index.html in the build output, since that decides how the prerendered pages need to be laid out.

I'm checking Vercel's static serving to see whether /en/menu resolves to en/menu/index.html, since that decides the layout of the prerendered pages. Vercel redirects a trailing-slash path to the version without the slash when trailingSlash is false, and cleanUrls removes the .html extension. Because of that, I'm leaning toward writing each page as a flat dist/en/menu.html file.

I'm checking how Vercel serves the prerendered pages, since /en/menu could resolve to en/menu/index.html or to a flat en/menu.html. With trailingSlash off, I'm fairly sure the directory index works, but I'd like to confirm the exact redirect and cleanUrls behavior in the docs.

I'm fairly confident Vercel serves about/index.html at /about, since it treats index.html as the directory index and normalizes trailing slashes. Writing each prerendered page as en/menu/index.html should therefore work at /en/menu, though I still want to verify the exact behavior in the docs.

I'm checking how Vercel's trailingSlash and filesystem handling interact with the prerendered index.html files, since the existing SPA rewrite could catch those paths first. I also need to make sure the new /index.html redirect rules don't interfere with serving the prerendered pages.

I'm checking whether Vercel's redirect rules could interfere with serving the prerendered directory indexes, and I think they won't, since redirects only match the literal request path. I'm also wondering whether the rewrite to /index.html gets affected by the new redirects, and whether the current deployment already handles this correctly.

I'm settling where the prerendered files go: the shell stays at dist/index.html for unknown addresses, and each language and dish page gets its own index.html in a matching folder, like dist/en/menu/ and dist/en/menu/<slug>/. I'm also checking how the /en path and the existing redirects interact with those folders.

I'm weighing whether dropping the SPA catch-all and serving a real 404 page is in scope here. Right now unknown paths reach the client app, which redirects bad dish slugs and invalid language prefixes and shows NotFound, so changing that would alter behavior beyond adding the prerender step.

I'm still weighing whether to keep the SPA catch-all, since dropping it would turn closed job URLs and inactive dish slugs into 404s instead of the client-side redirects the Careers plan relies on.

I'm settling on a plan that adds a server render entry and a prerender script after the normal client build, and I'm keeping the SPA fallback rewrite as it is so closed job and inactive dish URLs still redirect on the client.

I'm weighing two ways to get production asset URLs into the prerendered HTML: a separate vite build --ssr pass, which resolves image imports to the hashed /assets/ paths, or running the server render through ssrLoadModule as the existing scripts do, which would leave dev /src/... paths behind and break hydration.

I'm weighing whether the prerendered HTML can reuse the client build's hashed asset URLs. I believe a Vite SSR build resolves image and CSS imports to the same content-hashed /assets/ paths, so the markup should match what the client expects during hydration.

I need the CSS for each lazy route in the prerendered HTML, or the first paint will flash unstyled until the chunk loads. Vite's SSR manifest can map the rendered modules to their CSS and JS files, so I'll inject those into each page's head.

I'm mapping each route to its page chunk in the client manifest, so the prerender script can collect the CSS files that page and its static imports need. Those stylesheets then go into each prerendered page's head, so the first paint isn't unstyled while the lazy chunk loads.

I'm checking that Vite's preload helper skips adding a stylesheet when a matching <link> is already in the page, which would let the prerendered head's CSS links work without duplicates. Then I want the sitemap step to stop deleting the manifest before the prerender script has used it, so the order of the postbuild steps needs to change.

Next I'm checking how the theme affects the first render, since ThemeContext reads localStorage and matchMedia and sets data-theme on <html>. Anything that renders differently by theme, like the theme toggle checkbox, could cause a hydration mismatch, so I need to see how that state is initialized.

I'm checking how the theme's initial state might cause a hydration mismatch, since a server render that assumes light mode would differ from a dark-mode client's first render on attributes like the toggle's checked state, and React won't patch those on its own.

I'm checking how the theme state gets set up on first render, since a server render that defaults to light could disagree with a dark-mode client on attributes like the toggle's checked state, and React won't fix those on its own. For language, the URL should drive it, so the initial client state from the path should match what the server rendered, but i18n initialization and the layout's effect that syncs the language after mount could still produce a brief mismatch I need to trace.

I'm checking how the i18n setup chooses its language, since the client has to start with the URL's language or the first render won't match the server's Russian output. The language layout syncs the language only after mount, so I'm tracing whether something like the contact hook would render English first and break hydration.

I'm checking the map component next: it may render a fallback when the API key is missing at build time, which would differ from what the client shows, so I'm planning a client-only map that renders a placeholder during server render and the first client pass, then loads after mount.

I'm checking how framer-motion's initial styles would look in the prerendered HTML, since content hidden until JS animates in would still be present for crawlers but invisible on first paint.

I'm checking whether useReducedMotion gives a different answer on the first client render than on the server, since Home passes that value down to the hero and a mismatch there would break hydration for users who prefer reduced motion. I'll look at how Home.jsx passes shouldReduceMotion before deciding how to handle it.

I'm checking the remaining client-side differences that could break hydration: the footer's year comes from new Date(), so a build near New Year could mismatch and would need suppressHydrationWarning. I also need to look for Math.random and window.innerWidth-driven rendering, like the carousel's visible-slide count, plus the menu filters and header that depend on URL state.

I'm looking at how the lazy-loaded routes will hydrate: React should keep the server HTML inside each Suspense boundary until the page chunk arrives, so I need to check where the boundaries sit in App.jsx.

I'm checking how prerender from react-dom/static works here: it waits for lazy routes to resolve, so the output is complete HTML, unlike renderToString, which would emit fallbacks for unresolved lazy components.

I'm checking whether renderToPipeableStream or prerender with all content ready inlines the completed Suspense boundaries directly, so the output doesn't rely on streaming $RC reveal scripts. The prerender path waits for everything before flushing, so I expect plain inline HTML, which is what a static build needs.

I'm now checking how React's server output puts the page's head tags, which I expect to appear at the very start of the output when there's no full HTML document. I want to confirm that by running a test rather than relying on memory.

I'm checking how React's hydration handles the hoisted <title> and <meta> tags that prerender puts at the start of the output, since they'd end up outside the app markup on the client.

I'm checking how React's hydration treats the <title> element that prerender hoists to the start of the output, since it would sit outside the app markup on the client, and I'm looking at how hydrateHoistable searches the document for a matching title.

I'm checking how React's hydration finds the hoisted <title> and <link> tags in the document head, since they'd sit outside the app markup after prerender.

I'm looking at how React's hydration claims the hoisted <title>, <link>, and <meta> tags already in the document head, checking each one against its attributes before it creates a new element.

Next I'm checking how React's hydration claims the hoisted <title> already in the document. It looks for an existing title and adopts the prerendered one rather than creating a duplicate, so I'll swap the static title in the template for the prerendered one.

I'm now looking at how the page's title gets handled during client-side navigation after hydration: a new PageMeta mount will create its own title, and the old page's title gets removed when its PageMeta unmounts, same as today. The static fallback title in dist/index.html stays as it is. Description and canonical tags, which the index.html comment says are kept out of the static template, will come from prerendered PageMeta and get removed when the user navigates away. Open Graph tags are next.

Now I'm working out the og:image question for the non-dish pages: I'll keep og:image off them for now, since the general share picture has been parked, and make og:title, og:description, og:url and og:locale per-page with the page's language.

I'm settling on the og:image question for the non-dish pages: there's no general share picture yet, so they'll keep no image for now, with a single constant to fill in once the owner picks one. Dish pages will use their own photo.

I'm weighing whether Facebook, WhatsApp, Twitter/X and LinkedIn each reliably render WebP for og:image, since LinkedIn in particular seems to handle it poorly. Twitter/X does accept WebP, but I'm not certain about the others, so I'll check before deciding whether the dish photos need a JPEG version alongside.

I'm weighing whether to generate JPEG share images per dish at build time, cropped from the 1200×900 source via sharp, to avoid WebP compatibility gaps on some platforms, though that adds about 8MB to the deploy output and some build risk. I'm checking whether the original JPG sources exist to generate them from.

I'm wondering whether the full-size dish photos exist as JPGs in the repo or only as WebP. If they're WebP only, I'd need to either accept WebP for og:image or convert to JPEG at build time, and I'm not certain how well each platform handles WebP previews.

I'm settling on JPEG share images generated at build time with sharp, since it's already a dev dependency and gives a reliable 1200×630 crop across platforms, at the cost of build time and about 82 extra files. I'm weighing that against scope creep, since the request was for a prerender plan, and I'm leaning toward including it because the user already signaled interest in per-dish share pictures.

I'm settling on whether the share images should be WebP or JPEG, since some platforms handle WebP poorly. Generating JPEG crops at build time would be the safer route, though it adds build work and about 8MB to the deploy output. I'll make it the last, separable stage of the plan, since I recommended including it.

I'm checking whether the repo has full-size JPG sources for the dishes, since that decides whether I need a conversion step. A simpler option is to point og:image at the existing 1200×900 WebP build asset, which avoids new files, but the plan has to stay easy to follow, so I'll weigh whether the extra stage is worth its risk.

Per-dish share images come down to one choice: point og:image at the existing 1200×900 WebP dish photo, which needs no new files. Some apps may not render WebP previews, so I should check WhatsApp's support before I call it fine, and I'll note converting to JPEG as a later option if needed.

I'm going to check whether WhatsApp and Facebook actually render WebP og:image before committing the plan to it, since that affects the dish share photos. I'll do that during the research pass. The remaining items to review are the inline bootstrap script in index.html, which already sets lang, dir and data-theme before paint and can stay as it is, plus ScrollToTop, which only uses effects, and the ErrorBoundary class component, which is fine on the server.

I'm checking how react-router's <Navigate> behaves during a static render, since it's a no-op there and I want to be sure no prerendered URL ends up going through a redirect.

Next I'm checking how the i18n module gets loaded, since the prerender script will need to use the same instance the app does.

I'm checking how the i18n module is set up for a server render, since the prerender needs its own init that skips the HTTP backend and language detector while still using the same i18next instance that the components' useTranslation() calls read from. Next I'll look at how LanguageContext changes the language, since toggleLanguage calls i18n.changeLanguage and writes to localStorage and the document element, which need to be handled on the server.

I'm looking at how @fontsource CSS imports in App.jsx would behave in a Node SSR build, since Node can't load .css files directly. Vite typically externalizes dependencies, so I need to check whether these packages need ssr.noExternal to get bundled.

I'm checking how Vite decides whether to externalize a dependency in the SSR build, since a CSS entry from a package like @fontsource can't be loaded directly by Node and may need to be processed rather than externalized.

I'm checking how Vite decides whether to externalize a package in the SSR build. CSS entries from packages like @fontsource aren't externalized, so Vite processes them itself and drops the CSS in the server bundle. The existing readMenuData.mjs loader already runs app modules through ssrLoadModule, so vite build --ssr should also give the correct asset URLs for prerendering.

Checking whether the SSR build emits the same hashed asset URLs as the client build, since the prerendered HTML has to reference the correct bundles.

I'm checking whether the Vite 8 SSR build gives the same hashed asset URLs as the client build, since the prerendered HTML has to point at the right bundles. A build-time check that every /assets/ reference in the generated HTML exists in dist/assets would catch any mismatch. The other option is to skip the second build and render through ssrLoadModule on the dev server, then rewrite the asset paths.

I'm weighing whether the Vite manifest covers CSS-referenced assets as well, since the dev-server route would need that mapping. The sitemap step already resolved all the dish photos through the manifest, so imported images are covered. Background images and fonts that live inside CSS files wouldn't appear in the HTML at all, and running prerender against the dev server would pull in development React builds, which is why I'm leaning toward the separate SSR build.

Splitting the SSR build into its own step is the safer route, since it gives the right asset URLs for the prerendered HTML. The manualChunks setting in vite.config.js will apply to both builds, so I'll make sure the SSR output doesn't clash with the client manifest.

I'm checking that the SSR build keeps the same asset URLs as the client build, since the Vite config is shared and assetsInlineLimit: 0 should keep those references consistent. The externalized dependencies, including React, the router, i18next, and framer-motion, will be loaded straight from node_modules at prerender time.

I'm checking how the SSR build handles CJS packages, since Node's ESM loader treats default and named imports from CJS modules differently. prop-types should work through its default export, and react is also CJS but named imports from it generally resolve without trouble.

The safer fallback is ssr.noExternal: true, which bundles every dependency into the SSR output and sidesteps Node's ESM and CJS interop, at the cost of a larger server bundle.

I'm weighing whether the SSR build can safely bundle every dependency with ssr.noExternal: true, which would sidestep Node's ESM and CJS interop, at the cost of a larger server bundle. The standard Vite SSR setup keeps packages external, so I'll default to that and keep noExternal as the fallback if a named import fails at prerender time.

I'm considering running a few read-only checks, such as Node imports of the SSR dependencies, to confirm they load under ESM before settling on the plan.

I'm going to check, with plain Node and no file writes, how a small React tree renders to static HTML, since that's the core behavior the prerender step depends on.

I'm going to check the StaticRouter export in react-router-dom v7 and confirm the installed React version is 19.2. I'll also look at how i18next v26 handles async and immediate init, then test server rendering with plain Node since hydration can't be checked there.

Next I'm checking that prerender is available in react-dom/static, since React 19.0 added it. After that I'll read the entry file, the i18n setup, the contexts, the components, and the routes, looking for any code that touches the browser during render.