"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
];

export default function Navigation() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Main navigation"
      className="flex gap-2 px-4 py-4 sm:px-6 lg:px-8"
    >
      {navLinks.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          aria-current={pathname === link.href ? "page" : undefined}
          className={`px-4 py-2 rounded font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-slate-500 ${
            pathname === link.href
              ? "underline font-semibold bg-gray-100"
              : "hover:bg-gray-50 text-gray-600 hover:text-gray-900"
          }`}
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
}
