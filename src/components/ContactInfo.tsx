import type { Contact } from "@/lib/types";

interface ContactInfoProps {
  contact: Contact;
}

export function ContactInfo({ contact }: ContactInfoProps) {
  const safeEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.email)
    ? contact.email
    : '';
  const safePhone = /^[\d\s+\-().]+$/.test(contact.phone)
    ? contact.phone
    : '';

  return (
    <div className="contact-info">
      <h2>Contact Us</h2>
      <ul>
        <li>
          <strong>Email:</strong>{" "}
          <a href={safeEmail ? `mailto:${safeEmail}` : '#'}>{contact.email}</a>
        </li>
        <li>
          <strong>Phone:</strong>{" "}
          <a href={safePhone ? `tel:${safePhone}` : '#'}>{contact.phone}</a>
        </li>
        <li>
          <strong>Address:</strong> {contact.address}
        </li>
      </ul>
      {contact.socialLinks.length > 0 && (
        <div className="social-links">
          <h3>Follow Us</h3>
          <ul>
            {contact.socialLinks.map((link) => (
              <li key={link.url}>
                <a
                  href={/^https?:\/\//i.test(link.url) ? link.url : "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
