"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import { studioContact } from "@/lib/studioContact";
import Link from "next/link";
import { animateFooter } from "./FooterAnimations";
import SectionEyebrow from "@/components/ui/SectionEyebrow/SectionEyebrow";
import BrandButton from "@/components/ui/BrandButton/BrandButton";
import "./Footer.css";

gsap.registerPlugin(useGSAP);

export default function Footer({ contactIndex = "06", showCta = true }: { contactIndex?: string; showCta?: boolean }) {
  const rootRef = useRef<HTMLElement>(null);
  useGSAP(() => {
    if (rootRef.current) return animateFooter(rootRef.current);
  }, { scope: rootRef });

  return <footer data-motion-pending ref={rootRef} className="studio-footer" id="contact" aria-label="Alyoxa contact and footer">
    {showCta && <section className="studio-footer__cta" aria-labelledby="footer-heading">
      <SectionEyebrow className="studio-footer__eyebrow" index={contactIndex} category="Contact">Let’s create together</SectionEyebrow>
      <h2 id="footer-heading"><span>Your next big idea</span><em>starts here.</em></h2>
      <BrandButton className="studio-footer__talk" shape="orb" href="/contact" label="LET’S TALK" />
    </section>}
    <Link href="/" className="studio-footer__wordmark" aria-label="Alyoxa home"><Image src="/images/logo.svg" alt="ALYOXA" width={2014} height={370} sizes="100vw" /></Link>
    <div className="studio-footer__bottom">
      <div className="studio-footer__main-row">
        <a className="studio-footer__email" href="mailto:hello@alyoxa.com">hello@alyoxa.com</a>
        <nav className="studio-footer__nav" aria-label="Footer navigation"><Link href="/work">Work</Link><Link href="/services">Services</Link><Link href="/approach">Approach</Link><Link href="/about">About</Link></nav>
        <div className="studio-footer__phones" aria-label="Studio phone contacts">
          {[studioContact.pk,studioContact.uk].map(phone=><div className="studio-footer__phone" key={phone.code}><span className="studio-footer__country">{phone.code} <span>{phone.label} / WhatsApp</span></span><a className="studio-footer__number" href={phone.href} target="_blank" rel="noopener noreferrer" aria-label={`Chat with Alyoxa on WhatsApp in ${phone.label} (opens in a new tab)`}>{phone.display}</a></div>)}
        </div>
      </div>
      <div className="studio-footer__legal-row"><small>© {new Date().getUTCFullYear()} ALYOXA. All rights reserved.</small><span className="studio-footer__signoff">Independent thinking. Collective ambition.</span><nav aria-label="Legal"><Link href="/privacy-policy">Privacy Policy</Link><Link href="/terms-and-conditions">Terms &amp; Conditions</Link></nav></div>
    </div>
  </footer>;
}
