
import Footer from "@/components/layout/footer/Footer";
import Navbar from "@/components/layout/Navbar/NavBar";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Learn how ALYOXA collects, uses, and protects personal information.",
  alternates: {
    canonical: "https://alyoxa.com/privacy-policy",
  },
};

const sections = [
  {
    title: "Information We Collect",
    content:
      "When you contact ALYOXA, submit a project inquiry, or complete one of our advertising lead forms, we may receive information such as your name, email address, phone number, company details, project requirements, and any other information you choose to share. Our website hosting and security services may also process technical information such as IP addresses, browser details, and access logs.",
  },
  {
    title: "How We Use Your Information",
    content:
      "We use personal information to respond to inquiries, discuss potential projects, prepare proposals, communicate with clients, provide requested services, and maintain the security and functionality of our website. Where applicable and permitted, we may also use information for marketing communications.",
  },
  {
    title: "Facebook & Instagram Advertising",
    content:
      "If you contact ALYOXA through a Facebook or Instagram advertisement or lead form, we may receive the contact details and responses you submit. We use this information to follow up on your inquiry and discuss the services you requested. Meta also processes information under its own privacy policy.",
  },
  {
    title: "Cookies & Analytics",
    content:
      "Our website and its service providers may use essential cookies or similar technologies for functionality and security. If analytics or advertising tracking technologies are enabled, they may collect information about website interactions. Where required, we will provide appropriate notice and consent choices.",
  },
  {
    title: "Sharing Information",
    content:
      "Information may be processed by trusted service providers supporting website hosting, email communication, business operations, or advertising lead management. We may also disclose information where legally required. Our use of third-party providers is subject to their applicable terms and privacy practices.",
  },
  {
    title: "Data Retention & Security",
    content:
      "We retain personal information for as long as reasonably necessary for the purposes described in this policy, including responding to inquiries, maintaining relevant business records, and meeting applicable legal obligations. We take reasonable measures to protect personal information, although no internet-based system can guarantee complete security.",
  },
  {
    title: "Your Privacy Choices",
    content:
      "You may contact us to request access to, correction of, or deletion of your personal information, or to object to certain uses where applicable law provides those rights. You can also ask us to stop sending direct marketing communications. Requests may be subject to applicable legal requirements and exceptions.",
  },
  {
    title: "International Data Processing",
    content:
      "ALYOXA works with people and businesses internationally. Information may be processed in countries other than your own, including locations where our service providers operate. Applicable privacy and data protection requirements will govern such processing.",
  },
  {
    title: "External Websites",
    content:
      "Our website may contain links to third-party websites and platforms. We are not responsible for the privacy practices of those external services. We encourage visitors to review their respective privacy policies.",
  },
  {
    title: "Children's Privacy",
    content:
      "ALYOXA's services are intended for businesses and professional clients. We do not knowingly seek to collect personal information from children. If you believe a child has provided information to us, please contact us.",
  },
  {
    title: "Updates to This Policy",
    content:
      "We may update this Privacy Policy to reflect changes in our services, data practices, or applicable requirements. The latest version will be published on this page with an updated effective date.",
  },
];

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-[#fcf7f1] text-zinc-800">
      <Navbar />

      {/* HERO — ORIGINAL ALYOXA STYLE */}
      <section className="px-5 pb-20 pt-40 sm:px-8 sm:pb-28 sm:pt-48">
        <div className="mx-auto max-w-[1400px]">
          <div
            className="
              inline-flex rounded-lg border border-zinc-800
              bg-zinc-900 px-3.5 py-1.5
              text-[10px] font-medium uppercase
              text-white shadow-2xl
              sm:px-7 sm:text-sm
            "
          >
            <span className="tracking-wider">
              YOUR PRIVACY MATTERS
            </span>
          </div>

          <h1
            className="
              mt-8 font-bold text-zinc-800
              text-[clamp(2.15rem,9.4vw,3.5rem)]
              leading-[1.03] tracking-[-0.055em]
              sm:text-[clamp(3rem,8vw,7.5rem)]
              sm:leading-[0.9]
              sm:tracking-[-0.045em]
            "
          >
            PRIVACY
            <br />
            <span className="italic text-zinc-600">
              POLICY.
            </span>
          </h1>

          <p className="mt-8 max-w-[680px] text-lg leading-relaxed text-zinc-500 sm:text-xl">
            At ALYOXA, we respect your privacy and believe
            transparency matters. This policy explains how
            we handle personal information when you visit
            our website, contact us, or connect with us
            through our advertising.
          </p>

          <p className="mt-6 text-sm text-zinc-500">
            Effective date: November 11, 2026
          </p>
        </div>
      </section>

      {/* POLICY SECTIONS — NEW EDITORIAL LAYOUT */}
      <section className="px-5 pb-20 sm:px-8 sm:pb-32">
        <div className="mx-auto max-w-[1400px]">
          <div className="border-t border-zinc-300">
            {sections.map((section) => (
              <article
                key={section.title}
                className="
                  grid gap-5 border-b border-zinc-300
                  py-9 sm:py-12
                  lg:grid-cols-[0.7fr_1.3fr]
                  lg:gap-20 lg:py-16
                "
              >
                {/* Section Title */}
                <h2
                  className="
                    max-w-[430px]
                    text-xl font-bold
                    leading-[1.2]
                    tracking-[-0.04em]
                    text-zinc-800
                    sm:text-2xl lg:text-3xl
                  "
                >
                  {section.title}
                </h2>

                {/* Section Description */}
                <p
                  className="
                    max-w-[740px]
                    text-base leading-[1.85]
                    text-zinc-600
                    sm:text-lg
                  "
                >
                  {section.content}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* PRIVACY CONTACT — NEW CLOSING */}
      <section className="px-5 pb-24 sm:px-8 sm:pb-36">
        <div className="mx-auto max-w-[1400px]">
          <div
            className="
              relative overflow-hidden
              rounded-2xl bg-zinc-900
              px-6 py-12 text-white
              sm:px-12 sm:py-16
              lg:px-16 lg:py-20
            "
          >
            <div className="grid items-end gap-12 lg:grid-cols-[1fr_auto]">
              <div>
                {/* Trademark Capsule */}
                <span
                  className="
                    inline-flex rounded-lg
                    border border-white/20
                    bg-white/10 px-3.5 py-1.5
                    text-[10px] font-medium
                    uppercase tracking-wider
                    text-white
                    sm:px-7 sm:text-sm
                  "
                >
                  GET IN TOUCH
                </span>

                <h2
                  className="
                    mt-8 font-bold
                    text-[clamp(2.15rem,7vw,5.5rem)]
                    leading-[0.95]
                    tracking-[-0.055em]
                  "
                >
                  YOUR PRIVACY.
                  <br />
                  <span className="italic text-zinc-400">
                    OUR PRIORITY.
                  </span>
                </h2>

                <p className="mt-7 max-w-xl text-base leading-relaxed text-zinc-300 sm:text-lg">
                  Questions about your personal information,
                  privacy rights, or data requests?
                  Reach out to ALYOXA directly.
                </p>
              </div>

              <a
                href="mailto:hello@alyoxa.com?subject=Privacy%20Request"
                className="
                  group inline-flex w-fit max-w-full
                  items-center gap-3 border-b border-white/60
                  pb-2 text-lg font-medium
                  tracking-[-0.035em]
                  transition-colors hover:text-zinc-300
                  sm:text-2xl
                "
              >
                <span className="break-all">
                  hello@alyoxa.com
                </span>
                <ArrowUpRight
                  aria-hidden="true"
                  className="
                    h-5 w-5 shrink-0
                    transition-transform duration-300
                    group-hover:-translate-y-1
                    group-hover:translate-x-1
                  "
                />
              </a>
            </div>
          </div>

          <div className="mt-10">
            <Link
              href="/"
              className="
                text-sm font-medium uppercase
                tracking-wider text-zinc-500
                transition-colors hover:text-zinc-900
              "
            >
              ← Back to ALYOXA
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
