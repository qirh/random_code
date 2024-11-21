import type { Metadata } from "next";
import "./globals.css";



export const metadata: Metadata = {
  title: "NJ Tourist Guide",
  description: "Generated by Bruce Springsteen",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body

      >
        {children}
      </body>
    </html>
  );
}
