
import type { Metadata } from "next";
import { pageMetadata, siteUrl } from "@/lib/seo";
import { SiteStructuredData } from "@/components/seo/StructuredData";
import localFont from "next/font/local";
import { INTRO_BOOTSTRAP } from "@/components/motion/Preloader/introState";
import "./globals.css";

const satoshi = localFont({
  src: [
    {
      path: "../../public/fonts/Satoshi-Light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../public/fonts/Satoshi-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/Satoshi-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/Satoshi-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/fonts/Satoshi-Black.woff2",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-satoshi",
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: "ALYOXA | Creative Technology Studio", template: "%s | ALYOXA" },
  description: pageMetadata("/").description,
  applicationName: "ALYOXA",
  publisher: "ALYOXA",
  creator: "ALYOXA",
  authors: [{name:"ALYOXA",url:siteUrl}],
  icons: {icon:[{url:"/images/logo-icon.svg",type:"image/svg+xml"}]},
  openGraph: pageMetadata("/").openGraph,
  twitter: pageMetadata("/").twitter,
  verification: {
    ...(process.env.GOOGLE_SITE_VERIFICATION?.trim()?{google:process.env.GOOGLE_SITE_VERIFICATION.trim()}:{}),
    ...(process.env.BING_SITE_VERIFICATION?.trim()?{other:{"msvalidate.01":process.env.BING_SITE_VERIFICATION.trim()}}:{}),
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script id="alyoxa-intro-bootstrap" dangerouslySetInnerHTML={{ __html: INTRO_BOOTSTRAP }} />
        <noscript><style>{`[data-motion-pending] { visibility: visible !important; animation: none !important; }`}</style></noscript>
      </head>
      <body className={`${satoshi.variable} antialiased`}>
        <SiteStructuredData />
        {children}
      </body>
    </html>
  );
}
