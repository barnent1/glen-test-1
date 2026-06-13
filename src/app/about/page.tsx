"use client";

import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import TeamMemberCard, { type TeamMember } from "@/components/TeamMemberCard";
import ContactInfo from "@/components/ContactInfo";

// ── Inline mock data (mock-data module not yet merged to main) ──────────────

const aboutData = {
  mission:
    "The Quetrex Foundation exists to empower communities through open-access education, sustainable technology, and principled leadership — building a future where opportunity is universal and progress is shared.",

  description:
    "Founded in 2008, the Quetrex Foundation is a non-profit organisation dedicated to fostering human potential across underserved regions. We partner with local governments, academic institutions, and technology innovators to deliver programmes that create lasting change at the community level.",

  foundingYear: 2008,

  values: [
    "Transparency & Accountability",
    "Community-First Approach",
    "Lifelong Learning",
    "Sustainable Impact",
    "Inclusive Innovation",
  ],
};

const teamMembers: TeamMember[] = [
  {
    name: "Dr. Amara Osei",
    title: "Executive Director",
    bio: "Amara leads the Foundation's global strategy with over 20 years of experience in international development and social enterprise.",
    imageUrl: "https://api.dicebear.com/7.x/personas/svg?seed=amara",
  },
  {
    name: "Lena Brandt",
    title: "Head of Education Programmes",
    bio: "Lena designs and oversees curriculum partnerships with universities across three continents, reaching 50,000+ learners annually.",
    imageUrl: "https://api.dicebear.com/7.x/personas/svg?seed=lena",
  },
  {
    name: "Marcus Tran",
    title: "Director of Technology & Innovation",
    bio: "Marcus drives the Foundation's open-source technology initiatives and mentors emerging engineers from underrepresented communities.",
    imageUrl: "https://api.dicebear.com/7.x/personas/svg?seed=marcus",
  },
  {
    name: "Sofía Reyes",
    title: "Community Partnerships Lead",
    bio: "Sofía cultivates relationships with grassroots organisations and local governments, ensuring every project is rooted in community needs.",
    imageUrl: "https://api.dicebear.com/7.x/personas/svg?seed=sofia",
  },
  {
    name: "James Okafor",
    title: "Finance & Operations Manager",
    bio: "James maintains rigorous financial oversight and operational excellence across the Foundation's 12-country programme footprint.",
    imageUrl: "https://api.dicebear.com/7.x/personas/svg?seed=james",
  },
  {
    name: "Priya Nair",
    title: "Communications Director",
    bio: "Priya amplifies the Foundation's impact through strategic storytelling, media partnerships, and a global digital presence.",
    imageUrl: "https://api.dicebear.com/7.x/personas/svg?seed=priya",
  },
];

const contactData = {
  email: "hello@quetrexfoundation.org",
  phone: "+1 (555) 012-3456",
  address: "42 Horizon Way, Suite 800, San Francisco, CA 94105, USA",
  socialMedia: [
    { platform: "LinkedIn", url: "https://linkedin.com/company/quetrex-foundation" },
    { platform: "X / Twitter", url: "https://twitter.com/quetrexfoundation" },
    { platform: "Instagram", url: "https://instagram.com/quetrexfoundation" },
  ],
};

// ── Framer Motion variants ──────────────────────────────────────────────────

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: "easeOut" as const },
  },
};

const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

// ── Page component ──────────────────────────────────────────────────────────

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <main className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8 space-y-16">
        {/* ── Mission ── */}
        <motion.section
          aria-labelledby="mission-heading"
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
          className="rounded-2xl bg-indigo-700 px-8 py-12 text-white shadow-lg text-center"
        >
          <h1
            id="mission-heading"
            className="text-3xl font-bold tracking-tight sm:text-4xl mb-6"
          >
            Our Mission
          </h1>
          <p className="text-lg leading-relaxed text-indigo-100 max-w-3xl mx-auto">
            {aboutData.mission}
          </p>
        </motion.section>

        {/* ── Company description & founding info ── */}
        <motion.section
          aria-labelledby="who-we-are-heading"
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
          className="grid gap-8 md:grid-cols-2"
        >
          <div>
            <h2
              id="who-we-are-heading"
              className="text-2xl font-bold text-gray-900 mb-4"
            >
              Who We Are
            </h2>
            <p className="text-gray-600 leading-relaxed">{aboutData.description}</p>
            <p className="mt-4 text-sm font-medium text-indigo-600">
              Founded in {aboutData.foundingYear}
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Values</h2>
            <ul className="space-y-3">
              {aboutData.values.map((value) => (
                <li key={value} className="flex items-start gap-3">
                  <span
                    aria-hidden="true"
                    className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-indigo-500"
                  />
                  <span className="text-gray-700">{value}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.section>

        {/* ── Team grid ── */}
        <section aria-labelledby="team-heading">
          <h2
            id="team-heading"
            className="text-2xl font-bold text-gray-900 mb-8 text-center"
          >
            Meet the Team
          </h2>

          <motion.div
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {teamMembers.map((member) => (
              <motion.div key={member.name} variants={cardVariants}>
                <TeamMemberCard member={member} />
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* ── Contact information ── */}
        <motion.section
          aria-labelledby="contact-heading"
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
        >
          <h2
            id="contact-heading"
            className="text-2xl font-bold text-gray-900 mb-8 text-center"
          >
            Get in Touch
          </h2>
          <div className="max-w-lg mx-auto">
            <ContactInfo contact={contactData} />
          </div>
        </motion.section>
      </main>
    </div>
  );
}
