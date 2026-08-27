import type { CaseStudy } from "@/content/types";

const study: CaseStudy = {
  slug: "pickleball",
  title: "Six products, one system",
  org: "Pickleball.com",
  year: "2024 – present",
  role: "Senior Product Designer",
  tint: "green",
  tier: "flagship",
  gated: true,
  summary:
    "Pickleball.com, Tournaments, Team Leagues, Leagues, Clubs and World Pickleball Rankings: six products across consumer surfaces, operational tools and mobile. I do the UX architecture and the interface design, and I'm the one making sure a card on one product behaves like a card on the other five.",
  facts: [
    { label: "Role", value: "Senior Product Designer" },
    { label: "Team", value: "Product, Engineering, Design — remote" },
    { label: "Timeline", value: "Feb 2024 – present" },
    { label: "Platform", value: "Web, mobile, admin tools" },
    { label: "Tools", value: "Figma" },
  ],
  cover: "cover",
  sections: [
    {
      heading: "The problem with six products",
      blocks: [
        {
          type: "p",
          text: "Pickleball.com is six products: Pickleball.com itself, Tournaments, Team Leagues, Leagues, Clubs and World Pickleball Rankings. Some are consumer surfaces. Some are operational tools for the people who run events. Some are mobile. They were built for different jobs, and products built for different jobs drift.",
        },
        {
          type: "p",
          text: "Drift is cheap to start and expensive to keep. A card gets designed slightly differently on each surface. Search behaves one way in Tournaments and another way in Clubs. Engineering builds the same thing more than once. Players learn the same thing more than once.",
        },
        {
          type: "p",
          text: "The constraint is that nothing stops. The team is remote, the products ship continuously, and nobody pauses six products to rebuild them on one foundation. So the system has to be built inside feature work, one decision at a time, while the features still land on time.",
        },
        {
          type: "stat",
          items: [
            { value: "6", label: "products, one system" },
            { value: "3", label: "core surfaces rebuilt as V2: Search, Homepage, Listings" },
          ],
        },
        {
          type: "list",
          items: [
            "pickleball.com — the core consumer surface, and its native mobile app",
            "pickleballtournaments.com — home, search and detail pages, plus the Admin area",
            "pickleballleagues.com and Team Leagues — both the public side and the admin tools behind it",
            "pickleballclubs.com — clubs, aligned to the same card and search system",
          ],
        },
      ],
    },
    {
      heading: "What “one system” actually means",
      blocks: [
        {
          type: "p",
          text: "It isn't one Figma library. A library is a place to put things; a system is an agreement about how things behave. I work to three layers.",
        },
        {
          type: "list",
          items: [
            "Shared components. A card is a card, whether it holds a tournament, a club or a league. Same anatomy, same states, same spacing.",
            "Shared type. One scale, one set of weights, so a heading carries the same weight of importance on every surface.",
            "Shared behaviour. What tapping does, how a filter applies, what an empty state says. This is the layer people notice when it's wrong and never notice when it's right.",
          ],
        },
        {
          type: "p",
          text: "That alignment runs across Clubs, Team Leagues, Checkout & Registration and the Manage areas, with Reservations, Head-to-Head and Clinics in progress. The working rule: design the instance first, then ask whether it's a pattern. Most things aren't. The ones that are get promoted into the shared set, and the instance gets replaced by it.",
        },
      ],
    },
    {
      heading: "Cards and search, shared",
      blocks: [
        {
          type: "p",
          text: "The two components that earn their keep are the card and the search. Both are mine, and both are adopted across multiple surfaces. Every surface that adopts them is one fewer design to maintain and one fewer implementation to build, which is the whole argument for a system in one sentence.",
        },
        {
          type: "p",
          text: "The biggest application was the V2 of the core consumer surfaces: Search, Homepage and Listings. The initial scope was narrower. I expanded it, because search, the listings it returns and the homepage that leads into them are one journey for a player, and improving one on its own would have left the seams showing. The goals were discoverability, perceived value, and consistency across products.",
        },
        {
          type: "p",
          text: "The public, NDA-safe evidence is on pickleballtournaments.com: the updated home page, search and detail pages, plus the Admin area.",
        },
        {
          type: "p",
          text: "[NEEDS: one before/after of Search or Listings — the old screen, the V2 screen, and the one thing that changed for players]",
        },
      ],
    },
    {
      heading: "Documentation that outlived me",
      blocks: [
        {
          type: "p",
          text: "The Figma structure started as a filing habit. Sections, so a file has a shape you can scan. Naming, so a frame can be found by what it is. Annotations beside the frame, where an engineer will actually read them, so the reasoning travels with the design instead of living in a document nobody opens.",
        },
        {
          type: "p",
          text: "It became the team-wide standard. Files I've never touched now follow it, which is the only test that counts: a convention is real when it survives without its author in the room. The practical effect was onboarding. A new PM or engineer can open a file cold and find the flow, the state and the reason, in that order.",
        },
        {
          type: "p",
          text: "[NEEDS: one number — how many files or designers follow the structure, or how much faster a handoff got]",
        },
      ],
    },
    {
      heading: "What's behind the password",
      blocks: [
        {
          type: "p",
          text: "Some of this work hasn't launched. Those screens sit behind a password on this page, and they stay there until the products ship. What's public is real and live: the pickleballtournaments.com home, search and detail pages, and the Admin area. If you want the rest, ask me and I'll send the password.",
        },
      ],
    },
  ],
};

export default study;
