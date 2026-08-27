import type { Testimonial } from "./types";

/**
 * LinkedIn recommendations, verbatim (canonical source: docs/05-FACTS.md).
 *
 * Four were captured truncated on LinkedIn ("…"): Patrick, Aleksandra and
 * Danko end at their last complete sentence rather than a guessed remainder.
 * Turkish ones keep the original in `text` and carry a translation in `en`.
 * Paragraph breaks are "\n\n".
 */
export const testimonials: Testimonial[] = [
  {
    name: "Baysal Sümer",
    // LinkedIn headline trimmed — full: "Senior Product Designer | Design Systems · Complex Platforms · AI Workflows | 50K+ Users | WCAG 2.1 AA | IBM Design Thinking Certified"
    role: "Senior Product Designer | Design Systems",
    relation: "same team",
    date: "August 2026",
    lang: "en",
    text: "I've worked with a lot of designers, and I count myself lucky to work with Aydin. He's at the top of that list.\n\nHe's easy to work with and he actually communicates. Ask him something and you get a real answer, and you always know where a project stands with him.\n\nHis eye is the part I still can't explain. He catches details the rest of us walk straight past, usually the exact ones that would have blown up three weeks later. I've stopped being surprised by it and just started asking him to look at things before they ship.\n\nI'd recommend Aydin to anyone without thinking twice. Whoever works with him next is lucky.",
  },
  {
    name: "Kiril Spasov",
    role: "UX/UI | Web | Product Design",
    relation: "same team",
    date: "August 2026",
    lang: "en",
    text: "I really enjoyed working with Aydın at Pickleball.com.\n\nHe's incredibly detail-oriented and has a strong eye for creating and maintaining visually consistent designs. His ability to build systems that are both scalable and practical, while applying them consistently across all of our products, really stood out to me.\n\nHis overall approach to design and problem-solving clearly reflects his experience and professionalism.\n\nI'd definitely recommend Aydın to any product team.",
  },
  {
    name: "Nancy Kaplan",
    role: "Senior UX Designer | Researcher",
    relation: "managed Aydın directly",
    date: "May 2025",
    lang: "en",
    text: "I've had the pleasure of working closely with Aydin on several high-impact projects, and he is one of the most talented designers I've collaborated with. He brings a rare blend of strategic thinking, user-centered design, and pixel-perfect execution to every initiative. What sets him apart is not just his design expertise, but also his ability to deeply understand user needs and translate them into intuitive, elegant solutions. Whether it's designing complex flows, refining a design system, or elevating an existing design, Aydin consistently enhances the quality and cohesion of the product experience.",
  },
  {
    name: "Patrick Gaughan",
    role: "Project Management | Software Development",
    relation: "Project Manager, same team",
    date: "March 2025",
    lang: "en",
    text: "I have had the pleasure of working with Aydin at Pickleball.com as his Project Manager for various projects related to our product suite. Aydin is very detail oriented, asks great questions and gives very good feedback when given a task. He consistently delivers quality designs on time and is quick to make adjustments as needs of our customers change.\n\nAydin has been a major contributor to the updated pickleballtournaments.com home page, search, and detail pages. He has also done exceptional work on our Admin area.",
  },
  {
    name: "Aleksandra Boskovic",
    role: "CEO & Partner @ Bild | Co-founder @ Branca",
    // relation not stated in 05-FACTS; CEO, not on the design team
    relation: "worked with Aydın, different teams",
    date: "February 2024",
    lang: "en",
    text: "We at Bild had the pleasure of cooperating with Aydin for almost two years. I highly recommend Aydin for his exceptional skills and contributions as a UX/UI designer. As a colleague and team member, Aydin consistently demonstrated professionalism, creativity, and a strong commitment to delivering outstanding design solutions.\n\nOne of Aydin's standout qualities is his excellent communication and teamwork skills.",
  },
  {
    name: "Ivo Lasic",
    role: "UX/UI Designer",
    relation: "same team",
    date: "January 2024",
    lang: "en",
    text: "Aydin is one of the best designers i have worked with. He is well versed in both UX and UI design, always willing and ready to help and listen. He appreciates good beer too 🙂",
  },
  {
    name: "Danko Keković",
    role: "UI Architect & Product Designer at Codeus",
    relation: "managed Aydın directly",
    date: "February 2024",
    lang: "en",
    text: "I've worked with Aydin for just more than a year. He was in my team all the time and we collaborated on several projects. I was doing revisions of his work and also provided consultations and guidance whenever he or I found it beneficial or necessary. (I should also add that the focus of our meetings was mostly on UX design.)\n\nFrom the beginning, I noticed that he is one of those individuals with whom you can feel the drive to expand their knowledge constantly.",
  },
  {
    name: "Tuna Aldemir",
    role: "Senior Product Designer",
    // relation not stated in 05-FACTS
    relation: "same team",
    date: "January 2024",
    lang: "tr",
    text: "Aydın'la 6-8 ay kadar beraber çalışıp birden fazla proje tamamladık. UI yönü çok kuvvetli, deneyimli, yaratıcı ve en önemlisi uyumlu ve beraber çalışması zevkli.",
    en: "Aydın and I worked together for 6–8 months and completed several projects. Very strong on UI, experienced, creative — and most importantly, easy to work with and a pleasure to collaborate with.",
  },
  {
    name: "Gökhan Kara",
    role: "Product Design Team Lead",
    relation: "was Aydın's mentor",
    date: "January 2024",
    lang: "tr",
    text: "Aydın'ı firmanızdaki UI & UX Designer pozisyonu için tavsiye etmek isterim. Aydın ile yaklaşık 10 ay MorpaKampüs'te beraber çalıştım. Çalıştığı süre zarfında başarılı projelere imza atan Aydın, yaptığı derinlemesine analiz ve benchmarklar ile doğru tespitler yapan ve bu özelliği sayesinde en doğru deneyimi tasarımlarına yansıtan ve yaratıcı yönü oldukça kuvvetli, yazılı ve sözlü iletişim becerileri son derece güçlü bir ekip arkadaşıydı. Hem bağımsız hem de bir ekiple çalışabilen Aydın, iş disiplini ve hızı ile de beğenimizi kazandı.",
    en: "I would like to recommend Aydın for the UI & UX Designer position at your company. I worked with Aydın for about 10 months at MorpaKampüs. During his time there Aydın delivered successful projects; he was a teammate who reached the right conclusions through in-depth analysis and benchmarks, and who, thanks to that, brought the right experience into his designs — highly creative, with exceptionally strong written and verbal communication skills. Able to work both independently and as part of a team, Aydın also earned our admiration with his work discipline and speed.",
  },
  {
    name: "Nilay Kıratlı",
    role: "Motion Graphic / UI & UX Designer",
    // relation not stated in 05-FACTS
    relation: "same team",
    date: "January 2024",
    lang: "tr",
    text: "Aydın yenilikleri takip eden, sürekli kendini geliştiren, edindiği bilgileri iş arkadaşlarıyla paylaşan işinde disiplinli ve başarılı bir çalışma arkadaşı. Onunla çalışmak gerçekten çok keyifli.",
    en: "Aydın is a colleague who keeps up with what's new, keeps improving himself, shares what he learns with his coworkers, and is disciplined and successful in his work. Working with him is a real pleasure.",
  },
];
