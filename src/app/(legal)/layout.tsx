import Image from "next/image";
import Link from "next/link";
import { studioContact } from "@/lib/studioContact";
import "./legal.css";
export default function LegalLayout({children}: {children:React.ReactNode}) {
 return <div className="legal-page"><header className="legal-page__header"><Link href="/" aria-label="Alyoxa home"><Image src="/images/logo.svg" alt="ALYOXA" width={175} height={33}/></Link><nav aria-label="Studio"><Link href="/contact">Get in touch <span aria-hidden="true">&#8599;</span></Link><Link href="/">Back to the studio</Link></nav></header><main id="main-content" className="legal-page__content">{children}</main><footer className="legal-page__footer"><div className="legal-page__contacts"><a href={`mailto:${studioContact.email}`}>{studioContact.email}</a><a href={studioContact.uk.href} target="_blank" rel="noopener noreferrer" aria-label="UK WhatsApp (opens in a new tab)">UK WhatsApp <span>{studioContact.uk.display}</span></a><a href={studioContact.pk.href} target="_blank" rel="noopener noreferrer" aria-label="Pakistan WhatsApp (opens in a new tab)">PK WhatsApp <span>{studioContact.pk.display}</span></a><a href={studioContact.website}>alyoxa.com</a></div><nav aria-label="Legal"><Link href="/privacy-policy">Privacy Policy</Link><Link href="/terms-and-conditions">Terms &amp; Conditions</Link></nav></footer></div>;
}
