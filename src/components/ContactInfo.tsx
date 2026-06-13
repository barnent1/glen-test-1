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

export default function ContactInfo({ contact }: ContactInfoProps) {
  return (
    <div className="rounded-lg border bg-white p-6 shadow-sm">
      <div className="space-y-4">
        <div className="flex flex-col gap-1">
          <span className="text-sm font-medium text-gray-500">Email</span>
          <span className="text-base text-gray-900">{contact.email}</span>
        </div>

        <div className="flex flex-col gap-1">
          <span className="text-sm font-medium text-gray-500">Phone</span>
          <span className="text-base text-gray-900">{contact.phone}</span>
        </div>

        <div className="flex flex-col gap-1">
          <span className="text-sm font-medium text-gray-500">Address</span>
          <span className="text-base text-gray-900">{contact.address}</span>
        </div>

        {contact.socialMedia.length > 0 && (
          <div className="flex flex-col gap-2">
            <span className="text-sm font-medium text-gray-500">Social Media</span>
            <div className="flex flex-wrap gap-2">
              {contact.socialMedia.map((item) => (
                <a
                  key={item.platform}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 rounded-md border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  {item.platform}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
