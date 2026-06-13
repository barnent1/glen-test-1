"use client";

import { motion } from "framer-motion";
import TeamMemberCard, { TeamMember } from "@/components/TeamMemberCard";
import ContactInfo from "@/components/ContactInfo";

// Inline stub — mirrors the shape of data that src/lib/data.ts will export when merged
const teamMembers: TeamMember[] = [
  {
    name: "Dr. Amara Osei",
    title: "Executive Director",
    bio: "Amara has over 20 years of experience in non-profit leadership, driving systemic change across sub-Saharan Africa and Southeast Asia.",
    imageUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop",
  },
  {
    name: "Lena Kovač",
    title: "Director of Programs",
    bio: "Lena specialises in designing scalable education programmes that reach under-served communities in urban and rural settings.",
    imageUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop",
  },
  {
    name: "James Okafor",
    title: "Head of Technology",
    bio: "James leads our digital infrastructure team, ensuring that technology remains an enabler — not a barrier — for the communities we serve.",
    imageUrl: "https://images.unsplash.com/photo-1531384441138-2736e62e0919?w=400&h=400&fit=crop",
  },
];

const contact = {
  email: "hello@quetrexfoundation.org",
  phone: "+1 (800) 555-0192",
  address: "42 Innovation Drive, Suite 300, San Francisco, CA 94105",
  socialMedia: [
    { platform: "Twitter", url: "https://twitter.com/quetrex" },
    { platform: "LinkedIn", url: "https://linkedin.com/company/quetrex" },
    { platform: "Facebook", url: "https://facebook.com/quetrex" },
  ],
};

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 32 },
  animate: { opacity: 1, y: 0 },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[var(--color-background)] text-[var(--color-foreground)]">
      {/* Hero / Page Title */}
      <section
        aria-label="About us hero"
        className="relative overflow-hidden bg-gradient-to-br from-slate-900 to-slate-700 px-4 py-24 text-white sm:px-6 lg:px-24"
      >
        <motion.div
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mx-auto max-w-4xl text-center"
        >
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-slate-300">
            Our Story
          </p>
          <h1 className="mb-6 text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
            About Quetrex Foundation
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-slate-200 sm:text-xl">
            We are a non-profit organisation dedicated to bridging gaps in access to education,
            technology, and resources — empowering communities through innovation, equity, and
            sustainable impact.
          </p>
        </motion.div>
      </section>

      {/* Mission Section */}
      <section
        aria-label="Our mission"
        className="px-4 py-16 sm:px-6 lg:px-24"
      >
        <div className="mx-auto max-w-4xl">
          <motion.div
            variants={fadeInUp}
            initial="initial"
            animate="animate"
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-700 dark:bg-slate-800"
          >
            <h2 className="mb-4 text-2xl font-bold text-slate-900 dark:text-slate-100">
              Our Mission
            </h2>
            <p className="leading-relaxed text-slate-600 dark:text-slate-300">
              Empowering communities through innovation, equity, and sustainable impact. Since 2012,
              Quetrex Foundation has partnered with local communities, governments, and global
              organisations to drive measurable, lasting change in the lives of millions around
              the world.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Team Section */}
      <section
        aria-label="Our team"
        className="px-4 py-16 sm:px-6 lg:px-24"
      >
        <div className="mx-auto max-w-6xl">
          <motion.h2
            variants={fadeInUp}
            initial="initial"
            animate="animate"
            transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
            className="mb-10 text-center text-2xl font-bold text-slate-900 dark:text-slate-100 sm:text-3xl"
          >
            Meet Our Team
          </motion.h2>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {teamMembers.map((member) => (
              <motion.div
                key={member.name}
                variants={fadeInUp}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                <TeamMemberCard member={member} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        aria-label="Contact"
        className="px-4 pb-24 pt-8 sm:px-6 lg:px-24"
      >
        <div className="mx-auto max-w-4xl">
          <motion.h2
            variants={fadeInUp}
            initial="initial"
            animate="animate"
            transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
            className="mb-8 text-center text-2xl font-bold text-slate-900 dark:text-slate-100 sm:text-3xl"
          >
            Get in Touch
          </motion.h2>
          <motion.div
            variants={fadeInUp}
            initial="initial"
            animate="animate"
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          >
            <ContactInfo contact={contact} />
          </motion.div>
        </div>
      </section>
    </main>
  );
}
