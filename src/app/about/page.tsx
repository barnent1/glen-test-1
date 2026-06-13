import type { Metadata } from "next";
import { ContactInfo } from "@/components/ContactInfo";
import { mockContact, mockCompany, mockTeamMembers } from "@/lib/mockData";

export const metadata: Metadata = {
  title: "About | Quetrex Foundation",
  description:
    "Learn about the Quetrex Foundation — our mission, team, and contact information.",
};

export default function AboutPage() {
  return (
    <main>
      <section>
        <h1>{mockCompany.name}</h1>
        <p>{mockCompany.tagline}</p>
        <p>{mockCompany.description}</p>
      </section>

      <section>
        <h2>Our Team</h2>
        <ul>
          {mockTeamMembers.map((member) => (
            <li key={member.id}>
              <strong>{member.name}</strong> — {member.role}
              <p>{member.bio}</p>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <ContactInfo contact={mockContact} />
      </section>
    </main>
  );
}
