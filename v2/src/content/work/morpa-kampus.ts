import type { CaseStudy } from "@/content/types";

const study: CaseStudy = {
  slug: "morpa-kampus",
  title: "One interface, four audiences, ages 8 to 60",
  org: "Morpa Kampüs",
  year: "2021",
  role: "Product Designer",
  tint: "blue",
  tier: "range",
  summary:
    "Morpa Kampüs is one of Türkiye's largest school e-learning platforms, used by over a million people, and it shipped as four apps for students, teachers, parents and administrators that share one interface. The hard constraint was age: 14-year-olds refuse anything that looks made for 8-year-olds.",
  facts: [
    { label: "Role", value: "Product Designer" },
    { label: "Team", value: "Art director, product, engineering" },
    { label: "Timeline", value: "2021" },
    { label: "Platform", value: "Mobile apps" },
    { label: "Tools", value: "Figma, Miro" },
  ],
  cover: "kampus-banner",
  sections: [
    {
      heading: "Four apps, one interface",
      blocks: [
        {
          type: "p",
          text: "Morpa Kampüs is an e-learning platform for primary and middle school students, used by schools and families across Türkiye. We shipped it as four applications: one for students, one for teachers to follow their students' assignments, one for parents to see how their children are doing, and one for school administrators to follow both. Four apps, many personas, and one decision that shaped everything: they would share a single interface, with only limited differences between them.",
        },
        {
          type: "stat",
          items: [
            { value: "1M+", label: "active users" },
            { value: "4", label: "apps on one interface" },
            { value: "8 – 60", label: "ages of the people using it" },
          ],
        },
        {
          type: "p",
          text: "Sharing an interface between an eight-year-old and a sixty-year-old school manager sounds like a compromise. It's the opposite. A parent who learns the student app's structure can read the parent app without learning anything again. A teacher moving between their own app and a student's screen sees the same shapes. The work ran through wireframes and brainstorm sessions with my art director, then design, iteration, testing, and iteration again until the shared structure held for all four.",
        },
        {
          type: "figure",
          figure: {
            src: "kampus-2",
            caption: "Student app wireframes: home, lesson content, materials, improving a score, and reports.",
          },
        },
        {
          type: "p",
          text: "Two deliberate differences survived. The teacher, parent and manager apps run in a dark theme, so the adult tools look like tools. And the student app changes its illustration register by age.",
        },
        {
          type: "figure",
          figure: {
            src: "kampus-3",
            caption: "Final UI: the student app in light, the teacher and manager apps in dark, from messages to class reports.",
          },
        },
      ],
    },
    {
      heading: "The age problem",
      blocks: [
        {
          type: "p",
          text: "A student can be anywhere from the start of primary school to the end of middle school, and a 14-year-old will reject anything that looks made for a child. So the student app keeps one colour system and one layout for everyone, and varies only the illustrations: playful for primary school, noticeably more mature on the first screen for middle school. Same product, different tone of voice. It's the cheapest way I know to respect a teenager.",
        },
        {
          type: "figure",
          figure: {
            src: "kampus-banner",
            caption: "The student home in two illustration registers, and the teacher app in light and dark.",
          },
        },
      ],
    },
  ],
};

export default study;
