import type { CaseStudy } from "@/content/types";

const study: CaseStudy = {
  slug: "volgen",
  title: "Research to live in three days",
  org: "VOLGEN",
  year: "2026",
  role: "Designed & built",
  tint: "yellow",
  tier: "flagship",
  link: { href: "https://www.volgen.ai/", label: "volgen.ai" },
  summary:
    "An AI video production studio needed a site. I used NotebookLM for the competitor analysis and the information architecture, then built it in Antigravity with Gemini 3 Pro and Claude Opus 4.5: Next.js, bilingual Turkish and English, with a CRM pipeline behind it. Research to live in three days.",
  facts: [
    { label: "Role", value: "Designed & built, solo" },
    { label: "Timeline", value: "3 days, research to live" },
    { label: "Platform", value: "Web — Next.js + React, TR/EN" },
    { label: "Tools", value: "NotebookLM · Antigravity (Gemini 3 Pro, Claude Opus 4.5)" },
  ],
  cover: "cover",
  sections: [
    {
      heading: "The brief",
      blocks: [
        {
          type: "p",
          text: "VOLGEN is an AI video production studio. It takes an idea, a word, a feeling, and turns it into cinematic scenes, digital characters and campaigns, bringing in traditional production where that adds something. It needed a site that said this plainly, showed the work, and turned an enquiry into a lead without anyone copying it out of an inbox. In Turkish and English. Quickly.",
        },
        {
          type: "stat",
          items: [
            { value: "3", label: "days, research to live" },
            { value: "2", label: "languages, one structure" },
            { value: "10", label: "physics pills you can throw around" },
          ],
        },
        {
          type: "p",
          text: "The constraint was time, and the bet was that time on a site like this mostly goes to the wrong things: re-reading competitor sites, arguing about section order, hand-writing boilerplate. Models are good at exactly those. So the plan was to hand the mechanical work to AI and keep every decision.",
        },
      ],
    },
    {
      heading: "Day one: research in NotebookLM",
      blocks: [
        {
          type: "p",
          text: "I loaded the competitor material into NotebookLM and used it as a reading partner, not an oracle. What does every studio site say? What does none of them say? Where does the work sit, relative to the pitch? NotebookLM answers questions against a fixed set of sources and has no opinions of its own, which is the right division of labour for research.",
        },
        {
          type: "p",
          text: "What came out was the information architecture: Home, About, Services, Work, Contact. Five items, because a studio site is a portfolio with a phone number attached — and only two of them are routes; Services, Work and Contact live as anchors on one long home page. Which of the five carries the weight, and in what order, was my call, not the model's.",
        },
        {
          type: "figure",
          figure: { src: "hero", caption: "The hero: a WebGL scene, Outfit at 96px, one acid-lime accent on near-black" },
        },
      ],
    },
    {
      heading: "Day two: the build in Antigravity",
      blocks: [
        {
          type: "p",
          text: "Next.js, built in Antigravity with Gemini 3 Pro and Claude Opus 4.5. The split was simple. The agents wrote most of the code. I decided what the code should do: the component boundaries, how Turkish and English share one structure, and what happens when someone sends an enquiry.",
        },
        {
          type: "p",
          text: "That last one matters more than it sounds. A studio site's only job, after looking good, is to turn interest into a conversation. So enquiries feed a CRM pipeline behind the site — set up in the same three days as the pages around it — with the content managed through a login-gated CMS rather than redeploys. [NEEDS: one sentence on how the CRM flow actually runs — what happens after someone writes to hello@volgen.ai]",
        },
        {
          type: "p",
          text: "Bilingual is a design decision, not a translation task. Turkish runs longer than English and breaks in different places, so every text container has to hold both without the layout changing — the EN/TR toggle is a segmented pill in the nav, and flipping it is the fastest QA tool the site has. Designing and building at the same time is what made that cheap: I could put the two languages side by side and adjust the component, instead of annotating a Figma file for someone else to interpret.",
        },
        {
          type: "figures",
          figures: [
            { src: "services", caption: "Services — Space Grotesk labels, letter-spaced caps" },
            { src: "works-grid", caption: "The works grid: eight videos, posters lazy-loaded" },
          ],
        },
      ],
    },
    {
      heading: "Day three: the human parts",
      blocks: [
        {
          type: "p",
          text: "With the structure standing, the last day went on the things a template never has. At the bottom of the home page, ten labelled pills — HYBRID, FILMCRAFT, MOTION CONTROL, STORYTELLING and six more — drop into the contact section under a rigid-body physics simulation. They fall, collide, and stack against an invisible floor; every load settles into a different pile, and you can pick one up and knock the others around. It renders on desktop only — on a phone there is no room to play, so it simply isn't there.",
        },
        {
          type: "figures",
          figures: [
            { src: "pills-settle", caption: "The pile at rest — a different arrangement on every load" },
            { src: "pills-drag", caption: "Mid-drag: CREATIVE TECHNOLOGY lifted out, the pile disturbed" },
          ],
        },
        {
          type: "quote",
          text: "Moving fast shouldn't mean losing the human parts.",
        },
        {
          type: "p",
          text: "Those pills are the part I actually care about. They cost a few hours, and they're the difference between a site that was generated and a site that was made. Elsewhere: a WebGL hero, a script-to-screen section that shows two scripts exactly as written — a morning in an Istanbul neighbourhood, a stadium going quiet — and a works grid holding a dozen film pieces.",
        },
        {
          type: "figure",
          figure: { src: "script-to-screen", caption: "Script to screen — the copy is the design" },
        },
      ],
    },
    {
      heading: "What broke",
      blocks: [
        {
          type: "p",
          text: "Three days with agents writing most of the code means most of my time went on reading, not typing. The models are fast and confident, and confident is the dangerous part: the mistakes aren't syntax errors, they're plausible components that do slightly the wrong thing. The defence is to read every diff as if a junior had written it, and to run the site in both languages after every change.",
        },
        {
          type: "p",
          text: "[NEEDS: the one thing that actually broke — what the agent got wrong, how you caught it, and what you changed]",
        },
        {
          type: "p",
          text: "What I'd do differently: write the bilingual content first and build against the longer language. And build the CRM flow before the pages, not after. It's the part with the most ways to fail quietly.",
        },
      ],
    },
  ],
};

export default study;
