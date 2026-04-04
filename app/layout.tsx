import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Agent Verse - AI Topics Crash Course",
  description: "An interactive course on AI agents, skills, memory, and token optimization.",
  icons: {
    icon: "/Logo.png",
    shortcut: "/Logo.png",
    apple: "/Logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${plusJakartaSans.variable} h-full`}>
      <head>
        <link rel="icon" href="/Logo.png?v=3" type="image/png" />
        <link rel="shortcut icon" href="/Logo.png?v=3" type="image/png" />
        <link rel="apple-touch-icon" href="/Logo.png?v=3" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
        />
      </head>
      <body className="h-full" suppressHydrationWarning>{children}</body>
    </html>
  );
}
