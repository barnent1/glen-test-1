import Image from "next/image";
import clsx from "clsx";

export interface TeamMember {
  name: string;
  title: string;
  bio: string;
  imageUrl: string;
}

interface TeamMemberCardProps {
  member: TeamMember;
}

export default function TeamMemberCard({ member }: TeamMemberCardProps) {
  return (
    <div
      className={clsx(
        "rounded-lg border bg-white shadow-sm overflow-hidden flex flex-col"
      )}
    >
      <div className="relative h-48 w-full">
        <Image
          src={member.imageUrl}
          alt={`Photo of ${member.name}`}
          fill
          unoptimized
          className="object-cover"
        />
      </div>
      <div className="p-6 flex flex-col gap-2">
        <h3 className="text-lg font-semibold">{member.name}</h3>
        <p className="text-sm text-muted-foreground">{member.title}</p>
        <p className="text-sm">{member.bio}</p>
      </div>
    </div>
  );
}
