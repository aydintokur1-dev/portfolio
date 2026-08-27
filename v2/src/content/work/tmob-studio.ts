import type { CaseStudy } from "@/content/types";

const study: CaseStudy = {
  slug: "tmob-studio",
  title: "An enterprise site, designed in the browser",
  org: "Tmob AI Studio",
  year: "2026",
  role: "Designed & built",
  tint: "yellow",
  tier: "flagship",
  link: { href: "https://tmobstudio.ai/", label: "tmobstudio.ai" },
  summary:
    "Tmob — 17 years of mobile delivery for banks and telcos — launched an AI-agentic software studio and needed a site that could sell it to enterprises. I designed and built it with Claude, no Figma at all: every design decision made in the browser, in prompts and diffs, on the real page.",
  facts: [
    { label: "Role", value: "Designed & built, solo" },
    { label: "Platform", value: "Web — Next.js + React" },
    { label: "Tools", value: "Claude Code — no Figma" },
    { label: "Client", value: "Tmob (Thinks Mobility)" },
  ],
  cover: "cover",
  sections: [
    {
      heading: "The brief",
      blocks: [
        {
          type: "p",
          text: "Tmob has spent 17 years shipping mobile products for Vodafone Pay, Paycell by Turkcell, Halkbank, CarrefourSA and Istanbulkart. Their new studio sells something harder to explain: AI-agentic software delivery, where agents do the building and the client owns the outcome. The site had to make an enterprise buyer trust that in one scroll — and it had to feel like a company that ships, not a company that demos.",
        },
        {
          type: "stat",
          items: [
            { value: "17", label: "years of delivery behind it" },
            { value: "300+", label: "projects shipped" },
            { value: "250M+", label: "daily users served" },
          ],
        },
        {
          type: "figure",
          figure: { src: "cover", caption: "The hero: one claim, two actions, and the real platform running live underneath" },
        },
      ],
    },
    {
      heading: "No Figma",
      blocks: [
        {
          type: "p",
          text: "There was no design file. I designed the site in the browser with Claude: describe the intent, read the diff, look at the running page, adjust. The design system lives in the code from the first hour — a near-black ground, one orange, a geometric sans for display and a mono for the section kickers — so there was never a handoff gap between how it looked in a mockup and how it looked shipped, because there was no mockup.",
        },
        {
          type: "p",
          text: "What Figma usually buys you — trying variants quickly — prompts buy you faster. What it costs you — the drift between artboard and build — never happens, because the artboard is the build. The trade is that every decision has to be legible in words: if I couldn't say precisely what was wrong with a section, I couldn't fix it. That constraint turned out to be the discipline.",
        },
        {
          type: "figure",
          figure: { src: "hammer-house", caption: "The positioning spread — enterprise logo marquee above, the claim in two voices below" },
        },
      ],
    },
    {
      heading: "Copy is the interface",
      blocks: [
        {
          type: "p",
          text: "A site selling AI delivery to enterprises lives or dies on its words, so the copy was designed like a component system. Every section opens with a mono kicker — WHERE OTHERS STOP, INSIDE THE LOOP, ENTERPRISE-GRADE — and one claim that could stand alone on a slide.",
        },
        {
          type: "quote",
          text: "Everyone's shipping you a faster hammer. We ship you the house.",
        },
        {
          type: "p",
          text: "The centre of the page is the loop: five numbered steps from brief to production — onboarding, build, test, feedback, sign-off — each one paired with the real platform UI beside it. Not illustrations of the product; screenshots of it running. The hero says the same thing with a button: See It Live drops you into the actual board.",
        },
        {
          type: "figures",
          figures: [
            { src: "loop", caption: "Inside the loop — five steps, with the live platform tracking alongside" },
            { src: "stack", caption: "The integration map: Tmob at the centre of the client's own SDLC toolchain" },
          ],
        },
      ],
    },
    {
      heading: "Built for a defensible release",
      blocks: [
        {
          type: "p",
          text: "Enterprise buyers don't buy velocity, they buy defensibility. So the trust section is cards, not prose: your data stays in your environment, SOC 2 / ISO 27001, full audit trail, no training on your data. Four claims a procurement team can screenshot into a slide. The page closes the way the whole pitch runs — Send the brief. We'll take it from there.",
        },
        {
          type: "figures",
          figures: [
            { src: "enterprise", caption: "The enterprise-grade cards — four claims built to survive procurement" },
            { src: "cta", caption: "The close: a costed proposal back within 24 hours" },
          ],
        },
        {
          type: "p",
          text: "[NEEDS: timeline — how long from first prompt to live — and one thing Claude got wrong that you caught and corrected]",
        },
      ],
    },
  ],
};

export default study;
