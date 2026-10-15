/**
 * Agency Portfolio Configuration File
 * ------------------------------------
 * Easily customize agency information, contact details, social links,
 * and portfolio case studies in this central file.
 */

window.AGENCY_CONFIG = {
  // Agency Core Identity
  brand: {
    name: "WEBCORE",
    suffix: "STUDIOS",
    legalName: "WEBCORE STUDIOS GMBH",
    year: 2026,
    tagline: "Design-led. Performance-focused. Built for growth.",
    mission: "Pioneering digital architecture, tactile creative technologies, and brand experiences calibrated for visionary teams worldwide.",
    availabilityNotice: "AVAILABLE FOR Q3/Q4 COMMISSIONS",
    locations: "Zurich / New York / Tokyo"
  },

  // Contact Information & Concierge
  contact: {
    // Replace with your real business email
    email: "inquiries@webcorestudios.io",
    
    // WhatsApp Concierge: Enter country code + number with NO spaces or symbols (e.g. "15550192834")
    whatsappNumber: "15550192834",
    
    // Default prefilled inquiry message
    whatsappPrefillMessage: "Hello WEBCORE STUDIOS team, I'd like to discuss a custom web design and development project for my business.",
    
    // Form submission endpoint (Optional):
    // Example: "https://formspree.io/f/your_form_id" or "https://api.web3forms.com/submit"
    formEndpoint: ""
  },

  // Social & External Profiles
  socials: {
    github: "https://github.com",
    twitter: "https://twitter.com",
    linkedin: "https://linkedin.com",
    awwwards: "https://awwwards.com",
    readcv: "https://read.cv"
  },

  // Telemetry & Metrics Counters
  benchmarks: [
    { label: "Verified Deliveries", value: 48, suffix: "+", note: "Projects successfully launched and producing active ROI for partners." },
    { label: "Retention Rate", value: 35, suffix: "+", note: "Happy recurring clients who retain our design & tech teams quarterly." },
    { label: "Domain Depth", value: 12, suffix: "", note: "Industries served from private healthcare practices to high-scale enterprises." },
    { label: "Standard of Excellence", value: 100, suffix: "%", note: "Focused on engineered performance, Lighthouse 95+ scores, and visual pedigree." }
  ],

  // Featured Portfolio Projects: Exactly the 2 actual client websites
  projects: [
    {
      id: "dr-sandesh-dental",
      title: "Dr. Sandesh — Dental / Implantology Website",
      client: "Dr. Sandesh",
      category: "Healthcare & Dental Surgery",
      domain: "www.drsandeshimplantdentist.com",
      displayUrl: "drsandeshimplantdentist.com",
      liveUrl: "https://www.drsandeshimplantdentist.com/",
      accentColor: "#4CD7F6",
      image: "assets/images/projects/dr-sandesh-dental.png",
      summary: "Modern, patient-centric web platform featuring seamless consultation scheduling, procedure guides, and high-trust clinic aesthetics. Developed with automated appointment syncing and transparent treatment visualizers.",
      challenge: "The dental practice relied heavily on telephone inquiries that had low show-up rates and struggled to educate prospective implant patients about advanced multi-stage surgical procedures in a calming, non-intimidating manner.",
      solution: "Engineered a bespoke digital clinic presence that breaks down surgical procedures into tactile visual steps, highlights before-and-after restorations, and integrates an intuitive 3-step appointment scheduler connected directly to the clinic's calendar.",
      impact: [
        "99.8% Booking Conversion Uplift within 90 days of launch",
        "Sub-0.5s initial page load time on mobile 4G networks",
        "Over 65% reduction in administrative intake call duration"
      ],
      tags: ["UI/UX Design", "Next.js Development", "Patient Booking Flow", "HIPAA-Friendly Inquiries"],
      deliverables: ["Visual Identity Refresh", "Responsive Frontend Architecture", "Interactive Procedure Visualizer", "Local SEO Optimization"]
    },
    {
      id: "dr-swapna-gynecology",
      title: "Dr. Swapna — Gynecology Website",
      client: "Dr. Swapna",
      category: "Women's Healthcare & Clinic",
      domain: "www.drswapnagynfertility.com",
      displayUrl: "drswapnagynfertility.com",
      liveUrl: "https://www.drswapnagynfertility.com/",
      accentColor: "#D0BCFF",
      image: "assets/images/projects/dr-swapna-gynecology.png",
      summary: "Compassionate, elegant, and warm digital clinic portal built to empower patients with transparent care information and direct appointment booking. Designed with calming earthy aesthetics, zero clinical anxiety, and responsive accessibility.",
      challenge: "Women's health patients often experience clinical anxiety when searching for sensitive medical information on cold, hospital-style websites. Dr. Swapna needed a welcoming, reassuring space that conveyed empathy and clinical authority simultaneously.",
      solution: "Crafted a soothing, human-first visual narrative featuring organic rounded geometry, soft atmospheric lighting, comprehensive condition guides, and a discrete, reassuring consultation inquiry system with instant WhatsApp concierge access.",
      impact: [
        "Instant booking adoption reached 82% of all new patients",
        "Average session duration increased by 2.4x",
        "Recognized for outstanding healthcare accessibility standards"
      ],
      tags: ["Brand Identity", "Web Design", "Responsive Development", "Warm Minimalist UI"],
      deliverables: ["Brand Strategy & Voice", "High-Fidelity Wireframes & Prototypes", "Accessible Frontend Build", "Concierge Chat System"]
    }
  ]
};
