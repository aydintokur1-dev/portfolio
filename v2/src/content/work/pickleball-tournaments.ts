import type { CaseStudy } from "@/content/types";

/**
 * pickleballtournaments.com — the tournament page and its tabs.
 * Each tab is shown as a before/after pair. All five are written up —
 * Events from the designs themselves rather than Aydın's notes (27 Aug 2026).
 */
const study: CaseStudy = {
  slug: "pickleball-tournaments",
  title: "One tournament page, every tab, every state",
  org: "PickleballTournaments.com",
  year: "2026",
  role: "Senior Product Designer",
  tint: "yellow",
  tier: "depth",
  gated: true,
  summary:
    "The tournament page is everything a player needs to know about an event, in one place: when, where, what it costs, how to register, who's playing, who needs a partner, the results, the videos. I redesigned all thirteen of its tabs — five are shown here — and, before any of that, rebuilt the Figma file so the team could find the latest design and every state it has to cover. One button on it cut misdirected support messages by 90%. The platform behind it has hosted 22,000+ tournaments and 4M+ matches; this page is where every one of them starts.",
  facts: [
    { label: "Role", value: "Senior Product Designer" },
    { label: "Scope", value: "Tournament page — 13 tabs; Details · Events · Players · Teams · Results shown" },
    { label: "Status", value: "In development — the live site still runs the previous design" },
    { label: "Platform", value: "Web · Figma" },
    { label: "Scale", value: "22K+ tournaments hosted · 4M+ matches played · 1K+ active at any time" },
  ],
  cover: "cover",
  coverCompare: { before: { src: "details-old", thumb: "cover-old" }, after: { src: "details", thumb: "cover-new" } },
  link: { href: "https://pickleballtournaments.com", label: "pickleballtournaments.com · previous design" },
  sections: [
    {
      heading: "The file nobody could read",
      blocks: [
        {
          type: "p",
          text: "The first problem wasn't on the site. It was in Figma. The file held every old variation of every page next to the current one, with nothing to say which was the latest. Finding the design you were looking for was impossible, and the designs that were there didn't cover the page anyway: not every tab, and not the variations a tournament can take — different tournament types show different tabs, and depend on different data.",
        },
        {
          type: "p",
          text: "So first things first. I sat down with the developers and got the whole picture from the code side: which tabs exist, what each one depends on, how many scenarios the page can actually be in. Then I built all thirteen tabs, one Figma page per page, ordered the way the site's navigation is ordered so the file reads like the product. Every tab carries dev notes that spell out the rules in detail — when it shows, what it needs, what changes it. Whoever takes over the project next can open the file cold and understand the whole thing.",
        },
        {
          type: "decision",
          problem: "A Figma file where old and current designs lived together, with no way to tell them apart — and designs that didn't cover every tab or tournament type.",
          constraint: "The rules for what shows when lived in the developers' heads, not in the file.",
          decision: "Get the rules from engineering first. Rebuild the file one page per page, following the navigation, with dev notes on every tab.",
          outcome: "One source of truth for the page and all of its states. Handoff no longer depends on who drew it.",
        },
        {
          type: "p",
          text: "One decision made here became a rule for every product on the platform: the ads moved from the top of the page to below the header. The event's own identity comes first; the ad follows it.",
        },
      ],
    },
    {
      heading: "Details",
      blocks: [
        {
          type: "p",
          text: "Details is the page a player reads before committing. When the tournament is, where, what it costs, how to register — then everything around it: every description the organiser wrote, linked tournaments, venue details and directions, parking, the ball being used, travel (lodging, car rental, airlines), the weather for the event dates, the FAQ, the sponsors. And across the other tabs, what the tournament contains: the schedule, the players and teams, players looking for a partner, photos and videos, and how to get involved as a sponsor or a referee. All of it has to fit on one page without the page falling apart.",
        },
        {
          type: "stat",
          items: [
            { value: "90%", label: "fewer players contacting the platform instead of the event, after the Contact button change" },
            { value: "13", label: "tabs redesigned — five of them shown here" },
            { value: "1", label: "Figma page per site page, every state documented" },
            { value: "22K+", label: "tournaments hosted on the platform this page serves" },
          ],
        },
        {
          type: "p",
          text: "Old on the left, new on the right — scroll and they walk together.",
        },
        {
          type: "compare",
          before: { src: "details-old", caption: "The current page: banner ad first, floating event card, three link-only actions, every description open at once." },
          after: { src: "details", caption: "The redesign: header on the platform colour, one registration chip, every action as a button, the player's own events first, descriptions as slide-outs." },
        },
        {
          type: "h3",
          text: "Hierarchy first" },
        {
          type: "p",
          text: "The old page had no hierarchy: an ad, then a white card floating on grey, with the event name competing against the sponsor banner above it. The redesign gives the header a background that takes the platform colour, so the event sits on the brand and everything else sits under it. The main background turned white — it reads modern and gives the page some energy — and that white background then followed onto every redesign across the platform.",
        },
        {
          type: "p",
          text: "The event image was the small thing that gave the old page away: the slot didn't match the aspect ratio organisers actually upload. I already knew the correct ratio from the tournament cards I'd built for the rest of the suite, so the header uses that. Registration status — open, how many registered — became a chip and got highlighted rather than being a grey line under the title.",
        },
        {
          type: "h3", text: "Every button, and when to show it" },
        {
          type: "p",
          text: "We introduced favouriting a tournament, so a heart went top right. Next to it I found the old page's social icons. I assumed they were the event's social accounts — then tested them, and they were sharing options. They became one share button. Then I laid out every action the header can hold — Register, Contact, Manage, My matches, tickets, shop — and left dev notes for which appear in which state.",
        },
        {
          type: "p",
          text: "The Contact button's colour isn't in the design system, and that's deliberate. Players who couldn't find it were writing to our platform instead of the event, so upper management asked for a colour that couldn't be missed. It worked: by their count, messages reaching the wrong inbox dropped by 90%.",
        },
        {
          type: "decision",
          problem: "Three text links and a row of social icons did the header's work. Players missed Contact and wrote to the platform instead.",
          decision: "Heart, share, and a full button set with per-state dev notes. Contact in an off-system colour, decided by upper management.",
          outcome: "90% fewer support messages reaching the wrong inbox; one place for every action the page can offer.",
        },
        {
          type: "h3", text: "When, where, and how much" },
        {
          type: "p",
          text: "To personalise the page, the events the player is in appear first — live, waiting to start, upcoming in the next thirty days. Below them, the three cards a player actually reads: on When, the dates are the loud part; on Where, the venue is, and Get direction became a real call to action rather than a link in the corner.",
        },
        {
          type: "p",
          text: "On Registration, the fee used to be big and blue — it looked clickable, and it wasn't. It's now text colour. “Click here for fee schedule” became “Fee schedule”. And the card gained what a player needs to decide: a Register button, the dates registration opens and closes, and the registration period drawn as a bar with the closing state on it, so you can see how much time is left rather than compute it.",
        },
        {
          type: "h3", text: "The long texts" },
        {
          type: "p",
          text: "The biggest problem on the old page was that every text — description, additional information, refund policy — was visible at once. Each had a See more, and once opened those texts could be very long and pushed everything below them off the screen. Now the page shows only the titles. Tap one and the text opens in a slide-out; the page underneath doesn't move.",
        },
        {
          type: "decision",
          problem: "Every description open at once, each expanding to any length, shoving the rest of the page down.",
          decision: "Titles only, each opening its text in a slide-out.",
          outcome: "The page keeps its shape no matter how much an organiser writes. Sponsors, linked tournaments and the register block stay where a player expects them.",
        },
        {
          type: "p",
          text: "Linked tournaments now use the tournament card component I built for the rest of the suite — the same card as search, the homepage and clubs, favourite heart included. The sponsors column, the at-a-glance panel and the register block at the end follow the same rule: give it a shape, and document when it shows.",
        },
      ],
    },
    {
      heading: "Events",
      blocks: [
        {
          type: "p",
          text: "Events is the tournament's schedule — every bracket, when it runs, what format, who's in it. I designed it as one: the page is for finding out when you play. A big tournament has more than a hundred and fifty events, so the page also has to let a player find their own in that list, see the state of each at a glance, and open one to see who else is in it.",
        },
        {
          type: "compare",
          before: { src: "events-old", caption: "The current page: a link-styled notice, three labelled filter rows, blue category bars over blue cards, a different primary button per state, and a count strip under every event." },
          after: { src: "events", caption: "The redesign: an info box, filters in one container, My events first, collapsible groups with counts, a calendar block per event, tags for format and state, one Details button, and the player table on open." },
        },
        {
          type: "h3", text: "Blue on blue" },
        {
          type: "p",
          text: "The old page was blue all the way down: a blue category bar, blue event cards under it, blue links inside those, and a blue notice at the top that looked like a button. With everything the same colour, nothing was on top. The redesign puts the events on white and grey containers and keeps colour for what it means something on: links, the state tags, and the yellow that marks a waitlist. The notice became an info box with an icon — it's information, and it now looks like it.",
        },
        {
          type: "p",
          text: "The filters follow the pattern the other tabs use. Three dropdowns, each on its own labelled “Filter by” row, became search, dates and events side by side in one container. The status filter went: each event's state is now a tag on the card, so you read it rather than filter for it.",
        },
        {
          type: "h3", text: "Your events, then everyone's" },
        {
          type: "p",
          text: "The first group on the page is My events — the ones the player is registered in — the same rule as on Details, where the player's own events come first. Below it, the grouping is the real fix. A category isn't one event: Pro alone can hold six. The old page marked each category with a blue bar and then ran its events on as a flat list, so where one category ended and the next began was a matter of spotting the next bar. Now each category is a container and its events sit inside it, with the count in the header — Pro, 2 events. And the container collapses. A category with a lot of events used to mean scrolling all the way through it to get past; now it folds to one line.",
        },
        {
          type: "decision",
          problem: "A hundred and fifty events in one flat list, categories marked only by a blue bar. Finding your own meant scrolling and reading; passing a big category meant scrolling through all of it.",
          decision: "My events first. Then each category as its own container, events inside it, count in the header, and a collapse.",
          outcome: "Your events are at the top; every other category is one line until you open it.",
        },
        {
          type: "h3", text: "The event card" },
        {
          type: "p",
          text: "Because the page is a schedule, the date is the loudest thing on every card, on purpose: a calendar block on the left, the day large, the month and year under it, then the time or the session it's in, with a link to the full schedule. You can run down the list by date without reading a title. The format and the team limit are tags; so is the state, in the same colours as on Players — waiting to start in yellow, so an event that's about to go is visible from across the list. The organiser's text sits under the title in plain type, as long as it needs to be.",
        },
        {
          type: "p",
          text: "On the old card the main button changed with the state: Event details, then Draws & Results, then Results with Event details demoted to a link beneath it. Now there's one Details button on every card, always in the same place, and the draws and results are where they belong — on the Results tab. The count row under each card changed too: All, Registered, Waitlist and Lottery, with the waitlist marked in yellow. Free agents left this row, because Players now handles them.",
        },
        {
          type: "h3", text: "Who's in it" },
        {
          type: "p",
          text: "Open an event and the roster is a table: each player with their photo, name and DUPR number, then rating, age, gender and city. Doubles pairs are grouped, with a bar down the side so the pairing reads before the names do. And it carries the same states the rest of the page does — a partner who hasn't registered yet is marked, so you can see which pairs are complete without asking.",
        },
      ],
    },
    {
      heading: "Players",
      blocks: [
        {
          type: "p",
          text: "Players lists everyone registered and what they're registered for. But at amateur events that isn't why most people open it. They come looking for a partner, or — for team events — looking for a free agent to fill a spot. The old page made them scroll a long list to find those people. The new one leads with them.",
        },
        {
          type: "compare",
          before: { src: "players-old", caption: "The current page: a list of player cards, event names in blue though they aren't links, Teammates and Details in every row, every line at the same weight." },
          after: { src: "players", caption: "The redesign: three counts up top, tabs for looking-for-partner and free agents, yellow-stroked cards for those players, coloured state tags, partner photos, and the meta line in light grey." },
        },
        {
          type: "h3", text: "Why people come to this page" },
        {
          type: "p",
          text: "The first thing on the page is now three numbers: total players, how many are looking for a partner, how many are team-event free agents. At a glance you know whether there's anyone here for you. The same three categories are the tabs below the search, so one tap shows only the players looking for a partner, or only the free agents — instead of scrolling the full list and reading each card to find them.",
        },
        {
          type: "decision",
          problem: "Players looking for a partner, and free agents, were buried in one long list. Finding them meant scrolling and reading every card.",
          constraint: "At amateur events, finding those people is the main reason the page is opened at all.",
          decision: "Lead with the counts, and make the two categories tabs.",
          outcome: "The people you came for are one number and one tap away, not a scroll — and the partner request, which the page already had, is right there in their row.",
        },
        {
          type: "h3", text: "Yellow" },
        {
          type: "p",
          text: "Even in the full list, those players shouldn't hide. A card for someone looking for a partner, or registered as a free agent, gets a yellow stroke and a chip next to the name, so as you scroll they catch your eye without you having to look for them. It's the same yellow as the Waiting List tag on Teams — one colour on this page means “this needs someone”.",
        },
        {
          type: "h3", text: "The rows" },
        {
          type: "p",
          text: "The rest is hierarchy inside the card. On the old page the event names were blue, so they looked clickable, and they weren't; they're text colour now. The event's state — completed, waiting to start, paused, cancelled — was already there; it's now a coloured tag, so the state reads before the words do. The partner is shown with their photo, for the reason I gave on Results: at these events people know each other by face. And the line under the player's name — gender, age, location — was as strong as the name itself, which is the kind of thing that makes a list tiring to read. It's smaller now and light grey, so the name is the name and the rest is detail.",
        },
      ],
    },
    {
      heading: "Teams",
      blocks: [
        {
          type: "p",
          text: "Teams is the tab for team tournaments: every team entered, its logo and rating, and the players on it. The old page had all of that. What it didn't have was any way to tell what belonged to what.",
        },
        {
          type: "compare",
          before: { src: "teams-old", caption: "The current page: filter and search on separate rows, team logo and players at the same level, a black Waiting List badge, and the next arrow sitting on the last player." },
          after: { src: "teams", caption: "The redesign: search and division in one container, each team in its own card — grey header for the team, the roster hanging under it — and a View roster card closing the row." },
        },
        {
          type: "h3", text: "Who belongs to whom" },
        {
          type: "p",
          text: "The real problem was hierarchy. On the old page the team logo and the player cards sat at the same level, and both were clickable — but nothing said so, and nothing said the players were that team's players. They looked like five cards next to a logo. Now each team gets its own container: logo, name and rating in a grey header, and the players in a connected panel beneath it, so the roster reads as the team's. Giving every team its own card also gave the page room to breathe.",
        },
        {
          type: "p",
          text: "Inside the header, what's clickable now looks it. The team name takes the link colour and the logo goes with it; See all players is a button instead of a text link. The one thing that isn't a link — the player count above the roster — sits in light grey, so it's read as a label and not tried as a target.",
        },
        {
          type: "decision",
          problem: "Team and players at the same level, both clickable, neither looking it. No visual link between a team and its roster.",
          decision: "One container per team — a grey header for the team, a connected panel for its players. Link colour and buttons for what's clickable; grey for what isn't.",
          outcome: "The players read as the team's, and there's nothing left to guess at: what's clickable looks it, and the list has space between teams.",
        },
        {
          type: "h3", text: "Everything that was too loud" },
        {
          type: "p",
          text: "The rest of the page's problems were the same problem: things taking attention or space they hadn't earned. The search and the division filter took two full rows and didn't look like they belonged together; they now sit side by side in one container. The Waiting List tag was big and black, and pulled the eye away from the team — it's yellow now, still visible, no longer the loudest thing on the page, and it no longer costs the card any height. The scroll arrows sat on top of the players' photos; they moved above the row, where they don't cover anyone.",
        },
        {
          type: "h3", text: "The end of the row" },
        {
          type: "p",
          text: "When a roster is longer than the row, the last card is a View roster card. It says two things at once: you've reached the end of what's shown here, and the full roster is one tap away — rather than leaving you with a half-cut photo and a guess. It sits alongside the See all players button on purpose. The button is for the player who already knows they want the full list; the card is for the one who'd rather look through the row first, and reaches the end of it ready to see the rest.",
        },
      ],
    },
    {
      heading: "Results",
      blocks: [
        {
          type: "p",
          text: "Results is where a tournament turns into scores: every match, by day, by category, by division. It's the tab with the most structure to hold, and the one where the most shared work landed.",
        },
        {
          type: "compare",
          before: { src: "results-old", caption: "The current page: three rows of tabs in the old components, then one match per full-width row — names, a grid of game scores, and a See details link." },
          after: { src: "results", caption: "The redesign: four tab levels in the shared component set, and the new score card — seeds, photos, the match score, game scores, the Upset tag and the prediction — two to a row." },
        },
        {
          type: "h3", text: "Four levels of tabs" },
        {
          type: "p",
          text: "Results was still on the old tab components. The hard thing about tabs on this platform is depth: a results page can need up to four levels — individual or team events, then the day, then the category, then the division — and every level has to look different enough to read as a level without the page turning into stripes. So the design team took it on together. We each worked on a set, chose a colleague's, and agreed it would be the one set for the whole platform. I implemented it here.",
        },
        {
          type: "h3", text: "The score card" },
        {
          type: "p",
          text: "The biggest change on the page is the card, and it starts with what was wrong with the old row. It was too wide, so a division got one match per row, and reading one meant walking your eyes left to right: names on the left, a grid of game scores in the middle, the round and status on the right. The wrong things were loud — court and match number, “Match completed” — third-level information sitting at the same weight as the score. The winner was told apart only by a slightly stronger black. And to open the match you had to find the See details link rather than click the thing itself.",
        },
        {
          type: "p",
          text: "With Baysal Sümer I designed a new score card while we were working on the mobile apps. It turned out to be the right shape everywhere, and was later adopted across all the products, desktop included. (The apps have their own study here: “Two apps, two platforms, every screen designed once”.) The card puts the match score big in the middle, the winner in green and the loser in red, both sides with their seeds and photos, and the game scores in a line beneath. Court and round go to the foot of the card, small. The whole card is the click.",
        },
        {
          type: "p",
          text: "It also carries two things the old row couldn't say. The system predicts each match from the players' ratings and history — that's the split in the corner, 62% against 38%. When the side it didn't favour wins, the result is an upset, and the card says so. A player scanning a division can now see not just who won, but which wins nobody saw coming.",
        },
        {
          type: "decision",
          problem: "One wide row per match, read left to right; court and status as loud as the score; the winner marked by a darker black; a See details link instead of a clickable card.",
          constraint: "The card had to work in the mobile apps first — that's where it was designed.",
          decision: "One card that shows the match, not just the numbers — designed with Baysal Sümer for the apps, then adopted everywhere.",
          outcome: "Two matches to a row instead of one, each readable at a glance, and one card that means the same thing on every screen in the suite.",
        },
        {
          type: "h3", text: "Faces" },
        {
          type: "p",
          text: "Wherever I could in the new designs, I used profile images — here on every side of every match. There's a reason beyond looks. Most events on the platform are amateur, and amateur events make communities. People in those communities know each other by name, of course, but often they know each other by face first. Showing the photo everywhere is meant to make it worth uploading one: when your card shows initials next to everyone else's faces, you go and add yours.",
        },
      ],
    },
    {
      heading: "Where it stands",
      blocks: [
        {
          type: "p",
          text: "The redesign is handed off and in development; what's on pickleballtournaments.com today is the previous design shown on the left of each pair. It's built on the card and search components the rest of the suite adopted — a tournament card behaves like a club card behaves like a league card, which is the whole system argument in one interaction.",
        },
      ],
    },
  ],
};

export default study;
