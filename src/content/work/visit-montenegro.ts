import type { CaseStudy } from "@/content/types";

const study: CaseStudy = {
  slug: "visit-montenegro",
  title: "An editorial approach to destination browsing",
  org: "Visit Montenegro",
  year: "2023",
  role: "Self-initiated",
  tint: "green",
  tier: "range",
  summary:
    "A self-initiated concept for a national tourism site, made while I was living in Montenegro. Display serif type over full-bleed photography, three ways in — places, events, a film — and very little else. No research, no client: an exercise in editorial restraint, and in letting a country speak for itself.",
  facts: [
    { label: "Role", value: "Self-initiated concept" },
    { label: "Timeline", value: "2023" },
    { label: "Platform", value: "Web, desktop concept" },
    { label: "Tools", value: "Figma" },
  ],
  cover: "visit-monte",
  sections: [
    {
      heading: "The idea",
      blocks: [
        {
          type: "p",
          text: "I was living in Montenegro and kept thinking the same thing: a country this beautiful deserves a site that tells you everything it has. Visit Montenegro is that site, as a concept. It exists to help a visitor learn about the country and plan a trip: the coastline and the beaches, the history and culture, and the things you can actually do once you're there.",
        },
        {
          type: "figure",
          figure: { src: "image1", caption: "The opening screen: one word, one photograph, two short paragraphs." },
        },
      ],
    },
    {
      heading: "The editorial aesthetic",
      blocks: [
        {
          type: "p",
          text: "The decision was to treat it like a magazine, not a brochure. One display serif, set huge, across a single full-bleed photograph. A near-black ground, so the images carry all the colour. Copy kept to a few lines, placed where a magazine would put a standfirst. The navigation is four words: Home, Places, Events, FAQ.",
        },
        {
          type: "p",
          text: "Below the fold, three ways in. Places to see, as a row of large cards: beaches, mountains, camps. Upcoming events with filter chips for concerts, festivals, cultural, nature and family events, so the page is useful on a specific weekend and not only as inspiration. And a film, because for a destination the moving image does more than any paragraph.",
        },
        {
          type: "figure",
          figure: { src: "image2", caption: "Places to see: three large cards, one line of copy each." },
        },
        {
          type: "figure",
          figure: {
            src: "image4",
            caption: "Upcoming events with filter chips: a concert, a carnival, a week of rafting on the Tara.",
          },
        },
        {
          type: "figure",
          figure: { src: "image3", caption: "The film, framed and given the whole width." },
        },
        {
          type: "figure",
          figure: {
            src: "image5",
            size: "inset",
            caption: "The footer: the same four words, and a back-to-top link.",
          },
        },
      ],
    },
    {
      heading: "What it was for, and what it taught",
      blocks: [
        {
          type: "p",
          text: "This was practice, and I'd rather say so than dress it up. No research, no users, no client. What I wanted to learn was how far typography and photography can carry a page when you refuse to add anything else, and what a display serif needs at that size: tight tracking, patient spacing, and a photograph with somewhere quiet for the word to sit.",
        },
        {
          type: "p",
          text: "Two lessons stuck. Editorial layouts are only as good as their weakest image and their type pairing: the serif does the mood, the sans does the work, and if either slips the page reads as a template. And the homepage is the easy part of a destination site. The page that does the planning, a single place with how to get there, when to go and what it costs, is where the real design problem lives. That's the page I'd design first if I picked this up again.",
        },
      ],
    },
  ],
};

export default study;
