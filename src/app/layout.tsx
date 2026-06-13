import type { Metadata } from "next";
import Navigation from "@/components/Navigation";
import "./globals.css";

export const metadata: Metadata = {
  title: "App",
  description: "App description",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <header>
          <Navigation />
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}
