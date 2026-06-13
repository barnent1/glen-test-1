export interface Contact {
  email: string;
  phone: string;
  address: string;
  socialLinks: {
    label: string;
    url: string;
  }[];
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
}

export interface Company {
  name: string;
  tagline: string;
  description: string;
}
