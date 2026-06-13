"use client";

import { motion } from "framer-motion";

// Inline stub — mirrors the shape that src/lib/data.ts will export when merged
interface CompanyData {
  name: string;
  mission: string;
  description: string;
  foundingYear: number;
  values: { title: string; description: string }[];
}

const companyData: CompanyData = {
  name: "Quetrex Foundation",
  mission: "Empowering communities through innovation, equity, and sustainable impact.",
  description:
    "Quetrex Foundation is a non-profit organisation dedicated to bridging gaps in access to education, technology, and resources. We partner with local communities, governments, and global organisations to drive measurable, lasting change.",
  foundingYear: 2012,
  values: [
    {
      title: "Integrity",
      description:
        "We operate with transparency and accountability in everything we do.",
    },
    {
      title: "Innovation",
      description:
        "We embrace creative solutions to tackle the world's most pressing challenges.",
    },
    {
      title: "Equity",
      description:
        "We believe every person deserves equal access to opportunity and resources.",
    },
    {
      title: "Collaboration",
      description:
        "We build strong partnerships to amplify our collective impact.",
    },
    {
      title: "Resilience",
      description:
        "We persist through adversity, learning and growing with every challenge.",
    },
    {
      title: "Community",
      description:
        "We put the needs and voices of communities at the heart of our work.",
    },
  ],
};

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 32 },
  animate: { opacity: 1, y: 0 },
};

const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function Home() {
  return (
    <main className="min-h-screen bg-[var(--color-background)] text-[var(--color-foreground)]">
      {/* Hero / Welcome Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 to-slate-700 px-6 py-24 text-white sm:px-12 lg:px-24">
        <motion.div
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mx-auto max-w-4xl text-center"
        >
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-slate-300">
            Welcome to
          </p>
          <h1 className="mb-6 text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
            {companyData.name}
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-slate-200 sm:text-xl">
            {companyData.mission}
          </p>
        </motion.div>
      </section>

      {/* About Card Section */}
      <section className="px-6 py-16 sm:px-12 lg:px-24">
        <div className="mx-auto max-w-4xl">
          <motion.div
            variants={fadeIn}
            initial="initial"
            animate="animate"
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-700 dark:bg-slate-800"
          >
            <h2 className="mb-4 text-2xl font-bold text-slate-900 dark:text-slate-100">
              About Us
            </h2>
            <p className="mb-6 leading-relaxed text-slate-600 dark:text-slate-300">
              {companyData.description}
            </p>
            <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700 dark:bg-slate-700 dark:text-slate-300">
              <span>Founded in</span>
              <span className="font-bold text-slate-900 dark:text-white">
                {companyData.foundingYear}
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="px-6 pb-24 sm:px-12 lg:px-24">
        <div className="mx-auto max-w-6xl">
          <motion.h2
            variants={fadeInUp}
            initial="initial"
            animate="animate"
            transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
            className="mb-10 text-center text-2xl font-bold text-slate-900 dark:text-slate-100 sm:text-3xl"
          >
            Our Values
          </motion.h2>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {companyData.values.map((value) => (
              <motion.div
                key={value.title}
                variants={fadeInUp}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md dark:border-slate-700 dark:bg-slate-800"
              >
                <h3 className="mb-2 text-lg font-semibold text-slate-900 dark:text-slate-100">
                  {value.title}
                </h3>
                <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </main>
  );
}
