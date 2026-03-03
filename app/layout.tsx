import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Preloader from "@/components/Preloader";
import Chatbot from "@/components/Chatbot";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-display" });

export const metadata: Metadata = {
  title: "Shashank Jamwal | Full Stack Developer",
  description: "Full Stack Developer & AI Automation Specialist based in Dubai",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body className={inter.className}>
        <Preloader />
        <Navbar />
        <main>{children}</main>
        <Chatbot />
      </body>
    </html>
  );
}
