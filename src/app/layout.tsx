
import type { Metadata } from "next";
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
  metadataBase: new URL("https://alyoxa.com"),
  title: {
    default: "ALYOXA® — Creative Technology Studio",
    template: "%s | ALYOXA®",
  },
  description:
    "ALYOXA is a creative technology studio building distinctive websites, digital experiences, and innovative technology solutions.",
  applicationName: "ALYOXA",
  openGraph: {
    type: "website",
    siteName: "ALYOXA",
    title: "ALYOXA® — Creative Technology Studio",
    description:
      "Distinctive websites, digital experiences, and innovative technology solutions.",
    url: "https://alyoxa.com",
  },
  robots: {
    index: true,
    follow: true,
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
        {children}
      </body>
    </html>
  );
}
