import "./globals.css";
import { Inter } from "next/font/google";
import { SiteHeader } from "@/components/site-header";
import { ModalProvider } from "@/components/modal/ModalManager";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata = {
  title: "Kanpanya",
  description: "Découvrez les offres de vos commerçants préférés",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={inter.variable}>
      <body className="font-sans min-h-screen bg-[#F2F2F2] isolate">
        <ModalProvider>
          {children}
        </ModalProvider>
      </body>
    </html>
  );
}
