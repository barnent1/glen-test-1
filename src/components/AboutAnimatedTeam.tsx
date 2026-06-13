"use client";

import { motion, MotionConfig } from "framer-motion";
import TeamMemberCard, { type TeamMember } from "@/components/TeamMemberCard";

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

interface AboutAnimatedTeamProps {
  teamMembers: TeamMember[];
}

export default function AboutAnimatedTeam({ teamMembers }: AboutAnimatedTeamProps) {
  return (
    <MotionConfig reducedMotion="user">
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
    </MotionConfig>
  );
}
