import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import MouseGlow from "@/components/MouseGlow";
import IntroLoader from "@/components/IntroLoader";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Portfolio of Zesen",
  description:
    "2019年毕业于华南理工大学工业设计系交互研究方向，拥有5年UI和UX经验，我希望用设计来解决问题。",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <body className={`${inter.className} antialiased text-white bg-brand pt-24`}>
        <IntroLoader />
        <MouseGlow />
        <Navbar />
        <div className="relative z-10">
          {children}
          <Footer />
        </div>
        <ScrollToTop />
      </body>
    </html>
  );
}
