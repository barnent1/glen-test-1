import type { Contact, TeamMember, Company } from "@/lib/types";

export const mockContact: Contact = {
  email: "hello@example.com",
  phone: "+1 (555) 123-4567",
  address: "123 Main Street, San Francisco, CA 94105",
  socialLinks: [
    { label: "Twitter", url: "https://twitter.com/example" },
    { label: "LinkedIn", url: "https://linkedin.com/company/example" },
    { label: "GitHub", url: "https://github.com/example" },
  ],
};

export const mockTeamMembers: TeamMember[] = [
  {
    id: "1",
    name: "Jane Smith",
    role: "CEO & Co-Founder",
    bio: "Jane brings 15 years of industry experience and a passion for innovation at Quetrex Foundation.",
  },
  {
    id: "2",
    name: "John Doe",
    role: "CTO & Co-Founder",
    bio: "John leads the Quetrex Foundation engineering team with a focus on scalable architecture.",
  },
];

export const mockCompany: Company = {
  name: "Quetrex Foundation",
  tagline: "Building the future, one line at a time.",
  description:
    "Quetrex Foundation is a team of passionate engineers and designers committed to creating world-class software solutions.",
};
