import type { CaseStudy } from "@/content/types";

const study: CaseStudy = {
  slug: "balkan-transfer",
  title: "From form-filling to decision-making",
  org: "Balkan Transfer",
  year: "2023",
  role: "Lead Product Designer",
  tint: "blue",
  tier: "depth",
  summary:
    "Airport transfer booking asks people to commit before they know if the trip is feasible. I led the redesign of the website and the mobile apps around one reframe: stop asking users to fill a form, start helping them resolve decisions. Shipped with reusable passenger profiles, transparent pricing and self-service booking management that took the small changes off the phone lines.",
  facts: [
    { label: "Role", value: "Lead Product Designer" },
    { label: "Team", value: "Junior UX/UI, Head of Design, PM, Engineering, client stakeholders" },
    { label: "Timeline", value: "2023" },
    { label: "Platform", value: "Public website + mobile apps" },
    { label: "Tools", value: "Figma, FigJam, AI for synthesis" },
  ],
  cover: "cover-big",
  sections: [
    {
      heading: "The problem",
      blocks: [
        {
          type: "p",
          text: "Balkan Transfer runs airport transfers in Bosnia and Herzegovina. A booking has an outbound leg and often a return, a set of passengers, extras like luggage and child seats, and a price that depends on all of it. The result is a structured ticket the driver works from. Customers are one-time travellers and regulars, and both want the same three things: clarity, speed, and confidence at the moment they commit.",
        },
        {
          type: "p",
          text: "The old platform treated that as a form. Fill every field, submit, find out. But every decision that matters in a transfer booking is made under uncertainty. Is the route available? What does it cost with two bags and a child seat? Does the return time work? Users didn't find out until after they'd tried, so they hesitated, guessed, and tried again.",
        },
        {
          type: "list",
          items: [
            "No visibility of availability or feasibility until after submission",
            "Repeated data entry for frequent travellers",
            "No way to modify or cancel a booking without calling support",
            "No driver or vehicle details before the ride",
            "No post-booking management, so every small change went through customer service",
          ],
        },
        {
          type: "figure",
          figure: {
            src: "analysis-desktop",
            caption: "Competitor audit, desktop: coach, ride-share and transfer sites, annotated positive, negative and idea.",
          },
        },
      ],
    },
    {
      heading: "What we found",
      blocks: [
        {
          type: "p",
          text: "Across stakeholder sessions and competitor audits, three pain themes kept coming back.",
        },
        {
          type: "list",
          items: [
            "Low availability visibility: users only learned whether a trip was feasible after submitting the form.",
            "Heavy configuration effort: many fields and steps, with no shortcuts and nothing reused.",
            "Repeated input: frequent travellers typed the same passenger and extras details every single time.",
          ],
        },
        {
          type: "figure",
          figure: {
            src: "analysis-mobile",
            caption: "The same audit on mobile apps, with notes from two of us on filters, summaries and empty states.",
          },
        },
        {
          type: "p",
          text: "Underneath the three themes was one insight. Users think in terms of their trip, not in terms of fields. They expect the system to remember the people they travel with, keep the configuration small, and make feasibility and price clear before they commit.",
        },
      ],
    },
    {
      heading: "The reframe",
      blocks: [
        {
          type: "decision",
          problem:
            "The booking flow was a form. Users had to supply everything before the system told them anything, so the decisions that matter, route, price, passengers, return timing, were made blind.",
          constraint:
            "The business logic was real. Prices depend on route, passengers and extras, and drivers need a complete, structured ticket. We couldn't ask for less information. We could only change when we asked for it, and what we gave back.",
          decision:
            "Reframe the experience from “fill forms, submit” to “resolve decisions, commit”. Surface feasibility and price early. Structure the decisions as a logical sequence. Reuse what the user has already told us instead of asking again. And extend the product past checkout, so a change after booking doesn't need a phone call.",
          outcome:
            "One flow for web and mobile: search a ride, pick a time with the price beside it, confirm passengers from saved profiles, add extras, pay. Then a My booking area to see the driver and vehicle, edit, or cancel.",
        },
        {
          type: "figure",
          figure: {
            src: "ia",
            caption: "Information architecture for the website: the low-level map, and the high-level one it collapses into.",
          },
        },
      ],
    },
    {
      heading: "Designing the flow",
      blocks: [
        {
          type: "p",
          text: "Research, IA, wireframes, UI, spec, handoff, in that order, with review cycles at every step. I led design for the whole website and the mobile apps; the team reviewed and refined with me.",
        },
        {
          type: "figure",
          figure: {
            src: "wireframes",
            caption: "Wireframes: search with a Manage booking tab beside it, results with prices, a three-step checkout, My transfers, and the driver's ticket.",
          },
        },
        { type: "p", text: "A few of the decisions inside the flow:" },
        {
          type: "list",
          items: [
            "Search and Manage booking share the first screen. Returning users go straight to their booking instead of hunting for a link in an email.",
            "Results show the price on every time slot, so choosing a time is also choosing a price.",
            "Passenger profiles are saved and reused. A regular picks the people they travel with; a first-timer types them once.",
            "Extras are configured in one place, per passenger, with the total updating as you go.",
            "The ticket is structured the same way for the customer and the driver: route, times, passengers, extras, price per passenger, and the driver and vehicle details before the ride.",
          ],
        },
        {
          type: "figure",
          figure: {
            src: "style-guide",
            caption: "Style guide: Poppins for headings, Roboto for everything else, a 4pt baseline grid, and the colour ramps.",
          },
        },
      ],
    },
    {
      heading: "Where AI fit",
      blocks: [
        {
          type: "p",
          text: "AI did the mechanical parts of research: synthesising the competitor audit, clustering pain points, scaffolding personas, and generating variants of UX copy for us to choose from. None of that is the design. What it bought was time, and I spent that time on the flow-level decisions and on feasibility conversations with engineering and the client, which is where a booking product is won or lost.",
        },
        {
          type: "figure",
          figure: {
            src: "user",
            caption: "Persona and journey map: Susan, a self-employed writer who travels often. AI drafted the scaffolding; the observations came from the team.",
          },
        },
      ],
    },
    {
      heading: "Outcome",
      blocks: [
        { type: "p", text: "Shipped as V1:" },
        {
          type: "list",
          items: [
            "Full redesign of the public website",
            "Full design of the mobile apps",
            "Unified extras configuration",
            "Reusable passenger profiles",
            "Improved UX writing and system feedback",
            "Structured ticket information for drivers",
            "A My booking section for post-purchase management",
            "Driver and vehicle details visible before the ride",
            "Editing and cancelling bookings in the product, instead of by phone",
          ],
        },
        {
          type: "figure",
          figure: {
            src: "ui",
            caption: "Final UI across sign-in, home, map, destinations, checkout and the ticket.",
          },
        },
        {
          type: "p",
          text: "What we expect it to change: fewer trial-and-error searches, less repeated data entry for returning users, clearer pricing, and fewer support calls for basic questions and small changes. Those are expectations, not measurements. Next time I'd ship the My booking section with its own analytics on day one, so the self-service claim has a number behind it.",
        },
      ],
    },
  ],
};

export default study;
