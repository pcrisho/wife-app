import type { Metadata } from "next";
import { Cormorant_Garamond, Great_Vibes, Outfit } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-serif",
  display: "swap",
});

const greatVibes = Great_Vibes({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-script",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Christy & Cristian - Nuestra Boda",
  description: "Te invitamos a celebrar nuestra boda el 7 de Marzo de 2026",
  keywords: ["boda", "matrimonio", "Christy", "Cristian", "invitación"],
  openGraph: {
    title: "Christy & Cristian - Nuestra Boda",
    description: "Te invitamos a celebrar nuestra boda el 7 de Marzo de 2026",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${cormorant.variable} ${greatVibes.variable} ${outfit.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
