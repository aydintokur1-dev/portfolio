import type { CaseStudy } from "@/content/types";

const study: CaseStudy = {
  slug: "pickleball-apps",
  title: "Two apps, two platforms, every screen designed once",
  org: "Pickleball Native Apps",
  year: "2026 – present",
  role: "Senior Product Designer",
  tint: "lavender",
  tier: "depth",
  gated: true,
  summary:
    "The Leagues app and the Pickleball.com app started on the same day, and most of their screens were the same screens. So Baysal Sümer and I designed the shared pages once as common components, then built a native iOS library and a Material 3 library so every page lands in both platforms' own idiom. The same common screens and components will carry a third app, Pickleball Tournaments. It began as a port of the desktop; it ended with upper management asking the desktop to catch up to it.",
  facts: [
    { label: "Role", value: "Senior Product Designer" },
    { label: "With", value: "Baysal Sümer — the two of us built both libraries" },
    { label: "Scope", value: "Leagues app · Pickleball.com app · Tournaments app (next) · common screens · shared components" },
    { label: "Platform", value: "Native iOS · Android (Material 3)" },
    { label: "Status", value: "In development — not yet released" },
  ],
  cover: "cover",
  sections: [
    {
      heading: "The problem",
      blocks: [
        {
          type: "p",
          text: "Pickleball.com is a network of products, and the plan was never just one app. When we started, two were already in flight — a Leagues app and a Pickleball.com app — with a Pickleball Tournaments app next in line, and more expected to follow. Laid side by side, their screen lists overlapped almost entirely: a dashboard, notifications, player search, the player profile, invites, head-to-head. Designed app by app, every one of those pages would be drawn, reviewed and rebuilt once per app, and the apps would drift apart the moment one team moved faster than the other.",
        },
        {
          type: "p",
          text: "Then a second decision came down: the apps would be native, with iOS and Material 3 designs rather than one cross-platform look. That doubled the surface again. Two apps, two platforms, a small team — the only way the maths works is if a page is designed once and inherited everywhere.",
        },
        {
          type: "stat",
          items: [
            { value: "3", label: "apps on one set of common screens — Leagues, Pickleball.com, Tournaments" },
            { value: "2", label: "native platforms — iOS and Material 3" },
            { value: "1", label: "design per page, shared by every app" },
          ],
        },
      ],
    },
    {
      heading: "Common screens, not common apps",
      blocks: [
        {
          type: "p",
          text: "We separated what is the product from what is the company. Dashboard, notifications, player search, player profile, invites, H2H — these aren't Leagues features or Pickleball.com features; they're the account a player carries between every app, so they're built as common screens: designed once, used as-is by every app that needs them. Each app then adds only the screens that are genuinely its own — league details and player league stats for Leagues, the news and pro-tour surfaces for Pickleball.com. The Pickleball Tournaments app is next, and it starts from the same common layer.",
        },
        {
          type: "decision",
          problem: "Two apps with mostly the same pages, each on its own design track.",
          constraint: "The apps still have to feel like different products, and future apps have to be able to join without a redesign.",
          decision: "A layer of common screens shared by every app, with product-specific screens on top — all assembled from one component set.",
          outcome: "Every shared page is designed once. The Pickleball Tournaments app, the third one, starts with its dashboard, profile, search, notifications and invites already done; only the screens that are genuinely its own remain to be designed.",
        },
        {
          type: "p",
          text: "The same rule runs one level down. The pieces that appear on more than one page — score cards, event cards, player cards, the results and standings rows — are shared components, so a match result reads identically on the dashboard, on a profile, in H2H and in a league. Each of them exists in two builds, one iOS, one Material 3.",
        },
      ],
    },
    {
      heading: "Native, twice",
      blocks: [
        {
          type: "p",
          text: "The native decision meant one library wasn't enough. Baysal Sümer and I built two: an iOS library and a Material 3 library. We started from each platform's own components, customised them to the product, and where the platforms had nothing that fit — a score card, an H2H comparison, a league standings row — we designed new components by that platform's rules rather than by our own habit. Every page we delivered exists in both versions, and the pairs below are the proof: the same content, the same hierarchy, and the details each platform's users already know — the segmented control against the tabs, the grouped inset cards against the tonal surfaces, iOS's back chevron against Material's arrow.",
        },
        {
          type: "decision",
          problem: "Leadership wanted the apps to feel native on each platform, not like one design wearing two icons.",
          constraint: "Two designers, and every page already has to serve two apps.",
          decision: "Two component libraries built side by side, each following its platform's rules — customised where the platform had a component, invented where it didn't.",
          outcome: "One design decision per page, two native renderings of it. Neither platform's users get the other's conventions.",
        },
      ],
    },
    {
      heading: "The colour problem",
      blocks: [
        {
          type: "p",
          text: "Every product in the network has its own accent colour, and the common screens had to survive all of them. Leagues was the hard case: it holds both Team Leagues and Ladder Leagues, and each has its own accent. Choosing one would have made the app look like it belonged to half of itself, so the Leagues app uses neither — its chrome is neutral black and white, and the product accents appear only where they mean something, on the Team and Ladder tags. The Pickleball.com app takes the network's purple.",
        },
        {
          type: "p",
          text: "The common screens take the accent of whichever app they're rendered in. That left one trace of history: the Leagues app's original accent was pink, and some of the earliest common screens were drawn in it. Rather than repaint the files, we documented the final accents for the mobile team, who updated their colour lists — the screens are tokenised, so the accent is an implementation detail rather than a redesign.",
        },
        {
          type: "decision",
          problem: "Leagues contains two products with two accent colours; the common screens have to work for every product.",
          decision: "Neutral black and white for Leagues, purple for Pickleball.com, and accent as a per-app token on the common screens.",
          outcome: "No product is the poor sibling inside its own app, and the common screens recolour per app without a second design.",
        },
      ],
    },
    {
      heading: "When the direction flipped",
      blocks: [
        {
          type: "p",
          text: "The brief at the start was to follow the desktop: the web was the source of truth and mobile was the port. But a phone is a different place to read a player. Along the way we added what the small screen asked for — a dashboard that leads with the player's own ratings and achievements, top partners and top nemeses from the current session, a rank summary per league, a head-to-head with the event breakdown underneath, per-season league stats with the differentials charted. None of that existed on the desktop.",
        },
        {
          type: "p",
          text: "By the end of the project the mentality had reversed. Everyone liked the new features and the new statistics, and upper management decided that everything mobile had, desktop would have too. The port became the reference.",
        },
        {
          type: "quote",
          text: "It started as ‘match the desktop’. It ended as ‘bring the desktop up to the apps’.",
        },
      ],
    },
    {
      heading: "Where it stands",
      blocks: [
        {
          type: "p",
          text: "Designed and handed off; the apps are in development and not yet released. Each pair is the same page: iOS on the left, Material 3 on the right. Scroll the frames — the differences are the platform's; the content, hierarchy and components are shared.",
        },
        { type: "h3", text: "Two homes" },
        {
          type: "figures",
          figures: [
            { src: "leagues-home-ios", caption: "Leagues app home — iOS. Neutral chrome, invites first, countdown to the next game day, rank summary" },
            { src: "leagues-home-m3", caption: "Leagues app home — Material 3" },
          ],
        },
        {
          type: "figures",
          figures: [
            { src: "pb-home-ios", caption: "Pickleball.com app home — iOS. Purple accent, live match, top players, player dynamics" },
            { src: "pb-home-m3", caption: "Pickleball.com app home — Material 3" },
          ],
        },
        { type: "h3", text: "Common screens" },
        {
          type: "figures",
          figures: [
            { src: "dashboard-ios", caption: "My dashboard — iOS. Ratings, achievements, schedule, play history, rankings, gear" },
            { src: "dashboard-m3", caption: "My dashboard — Material 3" },
          ],
        },
        {
          type: "figures",
          figures: [
            { src: "profile-ios", caption: "Player profile — iOS. Standings, team, sponsors, articles, latest events" },
            { src: "profile-m3", caption: "Player profile — Material 3" },
          ],
        },
        {
          type: "figures",
          figures: [
            { src: "h2h-ios", caption: "Head to head — iOS. Two players, the record, then every meeting" },
            { src: "h2h-m3", caption: "Head to head — Material 3" },
          ],
        },
        {
          type: "figures",
          figures: [
            { src: "search-ios", caption: "Player search — iOS" },
            { src: "search-m3", caption: "Player search — Material 3" },
          ],
        },
        {
          type: "figures",
          figures: [
            { src: "invites-ios", caption: "Invites — iOS. Ladder and Team tags carry the product accents; the app doesn't" },
            { src: "invites-m3", caption: "Invites — Material 3" },
          ],
        },
        {
          type: "figures",
          figures: [
            { src: "notifications-ios", caption: "Notifications — iOS. Filtered by product, grouped by time" },
            { src: "notifications-m3", caption: "Notifications — Material 3" },
          ],
        },
        { type: "h3", text: "Leagues-only screens" },
        {
          type: "figures",
          figures: [
            { src: "league-ios", caption: "League detail — iOS. Session switcher, overview / standings / schedule, top players, player dynamics" },
            { src: "league-m3", caption: "League detail — Material 3" },
          ],
        },
        {
          type: "figures",
          figures: [
            { src: "league-stats-ios", caption: "Player league stats — iOS. Season ranking, matches, differentials charted" },
            { src: "league-stats-m3", caption: "Player league stats — Material 3" },
          ],
        },
      ],
    },
  ],
};

export default study;
