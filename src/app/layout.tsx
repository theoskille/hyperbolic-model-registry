import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Model Registry",
  description: "A registry for machine learning models",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
