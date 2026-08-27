import type { CaseStudy } from "@/content/types";

const study: CaseStudy = {
  slug: "akbank-wings",
  title: "A national bank's UI, refreshed in a week",
  org: "Akbank Wings",
  year: "2022",
  role: "UI/UX Designer",
  tint: "pink",
  tier: "range",
  summary:
    "Akbank is one of the biggest banks in Türkiye, with around 18 million customers. I was part of the team refreshing the outdated UI of the bank's Wings website — with one week on the clock, and new client-requested features landing mid-flight.",
  facts: [
    { label: "Role", value: "UI/UX Designer, agency team" },
    { label: "Timeline", value: "1 week" },
    { label: "Client", value: "Akbank — ~18M customers" },
    { label: "Platform", value: "Web" },
  ],
  cover: "banner",
  sections: [
    {
      heading: "The brief",
      blocks: [
        {
          type: "p",
          text: "Akbank is one of the biggest banks in Türkiye, with around 18 million customers. The Wings site's UI had aged out of the brand, and the team I was part of was asked to bring it current. The deadline was one week — tight for any redesign, and tighter for a bank, where nothing ships on vibes.",
        },
        {
          type: "stat",
          items: [
            { value: "18M", label: "customers behind the brand" },
            { value: "1", label: "week, brief to delivery" },
          ],
        },
      ],
    },
    {
      heading: "The constraint",
      blocks: [
        {
          type: "p",
          text: "Halfway in, the client added new features to the scope. With a week in total, there was no room to renegotiate the plan — the design had to absorb the additions without the existing pages drifting. That meant deciding early which patterns were fixed and which could flex.",
        },
        {
          type: "figure",
          figure: { src: "ui-2", caption: "The refreshed UI — hero and card system" },
        },
      ],
    },
    {
      heading: "What shipped",
      blocks: [
        {
          type: "p",
          text: "The redesign shipped on time and was accepted by the client as delivered: a more modern, more usable surface, consistent with where the brand was going rather than where it had been.",
        },
        {
          type: "figures",
          figures: [
            { src: "ui-3", caption: "Content sections, restructured" },
            { src: "ui-4", caption: "The full page system" },
          ],
        },
      ],
    },
  ],
};

export default study;
