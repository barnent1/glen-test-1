export interface Company {
  name: string;
  missionStatement: string;
  description: string;
  foundingYear: number;
  values: string[];
}

export interface TeamMember {
  name: string;
  title: string;
  bio: string;
  imageUrl: string;
}

export interface Contact {
  email: string;
  phone: string;
  address: string;
  socialMedia: Record<string, string>;
}

export const company: Company = {
  name: "Quetrex Foundation",
  missionStatement:
    "Empowering communities through innovation, education, and sustainable development.",
  description:
    "The Quetrex Foundation is a nonprofit organization dedicated to fostering positive change through technology-driven solutions and community partnerships. Since our founding, we have worked to bridge the gap between resources and those who need them most.",
  foundingYear: 2010,
  values: [
    "Integrity",
    "Innovation",
    "Inclusivity",
    "Sustainability",
    "Collaboration",
  ],
};

export const teamMembers: TeamMember[] = [
  {
    name: "Alexandra Rivera",
    title: "Executive Director",
    bio: "Alexandra has over 15 years of experience in nonprofit leadership, driving strategic initiatives that have impacted thousands of lives across the region.",
    imageUrl: "https://placehold.co/200x200",
  },
  {
    name: "Marcus Chen",
    title: "Director of Programs",
    bio: "Marcus oversees all foundation programs, ensuring alignment with the organization's mission and maximizing community impact through data-driven approaches.",
    imageUrl: "https://placehold.co/200x200",
  },
  {
    name: "Priya Nair",
    title: "Head of Community Engagement",
    bio: "Priya leads outreach efforts and builds lasting relationships with community partners, volunteers, and stakeholders to amplify the foundation's reach.",
    imageUrl: "https://placehold.co/200x200",
  },
];

export const contact: Contact = {
  email: "info@quetrexfoundation.org",
  phone: "+1 (555) 234-5678",
  address: "123 Foundation Way, Suite 400, San Francisco, CA 94105",
  socialMedia: {
    twitter: "https://twitter.com/quetrexfoundation",
    linkedin: "https://linkedin.com/company/quetrexfoundation",
    facebook: "https://facebook.com/quetrexfoundation",
    instagram: "https://instagram.com/quetrexfoundation",
  },
};
