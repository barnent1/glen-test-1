interface SocialMediaLink {
  platform: string;
  url: string;
}

interface Contact {
  email: string;
  phone: string;
  address: string;
  socialMedia: SocialMediaLink[];
}

interface ContactInfoProps {
  contact: Contact;
}

const isSafeUrl = (u: string): boolean => /^https?:\/\//i.test(u);

export default function ContactInfo({ contact }: ContactInfoProps) {
  return (
    <section aria-label="Contact information">
      <div className="rounded-lg border bg-white p-6 shadow-sm">
        <address className="not-italic space-y-4">
          <div className="flex flex-col gap-1">
            <span className="text-sm font-medium text-gray-600">Email</span>
            <span className="text-base text-gray-900">{contact.email}</span>
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-sm font-medium text-gray-600">Phone</span>
            <span className="text-base text-gray-900">{contact.phone}</span>
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-sm font-medium text-gray-600">Address</span>
            <span className="text-base text-gray-900">{contact.address}</span>
          </div>

          {contact.socialMedia.length > 0 && (
            <div className="flex flex-col gap-2">
              <span className="text-sm font-medium text-gray-600">Social Media</span>
              <div className="flex flex-wrap gap-2">
                {contact.socialMedia.map((item) =>
                  isSafeUrl(item.url) ? (
                    <a
                      key={item.platform}
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Visit us on ${item.platform}`}
                      className="inline-flex items-center px-4 py-2 rounded-md border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-slate-500"
                    >
                      {item.platform}
                    </a>
                  ) : (
                    <span
                      key={item.platform}
                      className="inline-flex items-center px-4 py-2 rounded-md border border-gray-300 text-sm font-medium text-gray-700"
                    >
                      {item.platform}
                    </span>
                  )
                )}
              </div>
            </div>
          )}
        </address>
      </div>
    </section>
  );
}
