import type { CaseStudy } from "@/content/types";

const study: CaseStudy = {
  slug: "pickleball-homepage",
  title: "Four front doors, one system",
  org: "Pickleball.com Homepages",
  year: "2026",
  role: "Senior Product Designer",
  tint: "blue",
  tier: "depth",
  gated: true,
  summary:
    "The V2 of Pickleball.com's core consumer surfaces — the homepages of four of the network's six products (Tournaments, Team Leagues, Ladder Leagues and Clubs; Pickleball.com itself and Rankings don't have one yet), plus Search and Listings. The initial scope was narrower; I expanded it, because the homepage that leads into search and the listings it returns are one journey for a player, and improving one alone would have left the seams showing.",
  facts: [
    { label: "Role", value: "Senior Product Designer" },
    { label: "Scope", value: "Four homepages · Search · Listings, as one journey" },
    { label: "Status", value: "In development — the live sites still run the previous design" },
    { label: "Goals", value: "Discoverability · perceived value · consistency" },
    { label: "Products", value: "4 of 6 — Tournaments · Team Leagues · Ladder Leagues · Clubs" },
  ],
  cover: "cover",
  sections: [
    {
      heading: "The problem",
      blocks: [
        {
          type: "p",
          text: "A homepage inside a network has a harder job than most: it has to explain what the product is, surface the right entry point for very different players, and hand off into search without a seam. The old pages did the first job and quietly failed at the other two.",
        },
        {
          type: "stat",
          items: [
            { value: "1K+", label: "active tournaments on the network these pages front" },
            { value: "6K+", label: "active clubs" },
            { value: "340+", label: "active leagues" },
            { value: "50+", label: "active team leagues" },
          ],
        },
        {
          type: "p",
          text: "Take the Tournaments homepage. The first thing on the page was an ad slot, so the three buttons under it — Find a Tournament, My Tournaments, Blog — sat below a banner and lost the fight for attention. Finding a tournament, the one thing most visitors came to do, was a click and a page load away before they could type a letter. Nothing on the page belonged to the signed-in player: their own tournaments were behind a link, and invitations, a feature we had just introduced, lived only in notifications. Featured tournaments used a different card from everything else, at an aspect ratio organisers weren't asked to upload, so the artwork got cropped. And the association, partner and tour logos at the bottom were links that didn't look like links.",
        },
      ],
    },
    {
      heading: "Expanding the scope",
      blocks: [
        {
          type: "p",
          text: "The brief was the homepage. I made the case to widen it to Search and Listings in the same pass, because a player doesn't experience them as three features — they experience one attempt to find a place to play. Designing them together is what made the shared card and search components possible, and those components are now adopted across the other surfaces.",
        },
        {
          type: "decision",
          problem: "Redesigning the homepage alone would polish the entrance to an unchanged journey.",
          constraint: "Four product teams ship continuously; nothing pauses for a redesign.",
          decision: "Expand V2 to Homepage + Search + Listings as one system, built from the shared components.",
          outcome: "The attention hierarchy was validated during design with predictive attention heat maps, and the card and search components built in this pass were adopted across the platform and became the standard.",
        },
      ],
    },
    {
      heading: "Tournaments, decision by decision",
      blocks: [
        {
          type: "p",
          text: "The Tournaments homepage was the first one through, and it set the pattern the other product homepages follow.",
        },
        { type: "h3", text: "Search where the intent is" },
        {
          type: "decision",
          problem: "Find a Tournament was a button. The search itself lived on another page.",
          constraint: "The full search page, with its filters and map, had to stay the destination for anything beyond a quick lookup.",
          decision: "A quick-search field in the header — name, city, state or zip — with the search button still leading to the full search page.",
          outcome: "The most common task starts on the homepage instead of one click later.",
        },
        { type: "h3", text: "Fix the hierarchy, keep the ad" },
        {
          type: "decision",
          problem: "The ad slot was the first element on the page, and a heavy creative made the buttons under it almost invisible.",
          constraint: "The ad couldn't go — it just couldn't go first.",
          decision: "A header with an image behind it — AI-generated in the product's own colours, with enough movement to feel alive — carrying the title, the actions and the search. The ad moves directly below it.",
          outcome: "Every element in the header reads clearly — checked against predictive attention heat maps before handoff. The ad is still above the fold; it just isn't the headline.",
        },
        { type: "h3", text: "Make the page theirs" },
        {
          type: "decision",
          problem: "A signed-in player saw the same page as a stranger. Their tournaments were behind My Tournaments; invitations only surfaced as notifications.",
          decision: "Two personal rows at the top of the body: My tournaments — live, upcoming and next — and My invitations, from friends and from players looking for a partner.",
          outcome: "The homepage becomes the player's own. Invitations get a home for the first time instead of being something you notice in a badge.",
        },
        { type: "h3", text: "One card, one aspect ratio" },
        {
          type: "decision",
          problem: "Featured tournaments used their own card, at an aspect ratio organisers weren't asked to upload. Artwork got cut.",
          decision: "Featured tournaments use the same card as everything else, at the ratio we already ask for. What makes them featured is a banner area behind the section, with the first row of cards sitting half on it.",
          outcome: "No more cropped artwork, one card system for the whole page, and the featured section still stands out.",
        },
        { type: "h3", text: "PPA Tour & MLP" },
        {
          type: "decision",
          problem: "The pro tour section looked old next to the rest of the page.",
          decision: "A new banner with AI-created player imagery for the section, and glass-effect cards over it for the events.",
          outcome: "The section looks current, and the imagery gives it the engagement a flat band never had.",
        },
        { type: "h3", text: "If it's clickable, it looks clickable" },
        {
          type: "decision",
          problem: "The association, partner and tour logos were links with no hover state. Even I hadn't realised they were clickable.",
          decision: "A hover state for every clickable item on the page, the logo grids included.",
          outcome: "One rule, applied everywhere: nothing interactive is a surprise.",
        },
      ],
    },
    {
      heading: "One system, four products",
      blocks: [
        {
          type: "p",
          text: "Tournaments, Team Leagues, Ladder Leagues and Clubs are different products with different content — an event, a season, a ladder, a place. They don't get four designs. Every one of them follows the same logic, built from the same components: the header with the image and the quick search, the ad below it, the player's own rows first, the featured banner with the first row of cards sitting on it, the standard card at the standard ratio, the pro-tour and association sections, hover on everything clickable.",
        },
        {
          type: "p",
          text: "That matters because players don't stay in one product. Someone who enters a tournament also plays in a ladder and belongs to a club, and the network hands them from one to the next constantly. When each homepage works the same way, moving between them costs nothing to learn — it reads as one product with four front doors rather than four products that happen to share a logo. And for the team, a component built for Tournaments is already built for the other three.",
        },
        {
          type: "decision",
          problem: "Four homepages, historically designed one at a time, drifting apart.",
          constraint: "Each product has its own team, its own content model and its own release schedule.",
          decision: "One page logic and one component set, with each product changing only what its content requires — the cards' fields, the sections that apply to it.",
          outcome: "A player recognises every homepage on the first visit. New surfaces inherit the system instead of restarting it.",
        },
      ],
    },
    {
      heading: "Where it stands",
      blocks: [
        {
          type: "p",
          text: "Handed off and in development; the live sites still run the previous design. Here are the four homepages, top to bottom. Scroll any one of them and you're reading the same page; the differences are the product's.",
        },
        {
          type: "figure",
          figure: { src: "tournaments", caption: "Tournaments — header with quick search, ad moved below, my tournaments and invitations, featured banner, PPA Tour & MLP, tours and series", frame: "full" },
        },
        {
          type: "figure",
          figure: { src: "team-leagues", caption: "Team Leagues — header with quick search, ad moved below, my leagues and invitations, featured leagues, MLP, associations and partners", frame: "full" },
        },
        {
          type: "figure",
          figure: { src: "ladder-leagues", caption: "Ladder Leagues — header with quick search, ad moved below, my leagues and invitations, featured leagues and what's playing now", frame: "full" },
        },
        {
          type: "figure",
          figure: { src: "clubs", caption: "Clubs — header with keyword and location search, ad moved below, my events and invitations, trending clubs nearby, featured clubs", frame: "full" },
        },
      ],
    },
  ],
};

export default study;
