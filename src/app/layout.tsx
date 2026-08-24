import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

type RootLayoutProps = {
  children: React.ReactNode;
};

export const metadata: Metadata = {
  metadataBase: new URL("https://alyoxa.com"),

  title: {
    default: "ALYOXA — Creative Technology Studio",
    template: "%s | ALYOXA",
  },

  description:
    "ALYOXA is a creative technology studio building high-end digital experiences, websites, brand systems, and interactive products.",

  keywords: [
    "ALYOXA",
    "creative technology studio",
    "digital experience studio",
    "web design",
    "web development",
    "brand systems",
    "interactive experiences",
  ],

  alternates: {
    canonical: "/",
  },

  icons: {
    icon: [
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
  },

  openGraph: {
    title: "ALYOXA — Creative Technology Studio",
    description:
      "Creative technology, digital experiences, brand systems, and interactive products.",
    url: "https://alyoxa.com",
    siteName: "ALYOXA",
    type: "website",
    images: [
      {
        url: "/opengraph-image.jpg",
        width: 1200,
        height: 630,
        alt: "ALYOXA — Creative Technology Studio",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "ALYOXA — Creative Technology Studio",
    description:
      "Creative technology, digital experiences, brand systems, and interactive products.",
    images: ["/opengraph-image.jpg"],
  },

  robots: {
    index: true,
    follow: true,
  },
};



const satoshi = localFont({
  src: [
    {
      path: "../assets/fonts/Satoshi-Light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../assets/fonts/Satoshi-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../assets/fonts/Satoshi-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../assets/fonts/Satoshi-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../assets/fonts/Satoshi-Black.woff2",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-satoshi",
  display: "swap",
});


export default function RootLayout({
  children,
}: RootLayoutProps) {
  return (
    <html lang="en" className={`${satoshi.variable} no-scrollbar`}>
      <body className="no-scrollbar min-h-screen antialiased">
        {children}
      </body>
    </html>
  );
}