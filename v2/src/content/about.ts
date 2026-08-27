import type { Experience } from "./types";

export type Education = { school: string; degree: string; period: string };
export type Certification = { name: string; issuer: string; year: string; featured?: boolean };
export type Language = { name: string; level: string };

/** Approved About copy (docs/03-COPY.md). One entry per paragraph. */
export const bio: string[] = [
  "I'm Aydın — a product designer and design engineer in Istanbul.",
  "By day I'm at Pickleball.com, across six interconnected products: Pickleball.com, Tournaments, Team Leagues, Leagues, Clubs, and World Pickleball Rankings. Consumer surfaces, operational tools, mobile. My job is the UX architecture and the interface design, and keeping all six feeling like one product — the shared card and search components, the type, the behaviour. The Figma structure I introduced became the team standard, which I'm quietly pleased about.",
  "Outside that I take things from idea to launch on my own. Most recently VOLGEN: research to a live site in three days, NotebookLM for the competitor work and IA, then Antigravity with Gemini 3 Pro and Claude Opus 4.5 for the build, including a working CRM flow. The part I enjoyed most was the small stuff — dynamic text boxes, popcorn-style pills — because moving fast shouldn't mean losing the human parts.",
  "The combination is the point. Because I build, I know what actually gets made, what breaks, and where the real constraints sit. My design decisions survive contact with production instead of dying at handoff.",
  "Before this: Bild in Podgorica, where I introduced a research approach, a documentation method and a handoff process, and was promoted to Lead Designer. Agency work with corporate clients before that, and an education app used by over a million people at Morpa.",
  "Bachelor's in Communication Design from Yıldız Technical University. I do my best work in cross-functional teams with shared context, fast feedback and clear ownership. Turkish and English.",
];

export const experience: Experience[] = [
  {
    org: "Pickleball, Inc.",
    role: "Senior Product Designer",
    period: "Feb 2024 – present",
    location: "Remote",
    summary:
      "UX architecture and interface design across six interconnected products, from V2 of the core consumer surfaces (Search, Homepage, Listings) to the reusable card and search components adopted across the suite and the Figma structure that became the team-wide standard.",
  },
  {
    org: "Bild",
    role: "UI/UX Designer → Lead Designer",
    period: "Sep 2022 – Feb 2024",
    location: "Podgorica, Montenegro",
    summary:
      "Introduced a new UX research approach, a documentation methodology and a handoff process, led major client projects, and was promoted from UI/UX Designer to Lead Designer.",
  },
  {
    org: "Agency Look",
    role: "UI Designer → UI/UX Designer",
    period: "Mar – Sep 2022",
    location: "Istanbul",
    summary:
      "Moved from UI Designer to UI/UX Designer within two months, designing for high-profile corporate clients.",
  },
  {
    org: "Morpa",
    role: "UI/UX Designer",
    period: "Jun 2021 – Mar 2022",
    location: "Istanbul",
    summary:
      "Designed the core application — used by over 1 million active users — as one interface shared by the student, teacher, parent and administrator apps.",
  },
  {
    org: "Freelance",
    role: "Designer",
    period: "Jan 2018 – Jun 2021",
    summary:
      "Branding, social media and UI/UX work for direct clients over three and a half years, alongside a degree in Communication Design.",
  },
];

export const education: Education[] = [
  {
    school: "Yıldız Technical University",
    degree: "BA Communication Design",
    period: "2018 – 2021",
  },
  {
    school: "International University of Sarajevo",
    degree: "Visual & Communication Design",
    period: "2015 – 2017",
  },
];

/** All 13. Featured = the three July 2025 IxDF ones; show those, link the rest. */
export const certifications: Certification[] = [
  { name: "Get Your Product Used: Adoption and Appropriation", issuer: "IxDF", year: "2025", featured: true },
  { name: "AI for Designers", issuer: "IxDF", year: "2025", featured: true },
  { name: "AI for Design Systems: How to Stay Ahead and Lead", issuer: "IxDF", year: "2025", featured: true },
  { name: "AI-Powered UX Design", issuer: "IxDF", year: "2023" },
  { name: "Conducting Usability Testing", issuer: "IxDF", year: "2023" },
  { name: "UX Research", issuer: "Userspots", year: "2021" },
  // Uxcel courses are undated in 05-FACTS; year left empty on purpose.
  { name: "Common Design Patterns", issuer: "Uxcel", year: "2022" },
  { name: "Design Composition", issuer: "Uxcel", year: "2022" },
  { name: "UI Components Best Practices", issuer: "Uxcel", year: "2022" },
  { name: "Color Psychology for Designers", issuer: "Uxcel", year: "2021" },
  { name: "Designing Wireframes", issuer: "Uxcel", year: "2021" },
  { name: "Intro to Design Terminology", issuer: "Uxcel", year: "2021" },
  { name: "UX/UI Design Foundations", issuer: "Uxcel", year: "2021" },
];

/** LinkedIn top five first, then the tools that make the design-engineer claim concrete. */
export const skills: string[] = [
  "Team Leadership",
  "Design Engineering",
  "AI Product Design",
  "Rapid Prototyping",
  "Design Systems",
  "Next.js / React",
  "Motion",
  "Figma",
];

export const languages: Language[] = [
  { name: "Turkish", level: "Native" },
  { name: "English", level: "Full professional" },
];
