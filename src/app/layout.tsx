import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Hyperbolic Model Registry",
  description: "Internal tool to view models in the registry",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
