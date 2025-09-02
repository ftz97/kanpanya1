import "./globals.css";
import { Inter } from "next/font/google";
import { SiteHeader } from "@/components/site-header";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata = {
  title: "Kanpanya",
  description: "Découvrez les offres de vos commerçants préférés",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={inter.variable}>
      <body className="font-sans min-h-screen">
        {children}
      </body>
    </html>
  );
}
