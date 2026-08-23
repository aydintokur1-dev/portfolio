import type { CaseStudy } from "@/content/types";

const study: CaseStudy = {
  slug: "morpa",
  title: "One interface, four audiences, ages 8 to 60",
  org: "Morpa",
  year: "2021",
  role: "Product Designer",
  tint: "blue",
  tier: "range",
  summary:
    "Morpa Kampüs is one of Türkiye's largest school e-learning platforms, used by over a million people, and it shipped as four apps for students, teachers, parents and administrators that share one interface. The hard constraint was age: 14-year-olds refuse anything that looks made for 8-year-olds. Alongside it, Morpa Ders, a tutor marketplace that research turned into a structured learning product.",
  facts: [
    { label: "Role", value: "Product Designer" },
    { label: "Team", value: "Art director, product, engineering" },
    { label: "Timeline", value: "Jun 2021 – Mar 2022" },
    { label: "Platform", value: "Kampüs: mobile apps · Ders: web" },
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
    {
      heading: "Morpa Ders: from matching to learning",
      blocks: [
        {
          type: "p",
          text: "Morpa Ders started with a simple goal: connect students with private tutors. Research changed that. We benchmarked Preply, Superprof, italki, Busuu Live, Udemy and Lesson Face, and read through user reviews of the closest ones, sorted into praise, complaints and suggestions. What came back was that matching alone isn't a product. Families needed a way in that private-lesson pricing didn't give them, students needed more than one way to learn, and tutors needed more than one way to earn.",
        },
        {
          type: "figures",
          figures: [
            {
              src: "morpa-ders-5",
              caption: "The benchmark: six platforms, screen by screen, then regrouped by filter, tutor list, tutor profile and scheduling.",
            },
            {
              src: "morpa-ders-6",
              caption: "Review mining: real user reviews of Busuu, Preply and Superprof, sorted into negative, positive and suggestions.",
            },
          ],
        },
        { type: "p", text: "So the marketplace became structured learning:" },
        {
          type: "list",
          items: [
            "Group classes, so families who can't afford private lessons still have a way in, and students who prefer learning in a group get one.",
            "Recorded lessons that tutors publish and sell. Not live, not interactive, still paid, so a tutor reaches more students and earns beyond their calendar.",
            "Ratings and reviews after every class, to help students choose well and tutors improve.",
            "A calendar of each tutor's availability with booking for specific times, and a list of planned group lessons where a student can take a seat in a couple of taps.",
          ],
        },
        {
          type: "figure",
          figure: {
            src: "morpa-ders-2",
            caption: "The feature map: private lessons, group classes, practice, safety, scoring, credits, replays and filtering.",
          },
        },
      ],
    },
    {
      heading: "The harmful-comment flag",
      blocks: [
        {
          type: "decision",
          problem:
            "Ratings cut both ways. A teacher who works for Morpa pointed out during research that a student might leave a negative review for reasons that have nothing to do with the lesson: they know the tutor from school, and simply don't like them.",
          constraint:
            "Reviews had to stay. Students choosing a tutor need them, and tutors need the feedback. Removing ratings would have protected tutors by making the platform worse for everyone.",
          decision:
            "Let tutors mark a comment as harmful and explain why they think so. Morpa reviews the flag and decides whether the comment stays. The tutor gets a voice; the platform keeps the final say.",
          outcome:
            "A review system students can trust and tutors can live with, shaped by one conversation we would have missed without research.",
        },
        {
          type: "figure",
          figure: {
            src: "morpa-ders-7",
            caption: "The public site map: search, become a tutor, private lessons, packages, and sign-up paths for students and teachers.",
          },
        },
        {
          type: "figures",
          figures: [
            { src: "morpa-ders-8", caption: "The tutor's account, mapped: lessons, exams, uploads, wallet, messages." },
            { src: "morpa-ders-9", caption: "The student's account, mapped: search, lessons, study sessions, exams, wallet." },
          ],
        },
      ],
    },
    {
      heading: "The screens",
      blocks: [
        {
          type: "p",
          text: "There were few direct references for a product like this at the time, so the wireframes came from the research and the maps rather than from anything we could point at. We reviewed them as a team, changed what didn't hold, and moved to UI: a style guide first, then the screens.",
        },
        {
          type: "figure",
          figure: {
            src: "group-764",
            caption: "Wireframes: home, tutor list, tutor profile, my exams, my lessons and study sessions.",
          },
        },
        {
          type: "figure",
          figure: {
            src: "group-763",
            caption: "Style guide: type scale, feature cards, form fields including payment and payout, buttons and colour.",
          },
        },
        {
          type: "figure",
          figure: {
            src: "morpa-ders-banner",
            caption: "The landing page: search for a lesson, with subject chips underneath.",
          },
        },
        {
          type: "figures",
          figures: [
            { src: "group-770", caption: "Final UI: student dashboard, tutor list, landing page, tutor profile and replays." },
            { src: "group-771", caption: "Study sessions with seats left, one-to-one lessons, and exams." },
          ],
        },
        {
          type: "p",
          text: "What I'd change now: the student sidebar carries eleven sections. A 12-year-old needs about five. I'd fold exams, replays and study sessions under lessons, and make the rest earn its place.",
        },
      ],
    },
  ],
};

export default study;
