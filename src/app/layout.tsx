import type { Metadata } from "next";
import clsx from "clsx";
import { Dosis } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { createClient, repositoryName } from "@/prismicio";
import { PrismicPreview } from "@prismicio/next";

const inter = Dosis({
  subsets: ["latin"]
});

export async function generateMetadata(): Promise<Metadata> {
  const client = createClient();
  const settings = await client.getSingle("settings");

  return {
    title: settings.data.meta_title,
    description: settings.data.meta_description,
    // openGraph: {
    //   images: [settings.data.og_image?.url || ""],
    // },
  };
}
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-gradient-to-br from-black via-gray-900 to-black min-h-screen  text-slate-200">
      <body className={clsx(inter.className, "relative min-h-screen")}>
        <Header/>
        {children}
        <Footer />
        <PrismicPreview repositoryName={repositoryName} />
      </body>
    </html>
  );
}
