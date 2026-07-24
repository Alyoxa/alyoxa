import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

type RootLayoutProps = {
  children: React.ReactNode;
};

export const metadata: Metadata = {
  title: "ALYOXA",
  description:
    "Premium digital products, modern websites, and exceptional experiences.",
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
    <html lang="en" className={satoshi.variable}>
      <body className="min-h-screen antialiased font-sans">
        {children}
      </body>
    </html>
  );
}