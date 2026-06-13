"use client";

import { motion } from "framer-motion";
import TeamMemberCard, { TeamMember } from "@/components/TeamMemberCard";

const teamMembers: TeamMember[] = [
  {
    name: "Alice Johnson",
    title: "Chief Executive Officer",
    bio: "Alice has over 15 years of experience in technology leadership, driving innovation and growth across global markets.",
    imageUrl: "https://placehold.co/400x300",
  },
  {
    name: "Bob Martinez",
    title: "Chief Technology Officer",
    bio: "Bob is a passionate engineer who has built scalable systems at some of the world's leading tech companies.",
    imageUrl: "https://placehold.co/400x300",
  },
  {
    name: "Carol Lee",
    title: "Head of Design",
    bio: "Carol brings a human-centered design philosophy to every product, creating experiences that delight and inspire.",
    imageUrl: "https://placehold.co/400x300",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function AboutPage() {
  return (
    <main className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-4 text-center">About Us</h1>
      <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
        We are a passionate team dedicated to building exceptional products and
        experiences. Meet the people behind the work.
      </p>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {teamMembers.map((member) => (
          <motion.div key={member.name} variants={itemVariants}>
            <TeamMemberCard member={member} />
          </motion.div>
        ))}
      </motion.div>
    </main>
  );
}
