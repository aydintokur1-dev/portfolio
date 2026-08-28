import type { CaseStudy } from "@/content/types";

const study: CaseStudy = {
  slug: "morpa-ders",
  title: "Matching wasn't the product, learning was",
  org: "Morpa Ders",
  year: "2021",
  role: "Product Designer",
  tint: "blue",
  tier: "range",
  summary:
    "Morpa Ders started as a tutor marketplace and research turned it into a structured learning product. We benchmarked six competitors, mined their reviews, and shipped group classes, recorded lessons, and a review system that protects both students and tutors.",
  facts: [
    { label: "Role", value: "Product Designer" },
    { label: "Team", value: "Art director, product, engineering" },
    { label: "Timeline", value: "Jun 2021 – Mar 2022" },
    { label: "Platform", value: "Web" },
    { label: "Tools", value: "Figma, Miro" },
  ],
  cover: "morpa-ders-banner",
  sections: [
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
