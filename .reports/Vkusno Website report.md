# Vkusno Website Report: SEO, Google, and AI Search (AEO)

**Website:** https://vkusno.ae
**Date of audit:** 10 September 2026
**Prepared for:** Vkusno management (non-technical readers)

---

## 0. How to read this report

Every section starts with the plain-English conclusion, then the evidence, then what to do. Technical words are explained the first time they appear and again in the Glossary at the end (Section 13).

The report has three kinds of statements:

- **Verified:** we checked it ourselves on 10 September 2026 (by fetching the website like a robot does, by rendering it in a real browser, or by reading the page on Google Maps, Talabat, Bing, Brave, Yahoo and so on).
- **Reported:** a number that came from a search-engine snippet or a third-party site and that we could not open directly. These are marked "reported".
- **Inferred:** our best reading of what ChatGPT, Gemini or Claude would answer. Nobody can run those tools from an automated audit, so this is judgement based on the sources those tools use.

Section 12 lists what could not be checked and why.

---

## 1. The short version

**Your website is invisible to most of the internet's robots, and your Google Business Profiles are hurting you more than helping.** Those two problems explain almost everything else in this report.

### 1.1 What is going on, in one paragraph

vkusno.ae is a modern website built in React. When a person opens it, their browser downloads a small empty page and then runs a program that draws the menu, the text and the branch list. That works perfectly for humans. But Google is the only major search robot that runs that program. Bing runs it unreliably. ChatGPT, Claude, Perplexity and Meta's robots do not run it at all. Every one of them receives the same 6-kilobyte empty page for all 261 addresses on your site, with no menu, no branch names, no prices and no text. We proved this by pretending to be each robot in turn. As a result Google still shows your **old** WordPress website from 2024 (with wrong branches and a "delivery coming soon" message), Bing knows only 4 of your 261 pages, and AI assistants have nothing of yours to quote. Meanwhile, on Google Maps your three listed kitchens are rated 3.1, 2.7 and 2.4 out of 5, two kitchens have no Google listing at all, and Google says your kitchens close at 10:45 PM while your website says two of them are open 24/7.

### 1.2 Scorecard (0 = absent, 100 = best in class)

| Area | Score | One-line verdict |
|---|---|---|
| Google visibility and rankings | 14 | Google indexes 2 old URLs; none of the 261 new pages. Absent for 20 of 21 keywords tested. |
| AI answer engines (ChatGPT, Gemini, Claude, Perplexity) | 12 | Site is blank to their robots; you are in 0 of 8 "best Russian food in Dubai" lists they rely on. |
| Bing / Copilot | 27 | 4 pages indexed (1.5%). Ranks #1 for "russian food delivery dubai". Bing Maps listings unclaimed. |
| Off-site authority (links, press, social) | 22 | 23 linking domains, no press, Instagram dormant since July 2024, name collides with "Vkusno i tochka". |
| Local listings (Google Business Profile etc.) | 20 | 3 of 5 kitchens listed; ratings 2.4 to 3.1; wrong hours; Yango listing wrong address. |
| Content and keywords | 31 | Homepage headline is just "Vkusno"; no About, branch, delivery, catering or halal pages. |
| Competitor position | 38 | Best delivery-app ratings and most kitchens in the category, but lowest visibility. |
| Technical health of the site | 42 | Fast, well-cached, good sitemap and structured data, but all hidden behind JavaScript; several cheap fixes missing. |
| Page speed (Lighthouse, measured) | 89 to 100 | Good. Desktop 99 to 100, mobile 89 to 97. Not the problem. |

### 1.3 The five problems that matter most

1. **The website sends an empty page to every robot except Google's.** Nothing you write on the site can be read by Bing, ChatGPT, Claude or Perplexity until this is fixed. Google itself has not re-read the new site since the relaunch. (Section 3)
2. **Your Google Business Profiles are weak and partly missing.** Ratings of 3.1, 2.7 and 2.4; two kitchens not listed; hours that contradict the website; "Directions" links on your site point at map coordinates instead of your listings. Google's AI features pull local recommendations mainly from these profiles. (Section 4)
3. **Nobody outside the delivery apps talks about Vkusno.** Zero press articles, zero "best Russian restaurants in Dubai" lists, no TripAdvisor or Zomato listing, 23 linking websites. AI assistants build their "best of" answers from exactly those lists. (Sections 3.5 and 9)
4. **Old website addresses were never redirected.** Google still lists https://vkusno.ae/elementor-236/ ("Menu - Vkusno - Dubai") with a snippet promising that "our own delivery service will be launching soon" and naming a Media City branch. Search engines and AI tools repeat this. (Section 7)
5. **The site never says what you are.** The first screen does not contain the words "Russian", "Uzbek" or "Dubai". The main headline is the single word "Vkusno", which search engines associate with the Russian McDonald's replacement, "Vkusno i tochka". (Section 8)

### 1.4 The ten actions, in order

| # | Action | Who | Effort | Cost |
|---|---|---|---|---|
| 1 | Claim, fix and complete all 5 Google Business Profiles (names, hours, categories, photos, menu and order links). Create the two missing ones (Cuisinette / Clover Bay Tower, Silicon Oasis). | Owner | 1 day | Free |
| 2 | Start a review-collection routine (card in every bag, WhatsApp follow-up) and reply to every Google review. Target 100 new reviews per kitchen in 6 months. | Owner / branch managers | Ongoing, 1 hour a week | Free |
| 3 | Pre-render the website so every page arrives as real HTML (developer task; options in Section 7.2). | Developer | 2 to 5 days | Developer time |
| 4 | Add permanent redirects from old WordPress addresses, redirect www to non-www, return real "404 not found" for missing pages. | Developer | Half a day | Free |
| 5 | Set up Google Search Console and Bing Webmaster Tools, submit the sitemap, add IndexNow, add analytics (GA4). | Developer | Half a day | Free |
| 6 | Rewrite the homepage headline and first screen to say what, where and how ("Home-style Russian and Uzbek food in Dubai, delivered 24/7 from five kitchens"). Add a halal statement. | Owner + developer | 2 hours | Free |
| 7 | Build the missing pages: About, one page per kitchen, Delivery areas, Catering, Reviews, Halal and dietary. | Writer + developer | 3 to 4 weeks | Writer time |
| 8 | Fix listings everywhere else: Bing Places (3 unclaimed duplicates), Yango/Yandex Maps (wrong address, one bad review), Dubiznes (wrong hours), Talabat (stale Al Sufouh 2 branch), create TripAdvisor, Zomato, 2GIS. | Owner | 1 day | Free |
| 9 | Pitch the lists that AI tools quote: FACT, Time Out, What's On, Lovin Dubai, Colife, Dubai OFW, Property Finder blog, Bayut, emiraty.ru, Russian Emirates. Revive Instagram; open a Telegram channel. | Marketing | 2 to 4 hours a week, ongoing | Free to low |
| 10 | Once the above is live: add full structured data (links to your profiles and social pages, branch pages, menu links), a real llms.txt, an og:image for link previews, and lighter images. | Developer | 1 to 2 days | Free |

Everything except actions 3, 4, 5 and 10 can start today without a developer.

---

## 2. The video you watched: what is true and what is exaggerated

The two-minute video is directionally right but loose with facts. Here is each claim against the primary sources we read.

| Video claim | Verdict | What the sources actually say |
|---|---|---|
| "A study just came out saying over 80% of Google searches end with zero clicks." | **Exaggerated** | SparkToro/Datos (2024): 58.5% of US searches and 59.7% of EU searches ended without a click. SparkToro/Similarweb (Jan to Apr 2026): 68%. Bain (Feb 2025): "60% of searches now terminate without the user clicking through". The "80%" is a different Bain sentence: "80% of consumers now rely on AI-written results for at least 40% of their searches". So the honest number is about two-thirds, and higher when Google shows an AI Overview. |
| "ChatGPT pulls from Bing. If you're not indexed in Bing you're missing out." | **Outdated, mostly false in 2026** | OpenAI's own bot documentation lists its own crawler, OAI-SearchBot, and says sites that block it "will not be shown in ChatGPT search answers". Bing is not mentioned. A July 2026 study of 88,000 ChatGPT results found only 1.5% of the pages in OpenAI's index appear in Bing's top 20. Bing does still power Microsoft Copilot, so it is worth doing, just not for the reason given. |
| "Go look up Bing IndexNow; it makes Bing index everything and share you in ChatGPT." | **Partly true** | IndexNow is real, free and takes an hour. It is a way to tell Bing, Yandex, Naver, Seznam and Amazon that a page changed. Its own FAQ says it "does not guarantee immediate indexing", and it is not a ChatGPT pipeline. Worth doing after the rendering fix. |
| "AI is not ranking pages, it's looking for the answer. Be concise." | **Partly true** | A Princeton study (GEO, 2024) found that adding statistics, quotes and cited sources lifted a page's visibility in AI answers by 30 to 40%; keyword stuffing made it 10% worse. But the largest study of what drives AI visibility (Ahrefs, 75,000 brands, Dec 2025) found the strongest signal is how often other websites mention the brand (correlation 0.66) and YouTube mentions (0.74), far ahead of anything written on the brand's own site. |
| "Say you're the best plumber, back it up with social proof, and AI will rank you." | **Oversimplified** | Saying "we are the best" on your own site is not a signal. Being named on Reddit, YouTube, Wikipedia, review platforms and editorial "best of" lists is. Google's official guidance: there are "no additional requirements" and "no special optimizations" to appear in AI Overviews, a page just has to be indexed. |
| "ChatGPT is still the largest answer engine." | **True, but the picture is wider** | ChatGPT is the most used assistant (about 900 million weekly users, reported). But estimates of its share vary from 46% to 78% depending on the source, Gemini is second, and for a restaurant in Dubai Google's own AI Overviews and AI Mode (which draw on Google Maps) matter at least as much. |

**What the video did not say, and which matters most for you:** the robots behind ChatGPT, Claude, Perplexity, Meta AI and TikTok's parent company do not run JavaScript (Vercel and MERJ measured this across more than 500 million robot visits). Google's and Apple's robots do. Your site is JavaScript-only. So until Section 3.1 is fixed, no amount of "answer engine optimization" copywriting can be read by the engines the video is about.

---

## 3. How search engines and AI engines see vkusno.ae today

### 3.1 The website is blank to robots (verified, critical)

**What we did.** We requested pages from vkusno.ae while identifying as Googlebot, Bingbot, GPTBot (OpenAI), OAI-SearchBot (ChatGPT search), ClaudeBot (Anthropic), PerplexityBot and Applebot.

**What we saw.** Every robot, on every address (home, menu, a dish page like /en/menu/russian-borscht, contact, FAQ, Russian and Arabic pages), received the identical 6,015-byte file. It contains one title ("Vkusno - Russian Kitchen in Dubai"), a few sharing tags, and an empty box for the program to fill in. It contains no headline, no body text, no menu, no prices, no addresses, no structured data, no "canonical" tag and no language links. The word "borscht" does not appear on the borscht page. The Russian page declares itself to be in English.

**Why this happens.** All the visible text is loaded at runtime from files under /locales/, and the menu lives inside a JavaScript file. Your own robots.txt file even contains a developer note explaining that when those files were once blocked, "216 pages that look complete in a browser" became "blank to a crawler".

**Important nuance.** When the program does run (we did this in a real headless browser), the pages are actually well built: each has its own title, description, canonical link, language alternates, and rich structured data (five Restaurant entries with address, phone, hours and coordinates; a full Menu with prices and nutrition; a 16-question FAQ; breadcrumbs). The work exists. It is simply delivered in a form that most robots cannot open.

**What to do.** Pre-render the site: at build time, produce a finished HTML file for each of the 261 addresses (and any new pages), with the text, tags and structured data already inside, and keep the interactive parts (map, ordering pop-up) on top. Options and trade-offs are in Section 7.2. This is a developer task of two to five days and it is the single highest-value item in this report. Until it is done, items in Sections 8 and 10 pay off only on Google.

### 3.2 Google (verified, plus rankings from a US-located search tool)

**Index status.** Searching Google for `site:vkusno.ae` returns only two of your addresses:

| Address Google shows | Title Google shows | Snippet Google shows | Problem |
|---|---|---|---|
| https://vkusno.ae/ | "Home - Vkusno - Dubai" | "...its own delivery service will be launching soon, and in the meantime customers can order through Talabat" | Title and text are from the old WordPress site. |
| https://vkusno.ae/elementor-236/ | "Menu - Vkusno - Dubai" | "...locations in Business Bay and Media City", "beef tongue with mustard sauce, meat jelly" | Old WordPress page; wrong branches; dish list from 2024. |

None of the new addresses (/en, /ru, /ar, /en/menu, the 81 dish pages, /en/contact, /en/faq) appear. The Wikipedia page for "Vkusno i tochka" (the Russian McDonald's successor) ranks first for `site:vkusno.ae` and for the bare word "vkusno".

**Brand searches.** For "Vkusno Dubai" and "vkusno restaurant dubai" your site appears at positions 8 and 9, behind Talabat, Deliveroo and Yango Maps. For "Vkusno Russian Kitchen", "vkusno arjan", "vkusno marina", "vkusno silicon oasis", "vkusno dxb" and "Вкусно Дубай" your site does not appear in the top ten at all.

**Non-brand searches.** We checked 21 keywords in English and Russian (for example "russian food dubai", "russian restaurant dubai", "best russian restaurant dubai", "pelmeni dubai", "borscht dubai", "russian breakfast dubai", "russian food dubai marina", "русская кухня дубай", "доставка русской еды дубай"). vkusno.ae appeared for exactly one: "russian food delivery dubai", at position 7, and that was the stale homepage. The winners are editorial lists (Visit Dubai, FACT Magazine, Colife, Dubai OFW, Property Finder, Bayut), aggregators (TripAdvisor, Zomato, Talabat, Deliveroo), and the own websites of Suvoroff, Pechka, Chalet Berezka, Skazka and Puzatic.

**Caveat.** These positions were collected with a search tool located in the United States. A person in Dubai sees a map pack and slightly different orderings. What does not change with location is which pages Google has in its index, and that list is two old pages.

**Bright spot.** Google's search summaries for "russian home food delivery dubai borscht pelmeni order online" named Vkusno first. Your delivery reputation is real; it is just being carried by Talabat's pages rather than yours.

### 3.3 Bing and Microsoft Copilot (verified through Yahoo, which uses Bing's index; independently re-verified)

- Bing knows **4 of your 261 pages**: the homepage, /ar, one random dish page (/en/menu/boiled-rice) and a leftover WordPress test post, /hello-world/ ("Welcome to WordPress. This is your first post."). The dish page is indexed under the generic site title, which proves Bing read the empty shell rather than the real page.
- No Russian page is in Bing at all.
- Despite this, vkusno.ae ranks **#1** on Bing for "vkusno dubai", "vkusno russian kitchen" and "russian food delivery dubai", #8 for "russian food dubai", #7 for "русская кухня дубай" and #4 for "доставка русской еды дубай". It is absent for "russian restaurant dubai", "best russian restaurant dubai", "pelmeni dubai", "borscht dubai", "russian breakfast dubai" and "русский ресторан дубай".
- On **Bing Maps**, Vkusno exists as **three separate unclaimed listings** (each shows "Is this your business? Claim now"), one with no street address, one at "1 Al Suwayeb Street, Business Bay", one with a garbled address ("26185 85970 26185 85970, Business Bay"). All show hours of 7:00 AM to 10:45 PM or 11:45 PM. There are no Bing listings for Arjan, Dubai Marina, Silicon Oasis or Cuisinette. Even so, Vkusno holds positions 2, 3 and 13 in Bing Maps for "Russian restaurant Dubai", so claiming and fixing these listings is a quick win.
- There is no sign of Bing Webmaster Tools verification or an IndexNow key (though because every unknown address returns "200 OK", this cannot be proven from outside; check inside Bing Webmaster Tools).

### 3.4 Brave Search, used by Perplexity and Claude (verified)

Brave is the web index behind Perplexity and the search feature in Claude. Here vkusno.ae is strong on delivery intent:

| Query on Brave | Vkusno position |
|---|---|
| best russian food delivery dubai | #1 (vkusno.ae) |
| russian food delivery dubai | #1 (vkusno.ae) |
| where to order russian food in dubai | #1 (vkusno.ae) |
| russian food delivery dubai marina | #1 Deliveroo Vkusno Marina, #4 Talabat Vkusno |
| vkusno dubai | #1 vkusno.ae, #2 the stale /elementor-236/ page ("delivery service launching soon") |
| best russian restaurant dubai | Not in results; only a map pin for the Arjan kitchen, showing "closes 10:45 PM" |

The snippet Brave shows for vkusno.ae is also the old WordPress text ("In our kitchen we pride ourselves on using the best ingredients..."). Protect this position by giving the engines a real delivery page to quote (Section 8).

### 3.5 What ChatGPT, Gemini and Claude most likely answer today (inferred)

AI assistants build "best of" answers from the same pool of editorial lists, review platforms and forums. We read every list we could open. **Vkusno is named in none of them:**

| Source | Date | Names it lists | Vkusno? |
|---|---|---|---|
| FACT Magazines, "best Russian restaurants in Dubai" | 6 May 2026 | 14 venues incl. Pechka, Suvoroff, Chalet Berezka, Babushka, District 8 | No |
| Dubai OFW, "21 Best Russian Restaurants" | updated 12 Aug 2026 | Pushkin, Skazka, Puzatic, Suvoroff, Morozko, Adrass, Uzbegim, UZB Avenue and others | No |
| Colife, "Top 10 Russian restaurants" (EN and RU) | undated | Suvoroff, Skazka, Babushka, Pushkin, Puzatic, Caviar Kaspia, Novikov, IKRA, Krasota, La Terrazza | No |
| Property Finder blog | 1 Jan 2025 | Babushka, Suvoroff, Muscovites, Flourly, Puzatic ("24-hour delivery") | No |
| Dubai Housing | 16 Sep 2023 | 21 names | No |
| Zomato Russian collection | live | Puzatic, Skazka, Pushkin, Uzbegim, UZB Avenue, Pechka | No (no Zomato listing exists) |
| EatEasy Dubai Hills Russian page | live | Morozko, Shamshir, Vostochka | No |
| Khaleej Times | search | Raspoutine, Sakhalin reviews | No |
| Visit Dubai article | Mar 2025 | Rodina and others (partly readable) | No |
| Bayut "Best Russian Restaurants" | dead page (HTTP 410) but still in search results | title says "Skazka, Suvoroff & More" | Unknown |
| Time Out Dubai, TripAdvisor | blocked to robots | per snippets: Skazka, Magadan, District 8, Gurman, Troyka | Not verifiable |

So the most likely answer today to "best Russian food delivery in Dubai" from a model working from memory is **Skazka (named in 6 of 8 readable sources, "Free Home Delivery 24/7" on its own site), Pechka, Puzatic, Suvoroff and Pushkin**. Vkusno appears only when the assistant runs a live web search and lands on Brave's #1 result or on your Talabat and Deliveroo pages. Google's own search summaries already describe Vkusno incorrectly in places (one called it "a Russian fast-food brand which rebranded from McDonald's"; another listed Media City and Ibn Battuta as current locations).

Two more facts shape the AI picture:

- **Google's AI features cite local businesses from Google Maps, not websites.** A study of 86,645 citations (Steady Demand, Aug 2026) found Google AI Mode cites Google Maps and Business Profiles 79.8% of the time for local queries, while AI Overviews cite business websites 70.7% of the time. Your Google Business Profiles (Section 4) therefore matter as much as your website.
- **Google retired FAQ rich results on 7 May 2026.** Your FAQ structured data no longer earns the expandable question boxes in Google. The FAQ text itself is still valuable for AI answers, once it is in the HTML.

---

## 4. Google Business Profile and local listings (verified on Google Maps, 10 September 2026)

This section covers the gap left when one of the audit's research agents failed; we checked Google Maps directly in a browser.

### 4.1 What Google Maps shows for your five kitchens

| Kitchen (as on your site) | On Google Maps? | Google rating | Category shown | Hours Google shows | Your site says |
|---|---|---|---|---|---|
| Arjan, Rose Palace Residences, Shop 19 | Yes | **3.1** (141 reviews) | Russian restaurant | 7 AM to 10:45 PM daily | Open 24/7 |
| Dubai Marina, Marina View Towers | Yes | **2.7** (51 reviews) | Russian restaurant | Closes 11:45 PM | Open 24/7 |
| Business Bay, SOL Avenue | Yes | **2.4** (51 reviews) | "Restaurant" (not Russian) | Closes 10:45 PM | 07:00 to 23:00 |
| Business Bay, Cuisinette (Clover Bay Tower) | **No listing found** | | | | 24/7 per site copy |
| Dubai Silicon Oasis | **No listing found** | | | | 07:00 to 23:00 |

All three listings link to vkusno.ae and to phone 052 102 5674, carry 84 to 124 photos, and have an "Order online" button. That part is fine.

### 4.2 Why this is the second most important finding

- **Your Google ratings are the lowest in your competitor set.** Competitors' Google ratings (via Restaurant Guru, reported): Puzatic 4.5 (1,029 reviews), Suvoroff 4.4 (384), Pechka 4.3 (478), Skazka 4.0 (756), Chef Irina's Kitchen in Silicon Oasis 4.6 (69). Only Pushkin, at 2.5, is comparable. On Talabat you score 4.6 (2,445 ratings on the brand page) and 4.3 (1,000, Business Bay), with snippets reporting 4.5 across 9,399 and 17,396 ratings on branch pages. The gap between 4.5 on Talabat and 2.4 to 3.1 on Google is large. Google reviews are written by the minority of customers who feel strongly, and today that minority is unhappy: the visible reviews complain about taste, freshness, portions and dry meat. A restaurant rated under 3.5 is rarely recommended by Google Maps, by Google's AI features, or by any assistant that reads Google data.
- **Opening hours disagree everywhere.** Google says 10:45 PM or 11:45 PM. Bing says 10:45 PM or 11:45 PM. Dubiznes.ae says Monday to Saturday 11:00 to 22:45, closed Sunday. Your website and its structured data say Arjan and Marina are open 24/7. Only one of these can be right, and an assistant asked "is Vkusno open now at 1 AM" will pick one. Decide the true hours per kitchen and set the same hours on the website, Google, Bing, Yango, Talabat, Deliveroo, Noon, Careem and Keeta.
- **Two kitchens do not exist on Google Maps.** Nobody searching "Russian food Silicon Oasis" can find you there; Chef Irina's Kitchen (4.6) and Mr. Russian take that traffic.
- **Your website does not link to the listings.** Four of the five "Directions" links on the Contact page resolve to raw map coordinates; the fifth resolves to "Clover Bay Tower", the building. Your structured data therefore never tells Google which listing belongs to which page.
- **The SOL Avenue listing is categorised as a generic "Restaurant"**, so it does not appear for "Russian restaurant" searches.

### 4.3 Other listings (verified unless marked)

| Platform | Status | Problem |
|---|---|---|
| Yango Maps / Yandex Maps (the default map for Russian speakers) | One listing | Address "15/4 Sheikh Mohammad Bin Zayed Road" matches none of your kitchens; no phone; 2 photos; a single review, one star, from March 2025 ("rubber tongue... Napoleon is dry"). No other kitchens listed. |
| Bing Places | Three unclaimed duplicates | No street address on the main one; garbled address on another; wrong hours; Arjan, Marina, DSO, Cuisinette missing. |
| Dubiznes.ae (Russian directory) | Listed | Hours "Mon to Sat 11:00 to 22:45, Sunday closed"; a "50% discount" claim in the title. |
| Talabat | Listed, 5+ branch pages | Includes a "DH Kitchen, Al Sufouh 2" branch that is not one of the five kitchens; branch names are inconsistent ("kitchensol-business-bay", "business-baydh-kitchen"). No written reviews shown. |
| Deliveroo | 3 branch pages found (Marina, Business Bay, Arjan) | Also listings named "Vkusno I Bistro" and "Vkusno Kitchen - Ibn Battuta" that rank for your brand; we could not confirm whether these are yours. Cuisinette and DSO pages not found. |
| UAEThrive, Wanderboat | Indexed by Google but pages now return "not found" | Dead citations. |
| TripAdvisor, Zomato, Restaurant Guru, 2GIS, Foursquare, Wanderlog, Yellow Pages UAE | **No listing found** | These sites rank in the top five for almost every Russian-food search in Dubai. |
| Wikidata / Google Knowledge Panel | None | The only "Vkusno" entity on Wikidata is Vkusno i tochka. |

### 4.4 What to do about local listings

1. **Claim and complete the three existing Google profiles and create the two missing ones.** Use the identical name "Vkusno Russian Kitchen" on all five (put the area in the address, not the name). Primary category "Russian restaurant", secondary "Uzbek restaurant" and "Delivery restaurant". Set the true hours. Add the menu link (vkusno.ae/en/menu), the order link (RestHero for Arjan), 20 or more photos per kitchen, and seed the Q&A section with your own answers (halal, parking, 24 hours, delivery apps).
2. **Fix the review problem, not just the review count.** Read the last 50 reviews per kitchen with the branch managers; the complaints cluster around taste, freshness and portion size on delivery orders. Reply to every review, including old ones, in a calm and specific way. Then ask every happy customer for a Google review: a QR card in every delivery bag, a WhatsApp message an hour after delivery, a sign at the counter. One hundred new honest reviews per kitchen in six months would move you from 2.4 to 3.1 into the 4+ range that gets recommended.
3. **Copy the corrected details to Bing Places** (bing.com/forbusiness lets you import from Google), claim the three duplicates and merge them, then to **Yango/Yandex Business** (fix the address, add the phone and the other four kitchens, reply to the negative review), then to **2GIS**, **TripAdvisor** (for kitchens with seating), **Zomato**, **Restaurant Guru** and **Yellow Pages UAE**. Keep a spreadsheet of every listing URL.
4. **Ask Talabat and Deliveroo account managers** to rename branches consistently, remove or explain the Al Sufouh 2 and Ibn Battuta listings, and use the same restaurant description as your website.
5. **Have the developer replace the coordinate links** with each listing's share link and add those links to the structured data (Section 7.4).

---

## 5. Your reputation across platforms

| Platform | Rating | Volume | Note |
|---|---|---|---|
| Talabat brand page | 4.6 | 2,445 ratings | Verified. Cuisines listed: Russian, Uzbek, Breakfast, Grills, Soup. No written reviews displayed. |
| Talabat Business Bay (SOL) | 4.3 | 1,000 ratings | Verified. |
| Talabat branch pages | 4.5 | 9,399 and 17,396 ratings | Reported in Google snippets; not opened directly. |
| Google Maps Arjan | 3.1 | 141 reviews | Verified. |
| Google Maps Marina | 2.7 | 51 reviews | Verified. |
| Google Maps SOL Avenue | 2.4 | 51 reviews | Verified. |
| Yango Maps | 0 | 1 review (1 star) | Verified. |
| bestthings.ae | 3.8 | 62 reviews | Reported in a Bing snippet. |
| Deliveroo | not retrievable | | Pages block robots. |

The Talabat numbers are excellent and are the best in your category (Pechka 4.5, Chef Irina 4.4, Skazka 4.2, Pushkin 4.1; Morozko 4.8 and Plumpy 4.6 on far fewer ratings). But this proof is invisible: it is not on your website, not in your structured data, and not on the platforms that search engines and AI assistants read most (Google Maps, TripAdvisor, Zomato). Use it: quote "Rated 4.6 by 2,400+ Talabat customers" on the homepage and in press pitches, and pour the same customer goodwill into Google reviews.

---

## 6. Competitors

We benchmarked the six competitors that actually surface in search: Pechka, Chef Irina, Suvoroff, Skazka Al Saha, Puzatic and Pushkin.

| | Vkusno | Pechka | Chef Irina | Suvoroff | Skazka | Puzatic | Pushkin |
|---|---|---|---|---|---|---|---|
| Website readable by robots | **No** (empty shell) | Not testable (their site challenges all robots) | Yes | Yes | Yes | Yes | No website that works |
| Structured data in the HTML | None (only after JavaScript) | not testable | Restaurant with 3 addresses, hours, menu | Organization + 3 Restaurants, EN/RU | None | Basic only | n/a |
| Languages | EN, RU, AR | EN | EN | EN, RU | EN, RU | RU only | n/a |
| Pages in sitemap | 261 | 174 (about 140 dish pages plus rewards, gift cards, delivery areas, branches, press, catering, wholesale, franchise) | 11 (incl. 4 service pages) | 16 (per-branch pages, PDF menus) | 22 | 5 | n/a |
| Per-branch pages | No | Yes | Yes | Yes | Yes | No | n/a |
| Catering / corporate page | No | Yes | Yes | No | No | No | n/a |
| Own ordering | RestHero (Arjan only) | Own app with rewards and gift cards | Own web and iOS/Android app | WhatsApp | None | WhatsApp | Aggregators |
| Talabat rating | 4.6 | 4.5 | 4.4 | not retrievable | 4.2 | not retrievable | 4.1 |
| Google rating (reported) | 3.1 / 2.7 / 2.4 (verified) | 4.3 (478) | 4.3 (80, self-reported) | 4.4 (384) | 4.0 (756) | 4.5 (1,029) | 2.5 (431) |
| Instagram followers (reported) | 2,062 (last post July 2024) | 11,000 | 4,325 | 6,477 | n/r | n/r | n/r |
| Named in "best of" lists | 0 | FACT | 0 | FACT, Colife, Dubai OFW | Colife, Dubai OFW and 4 more | Colife, Dubai OFW, Property Finder | Colife, Dubai OFW |
| Analytics on site | None | n/r | GA4 + Tag Manager | Yandex Metrika | None | None | n/a |
| Kitchens | 5 (most in the set) | Marina cafe + kitchens | 3 | 3 | 3 | 2 | 4 |

**Five things competitors do that you do not:** serve readable HTML to robots; run a dine-in venue and collect Google and TripAdvisor volume; own an ordering app with rewards; publish per-branch and business-service pages (catering, corporate, franchise); show their ratings on their own site and measure their traffic.

**Five things you do better:** best delivery-app ratings among home-style brands; most kitchens and widest delivery coverage (five aggregators including Noon and Keeta, two or three 24/7 kitchens); the only trilingual site with Arabic; the deepest menu content (81 dish pages with nutrition, once visible); the fastest, most modern hosting.

**Who is "the answer" today:** for dining out, Suvoroff, Pechka, Skazka and fine-dining names (District 8, Birch, Caviar Kaspia, Chalet Berezka, Babushka); for delivery, aggregator pages (Velikaya, Zdarovii, Pechka, Skazka) and Vkusno through its outdated snippet. Your gap is not food or budget; it is readable content, Google profiles, directory coverage and press.

---

## 7. Technical health of the website

### 7.1 What is good (verified)

- Fast hosting on Vercel: first byte in about 30 ms; assets compressed (Brotli) and cached for a year; total JavaScript on first load about 165 KB compressed.
- Lighthouse scores (measured 10 September 2026, our own runs):

| Page | Mode | Performance | Accessibility | Best practices | SEO |
|---|---|---|---|---|---|
| Home | Mobile | 89 | 95 | 100 | 100 |
| Home | Desktop | 99 | 100 | 100 | 100 |
| Menu | Mobile | 97 | 100 | 100 | 100 |
| Menu | Desktop | 100 | 100 | 100 | 100 |
| Dish page (Russian Borscht) | Mobile | 90 | 93 | 100 | 100 |

  Note that Lighthouse runs JavaScript, which is why it gives SEO 100. It is measuring what a person sees, not what a robot receives.
- A valid sitemap of 261 addresses with fully reciprocal language links (1,044 alternate links, zero errors).
- robots.txt allows every robot, including all AI crawlers. Keep it that way.
- Fonts are self-hosted; no third-party scripts except Google Maps; no tracking pixels.
- The structured data, when rendered, follows Google's conventions (24-hour opening pattern is valid, price range is valid, menu items have prices and nutrition).
- Trailing-slash handling and HTTP-to-HTTPS redirect are correct.

### 7.2 The rendering fix (the one big developer task)

Options for a Vite + React 19 app on Vercel, in order of fit:

| Option | What it is | Pros | Cons |
|---|---|---|---|
| React Router v7 framework mode with a pre-render list | Build one HTML file per address (all 261, generated from the menu data and the three languages) | Stays on Vite and static hosting, no server cost, officially supported, works with React 19 | Route refactor; the translation text must be available at build time |
| Migrate to Next.js | Vercel's own framework with static generation | Best long-term (metadata, image optimisation, incremental rebuilds) | Largest rewrite |
| Headless-browser pre-render plugin (vite-plugin-prerender or similar) | A build step opens each page and saves the HTML | Minimal code change | Slow and fragile for 261 pages; React 19 compatibility unverified |
| Dynamic rendering (Prerender.io behind a Vercel middleware) | Serve cached HTML only to robots | No front-end change | Google calls this "a workaround and not a long-term solution"; paid; no benefit for humans |

Whichever option is chosen, bake into each HTML file: title, meta description, canonical link, language alternates, og:image, the H1 and body text, and the JSON-LD structured data. Keep hydration for the map and the ordering pop-up.

**Interim 15-minute fix while that project runs:** add a static meta description and an og:image to the shared index.html so at least link previews and robot fetches get one paragraph and a picture.

### 7.3 Cheap fixes that are missing (verified)

| Issue | What we saw | Fix | Effort |
|---|---|---|---|
| www duplicate | https://www.vkusno.ae/ serves the whole site with status 200, no redirect | In Vercel domains, redirect www to vkusno.ae | 15 min |
| Old WordPress addresses not redirected | /elementor-236/, /hello-world/, /menu/, /contact-us/, /wp-json/, /feed/ and others all end at "200 OK" with the empty shell | Add permanent redirects: /elementor-236 and /menu to /en/menu; /contact-us to /en/contact; /hello-world and /about to /en; /faq to /en/faq; /privacy-policy to /en/privacy; WordPress system paths to "410 Gone" | 1 hour |
| Soft 404s | Any made-up address, including missing JavaScript, JSON and icon files, returns "200 OK" with the shell | Scope the catch-all rewrite to paths without file extensions and outside /assets and /locales; serve a real 404 page with status 404 | 2 hours |
| Root address | https://vkusno.ae/ is not in the sitemap and only redirects to /en in JavaScript; it is the address Google still lists with the old title | Server-side redirect / to /en (or language detection at the edge) | 30 min |
| Case and query duplicates | /EN, /en/Menu, /index.html, /en/menu?x=1 all return 200 with no canonical tag in the HTML | Solved by pre-rendering (canonical in HTML); add /index.html redirects | 1 hour |
| No og:image | Sharing any page on WhatsApp, Facebook or Slack shows a card with no picture; og:url is always the homepage; og:locale values are in the wrong format ("en" instead of "en_US") | Add a 1200x630 image, fix og:locale, and per-page og tags after pre-rendering | 1 to 2 hours |
| No favicon.ico, apple-touch-icon or web manifest | Those addresses return the HTML shell; the only icon is a 52 KB SVG with no caching | Generate the standard icon set and manifest | 1 hour |
| Security headers | Only a basic HSTS header; no Content-Security-Policy, X-Content-Type-Options, X-Frame-Options, Referrer-Policy | Add them in vercel.json | 1 hour |
| Sitemap | No lastmod dates, no images, root address missing; wrong-language dish slugs (for example /ru/menu/russian-borscht) return 200 and redirect only in JavaScript | Add lastmod and image entries; server-side redirects for slug variants | 2 hours |
| Structured data gaps | Restaurant entries lack image, sameAs (links to your profiles), menu link, per-branch URL (all five point to /contact); Organization lacks logo, phone, email, sameAs, founding date; description is in English on Russian and Arabic pages | Add these fields; point each branch to its own page; link to the Google listing share URLs | Half a day |
| Heavy images | 258 WebP images total 21.5 MB; the hero image (286 KB) is a CSS background that robots and browsers discover late; the Instagram footer icon is a 140 KB, 500x500 PNG shown at 20 pixels; dish photos average 144 KB with 40 over 150 KB | Re-encode dish photos to about 100 KB, add width/height and srcset on the dish page photo, preload the hero, replace the icon PNG with an SVG | Half a day |
| Language signal | Without JavaScript every page says lang="en" | Solved by pre-rendering | |
| Google Maps key | A browser key is in the bundle (normal). It is restricted to the Maps JavaScript API; we could not confirm it is also restricted to your domain | Confirm HTTP-referrer restriction in Google Cloud Console | 15 min |
| llms.txt | Returns the HTML shell with 200 (a fake file) | Either serve a real plain-text summary or return 404. Do not expect it to move AI visibility; Google says nobody reads it yet | 15 min |
| No analytics | No Google Analytics, Tag Manager, Meta pixel or Clarity anywhere | Add GA4 through Tag Manager with click events for each ordering app, WhatsApp and phone; add Yandex Metrika for the Russian audience | 2 to 3 hours |

### 7.4 Robots policy for AI (verified against each vendor's documentation)

Your robots.txt currently allows everything. Keep it. For a small restaurant brand that wants to be known to AI models, also leave the training robots (GPTBot, ClaudeBot, Google-Extended, Applebot-Extended, CCBot) allowed; blocking them removes you from future model knowledge and gains nothing. The only sensible block is Bytespider (ByteDance), which is widely reported to ignore robots.txt anyway. Two checks for the developer: confirm the Vercel "AI Bots" firewall ruleset is off or in log mode (it is off by default; in deny mode it would silently undo everything), and after pre-rendering, test with `curl -A GPTBot https://vkusno.ae/en/menu/russian-borscht` that the dish name appears in the response.

---

## 8. Content and keywords

### 8.1 What the site says today (verified from the site's own text files)

- **Homepage:** headline "Vkusno"; tagline "Authentic Flavors"; first paragraph "Delicious meals delivered straight to your door. Experience our premium meals from the comfort of your home." The words "Russian", "Uzbek" and "Dubai" do not appear until the footer. Unique text is about 100 words.
- **Menu:** good headline ("Home-style Russian cuisine for every occasion"), 12 categories, but categories are filters, not pages with their own addresses.
- **Dish pages (81):** better than expected: 40 to 75 words each with portion weight, ingredients and nutrition. But none say whether the dish is halal, which kitchens serve it, what it pairs with, or answer any question. One Russian description (Eggplant Rolls) is literally the text "33", a data bug. About 60% of each dish page is repeated header and footer.
- **FAQ:** 16 real questions in three languages. The best asset on the site. It misses the questions people ask most: halal, delivery areas, prices, best dishes, catering, Ramadan, vegetarian and kids options, payment methods. The parking answer is a non-answer.
- **Contact:** the introduction reads like an investor memo ("A flexible model keeps quality close to demand"). Branch cards show only a name, hours and one-line address.
- **Missing entirely:** About page, one page per kitchen, Delivery areas, Catering, Reviews, Halal and dietary, Guides, Occasions (New Year, Maslenitsa, Ramadan), Careers, category landing pages.
- **Phrases with zero occurrences in the English site:** "russian food", "russian restaurant", "halal", "catering", "near me", "russian bakery", "medovik", "blini", "shashlik", "pirozhki", "24 hours". Google autocomplete in the UAE shows demand for every one of these.

### 8.2 What people search for (Google autocomplete, UAE, and Bing; no volume tool was available, so demand is qualitative)

| Language | Seed | What people add | Demand | On your site today? |
|---|---|---|---|---|
| EN | russian food dubai | delivery, marina, best, restaurant, catering, near me | High | "russian food" appears 0 times |
| EN | russian restaurant dubai | marina, near me, downtown, palm, difc, creek harbour | High | 0 |
| EN | russian food delivery dubai | near me, restaurant near me delivery | High and yours to win | Only in the meta description |
| EN | pelmeni / borscht / syrniki dubai | best, near me, house, frozen, "what makes borscht borscht" | Medium | Dish pages only |
| EN | plov / uzbek food dubai | marina, uzbek plov, best plov, uzbek restaurant near me | Medium-high | "Uzbek" appears 16 times (good) |
| EN | honey cake / napoleon cake dubai | price, price list, order, best | Medium | Dish pages, no prices in text |
| EN | russian catering dubai | food catering | Low-medium | 0 |
| EN | halal / 24 hours / ramadan | no autocomplete, but "are all restaurants in dubai halal" appears | Trust content | 0 |
| RU | русская кухня дубай | марина, доставка | High | Title only |
| RU | доставка еды дубай | на русском языке, круглосуточно, марина, доставка русской еды | High | Generic hero text |
| RU | пельмени / сырники / плов / медовик дубай | домашние, купить, узбекский, medovik | Medium | Dish pages (short) |
| AR | مطعم روسي دبي | في دبي, دبي مول | Medium | Title only |
| AR | مطعم اوزبكي دبي | افضل | Low-medium | 0 |

Competitors already hold the Russian-language demand: for "доставка русской еды дубай" the results are Suvoroff's and Pechka's Russian delivery pages, Puzatic and Skazka; your Russian pages are not indexed anywhere.

### 8.3 Questions customers and AI assistants ask, and whether the site answers them

| Question | Answered today? | Where it should live |
|---|---|---|
| Is Vkusno halal? | No | FAQ, About, every dish page, structured data |
| Do you deliver to JVC / JLT / Downtown / Al Barsha? | Partly (Arjan "roughly 30 km") | Delivery page with an area-to-kitchen table |
| Which kitchen is open 24 hours? | Indirectly, and it conflicts with Google | FAQ and branch pages, after you settle the true hours |
| What is your most popular dish? | No (Talabat says syrniki, baked hot dog, chicken noodle soup, manti) | Homepage "Most ordered" section |
| How much is borscht / pelmeni / plov? | Price shown, not in sentences | Dish text ("AED 41 for a 500 g bowl") |
| Do you do catering or office lunches? | No | Catering page |
| Is there parking at Arjan? | Non-answer | Branch pages |
| Vegetarian, vegan, kids options? | No | FAQ and menu tags |
| Is Vkusno the same as Vkusno i tochka? | No | About page: "an independent Dubai brand founded in 2021" |
| Where can I read reviews? | No | Reviews page |

### 8.4 Content plan (10 pages, each in EN, RU and AR where marked)

Every page should open with a two-sentence direct answer that an assistant can lift word for word, then the detail.

1. **/en/about** (EN/RU/AR): "Vkusno is an independent Dubai food brand founded in 2021 that cooks home-style Russian and Uzbek dishes in five kitchens (Arjan, Dubai Marina, two in Business Bay, Dubai Silicon Oasis)..." plus founders, halal statement, best sellers, Talabat rating, press. Say plainly that you are not related to Vkusno i tochka.
2. **/en/branches/arjan** and four more (EN/RU/AR): building and shop number, landmark, parking, seating, exact hours, which apps deliver from this kitchen, direct-order link, areas served, photos, three dated reviews, a short branch FAQ. Point the branch's structured data and its Google listing at this page.
3. **/en/delivery** (EN/RU/AR): "Vkusno delivers home-style Russian and Uzbek food across Dubai from five kitchens via Talabat, Careem, Deliveroo, Noon Food and Keeta; Arjan also delivers directly within about 30 km." Area-by-area table. This protects your #1 Brave and Bing positions.
4. **Category landing pages** (breakfast, soups, dumplings, uzbek, grill, baked goods, salads, desserts, combos): 150 to 300 words each with prices and "what is" one-liners, replacing the current filter anchors.
5. **/en/menu/uzbek**: the Uzbek half of the menu is under-signposted; plov at AED 50 sits inside the AED 45 to 55 band that Dubai food guides quote.
6. **/en/catering** (EN/RU): three per-person packages built from existing combos, minimum guests, notice, WhatsApp button.
7. **/en/halal-and-dietary** (EN/AR/RU): the single most important trust page. State exactly what is true about meat sourcing, pork and alcohol, and list vegetarian dishes (vareniki, draniki, cabbage and potato pies, vinegret, beetroot salad).
8. **/en/guides/** (EN first): "What is pelmeni?", "What is borscht?", "Russian comfort food: 10 dishes to try first", "Plov in Dubai: what it is and what it costs". Answer first, then price, portion, halal note, order button.
9. **/en/reviews** (EN/RU): the Talabat rating with the date, dated quotes per kitchen, refreshed monthly.
10. **/en/cakes** and **/en/occasions** (EN/RU): honey cake and Napoleon with prices and whole-cake pre-order; New Year sets (Olivier, Shuba, pelmeni, honey cake), Maslenitsa blini week, a Ramadan family combo, each published six weeks ahead.

**Dish page template (apply to all 81):** headline with the Russian name ("Pelmeni with Meat (Пельмени)"), a one-sentence answer with price and portion, the existing description, ingredients (remove the "(Est.)" markers and a stray "Name" placeholder in Chicken Noodle Soup), portion and serves, nutrition, halal and allergen note, which kitchens and apps carry it, two or three "pairs with" links, a two-question mini FAQ, and the order button. Target 150 to 250 unique words.

**Homepage:** change the headline to "Vkusno: Home-style Russian and Uzbek Food in Dubai, Delivered 24/7" (or the true hours), rewrite the first paragraph as an answer, and add three sections: What we cook, Where we are (five kitchens with hours), How to order. Target 400 to 600 unique words per language. Add "Most ordered" and "Rated 4.6 by 2,400+ Talabat customers".

---

## 9. Off-site: links, press, social and the name problem

- **Backlinks:** Majestic's public index shows 30 links from 23 domains, almost all aggregators and auto-generated directories. Not in the Majestic Million. Domain first archived December 2021.
- **Press:** no article in Time Out Dubai, What's On, Lovin Dubai, Gulf News, Khaleej Times, HiDubai or Dubai Week mentions the restaurant. Their only "Vkusno" stories are about Vkusno i tochka.
- **Social:** Instagram @vkusnodxb has 2,062 followers, 182 posts, and its most recent visible post is from July 2024. LinkedIn has 114 followers and claims 51 to 200 employees and halal certification (check both are accurate; the halal claim should be on the website). Facebook is small (a snippet reports 54 followers). No Telegram channel, TikTok, YouTube, Threads or VK presence; the handle @vkusnodxb is free on Telegram and YouTube, so reserve it. The Instagram bio links to a Linktree that lists RestHero, WhatsApp, Facebook, LinkedIn, the website and a PDF menu, but not Talabat, Deliveroo, Noon, Careem or Google Maps.
- **Community:** no Reddit thread, no Russian-language portal (Russian Emirates, Dubai-ru), no Telegram community post mentions Vkusno.
- **Name collision:** for the bare word "Vkusno", zero of eight results are you. For the exact phrase "vkusno.ae", three of five results are Wikipedia pages about Vkusno i tochka, VkusVill and Azbuka Vkusa. Only geo-qualified searches ("Vkusno Dubai") are won.

**What to do:**

1. Use one name everywhere: "Vkusno Russian Kitchen" (short form "Vkusno Dubai"), on the site title, headline, structured data, Instagram, Facebook, LinkedIn, every listing.
2. Build a /links (or /order) page on vkusno.ae with every ordering channel per kitchen and the Google Maps links, and point all bios to it instead of Linktree.
3. Restart Instagram (three posts and daily stories a week; reels of dishes being cooked in the 24/7 kitchens; geotag each kitchen), open a Telegram channel for the Russian-speaking community, invite five to ten micro-creators per month for tastings. A single TikTok review of Pechka currently ranks in Google for "russian food delivery dubai".
4. Six-month link and press plan: month 1, listings and profiles (Section 4); month 2, ten free citations (TripAdvisor, Zomato, Restaurant Guru, 2GIS, Foursquare, Yellow Pages UAE, UAEThrive, Wanderlog, HiDubai, Visit Dubai partner listing); months 2 to 3, pitch the lists in Section 3.5 plus Russian Emirates and two Russian Telegram channels, and offer tastings to five bloggers; months 3 to 4, partner links (suppliers, the SOL Avenue and Cuisinette operators, building directories, Russian school and community sponsorships, Dubai Chamber); months 4 to 6, link-worthy content (a Russian food glossary, "plov vs pelmeni", a New Year menu guide). Once three independent press mentions exist, create a Wikidata item and request a Google Knowledge Panel.
5. Note that Bayut's "Best Russian Restaurants in Dubai" page is dead (HTTP 410) yet still ranks; pitch them a replacement guide with Vkusno as a source.

---

## 10. Action plan by phase

### Phase 0: this week, owner and managers, no developer, free

- Decide the true opening hours per kitchen.
- Claim and complete five Google Business Profiles (Section 4.4). Create Cuisinette and Silicon Oasis.
- Start replying to Google reviews and launch the review-request routine.
- Claim Bing Places (import from Google), Yango/Yandex Business, correct Dubiznes, contact Talabat and Deliveroo about branch names and stale listings.
- Confirm halal status wording, parking facts per kitchen, seating capacity, catering minimums. The content in Section 8 cannot be published without these.
- Reserve @vkusnodxb on Telegram and YouTube; post on Instagram again.

### Phase 1: weeks 1 to 2, developer

- Pre-render all pages (Section 7.2).
- Redirects, www, real 404s, root redirect, og:image, icons, security headers (Section 7.3).
- Google Search Console (verify, submit sitemap, request indexing of home, menu, contact, FAQ and the old /elementor-236/ so its snippet refreshes). Bing Webmaster Tools (import from Search Console, submit sitemap, IndexNow key and a deploy hook that pings all URLs, then watch the "AI Performance" report). Yandex Webmaster with the same key.
- GA4 through Tag Manager with click events per ordering app; Yandex Metrika; Microsoft Clarity.
- Homepage headline and first screen rewrite; halal line.

### Phase 2: weeks 3 to 6, writer and developer

- About, five branch pages, Delivery, Catering, Halal and dietary, Reviews (Section 8.4).
- Structured data upgrade: sameAs links, images, menu links, per-branch URLs, Google listing links, Organization details in each language.
- Dish page template rollout in EN, RU, AR; fix the "33" bug; add "Most ordered".
- Image optimisation; lazy-load the map library on pages without a map.

### Phase 3: ongoing, marketing

- Category pages, guides (one a week for ten weeks), occasions pages six weeks before each date.
- Listicle and press outreach; creator tastings; Russian-language media and Telegram.
- Monthly review of Google review scores per kitchen, Search Console, Bing AI Performance, and a manual check of eight queries in ChatGPT, Gemini, Perplexity and Google AI Mode (screenshots).

---

## 11. How to measure progress

| Signal | Where | Target in 90 days |
|---|---|---|
| Pages Google has indexed | Search Console, Pages report | From 2 to 250+ |
| Pages Bing has indexed | Bing Webmaster Tools, Site Explorer | From 4 to 250+ |
| Old URLs gone | Search for `site:vkusno.ae elementor` | 0 results |
| Google rating per kitchen | Google Maps | Above 4.0 on all five |
| Google reviews per kitchen | Google Maps | +100 each |
| Copilot citations | Bing Webmaster Tools, AI Performance report | Any citations at all |
| Editorial mentions | Search "Vkusno" in FACT, Time Out, Colife, Dubai OFW | 3+ lists |
| Brand-name test | ChatGPT, Gemini, Perplexity: "best Russian food delivery in Dubai" | Vkusno named in 2 of 3 |
| Ordering clicks per app | GA4 events | Baseline established |
| Robot test | `curl -A GPTBot https://vkusno.ae/en/menu/russian-borscht` | Response contains "Borscht" |

---

## 12. What could not be verified, and how this audit was done

**Method.** A main auditor fetched the site as seven different robots, rendered seven pages in a headless browser, read every JavaScript bundle and text file, ran Lighthouse locally, checked Google Maps for every kitchen, and then launched nine specialist research agents (Google visibility, Bing index, AI engines, local listings, authority and links, competitors, video fact-check, technical deep-dive, content and keywords), each followed by an adversarial verifier instructed to try to disprove the researcher's claims.

**What ran and what did not.** Eight of the nine researchers completed. Two verifiers (Bing index; AEO fact-check) completed and confirmed or refined every claim they checked. The local-listings researcher, six verifiers and a final "what is missing" critic did not run because the account's monthly spend limit was reached mid-audit. The local-listings gap was filled directly by the main auditor (Section 4). Findings from the Google-visibility, competitor, authority, content and AI-engines researchers are therefore single-source unless the main auditor also observed them directly; the technical findings were all reproduced directly.

**Known limits.**

- Google rankings were collected with a search tool located in the United States. UAE users see a local map pack and slightly different orderings. Index status (which pages exist) does not depend on location.
- Google.com, Bing.com, DuckDuckGo, Perplexity, Ecosia and Startpage blocked or degraded automated access. Bing data came through Yahoo (Bing-powered) and Bing Maps' data endpoint; Brave was read directly; Google Maps was read in a real browser.
- No ChatGPT, Gemini or Claude conversation was run; Section 3.5 is an inference from the sources those tools use.
- Numbers marked "reported" (Talabat branch review counts of 9,399 and 17,396, Instagram and competitor follower counts, competitor Google ratings via Restaurant Guru) came from search snippets or third-party pages and may be weeks old.
- Deliveroo, TripAdvisor, Time Out Dubai, Zomato (search), Restaurant Guru (for Vkusno), Foursquare, 2GIS and Facebook block robots, so Vkusno's presence and ratings there could not be confirmed.
- Domain authority scores (Ahrefs, Semrush, Moz) were not retrievable; only Majestic's free counts were.
- Google PageSpeed Insights' shared quota was exhausted, so Lighthouse was run locally instead (same engine, lab conditions, no real-user field data).
- Whether an IndexNow key or Bing verification exists cannot be proven from outside because every unknown address returns "200 OK"; check inside Bing Webmaster Tools.
- One verifier reported that the raw HTML lacks an og:description; the main auditor's direct fetch shows it is present. The report uses the direct observation.
- Halal certification status, parking, seating capacity, catering terms and the true opening hours per kitchen are unknown to the audit and must come from the owner.

---

## 13. Glossary

- **SEO (search engine optimisation):** making a website easy for Google and Bing to find, read and trust so it appears in search results.
- **AEO (answer engine optimisation), also GEO:** making a business likely to be named inside AI-generated answers (ChatGPT, Gemini, Claude, Perplexity, Google AI Overviews, Copilot).
- **Crawler / robot / bot:** the automated program a search engine or AI company uses to read websites. Googlebot, Bingbot, GPTBot, ClaudeBot and PerplexityBot are examples.
- **Index / indexed:** the search engine's stored copy of a page. If a page is not indexed, it cannot appear in results.
- **Client-side rendering / JavaScript-only site:** the page arrives empty and a program in the browser draws the content. Humans see everything; most robots see nothing.
- **Pre-rendering / SSR (server-side rendering):** producing the finished HTML on the server or at build time so robots and humans receive the complete page.
- **HTML shell:** the small empty page a client-side-rendered site sends before its program runs.
- **Sitemap:** an XML file listing every address on the site for search engines.
- **robots.txt:** a text file telling robots which parts of a site they may read.
- **Canonical tag:** a tag that tells search engines which address is the official one when several addresses show the same content.
- **hreflang:** tags that tell search engines which page is the English, Russian or Arabic version of the same content.
- **Structured data / JSON-LD / schema:** machine-readable facts embedded in a page (business name, address, hours, menu prices) in a format search engines understand.
- **sameAs:** a structured-data field listing your official profiles (Instagram, Google Maps, Talabat) so engines can connect them to your business.
- **Google Business Profile (GBP):** your free Google Maps listing: name, address, hours, photos, reviews, category. Google's AI features rely on it for local recommendations.
- **NAP:** Name, Address, Phone. Keeping them identical everywhere is a core local-search signal.
- **Soft 404:** a missing page that answers "200 OK" instead of "404 Not Found". Search engines treat this as a fault.
- **301 / 308 redirect:** a permanent forwarding instruction from an old address to a new one that also passes on the old address's reputation.
- **Open Graph (og:) tags:** the title, description and image shown when a link is shared on WhatsApp, Facebook or Slack.
- **IndexNow:** a free way to tell Bing, Yandex and others that a page changed.
- **Zero-click search:** a Google search that ends without the user clicking any result, usually because the answer was shown on the results page.
- **AI Overview / AI Mode:** Google's AI-written answer boxes at the top of results, and its chat-style search mode.
- **Lighthouse / Core Web Vitals:** Google's page-speed and quality tests; LCP is how quickly the main image appears, CLS is how much the page jumps while loading.
- **Backlink / referring domain:** a link to your site from another website, and the count of distinct websites linking to you.
- **Listicle:** an editorial "best of" article. AI assistants draw heavily on these.
- **Knowledge Panel / Wikidata:** the information card Google shows for a recognised entity, and the open database it often reads it from.
- **Aggregator:** a delivery marketplace such as Talabat, Deliveroo, Careem, Noon Food or Keeta.
- **GA4 / Tag Manager:** Google's free analytics product and the tool used to install it and track button clicks.

---

*Key sources read for Section 2 and 3: SparkToro/Datos 2024 and SparkToro/Similarweb 2026 zero-click studies; Bain & Company, February 2025; OpenAI bot documentation (developers.openai.com/api/docs/bots); Search Engine Land / RESONEO ChatGPT retrieval study, July 2026; Anthropic and Perplexity crawler documentation; Google Search Central (JavaScript SEO basics, AI features guidance, structured-data documentation, changelog entries of 8 May and 15 June 2026); Vercel and MERJ, "The rise of the AI crawler"; IndexNow documentation and FAQ; Princeton GEO paper (arXiv 2311.09735, KDD 2024); Ahrefs AI brand-visibility correlations, December 2025; Peec AI via Search Engine Land, March 2026; Steady Demand local AI citation study, August 2026; Bing Webmaster Blog, February 2026 (AI Performance report). All site measurements were taken on 10 September 2026.*
