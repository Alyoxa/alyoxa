import { FaFacebookF, FaInstagram, FaLinkedinIn, FaPinterestP, FaYoutube } from "react-icons/fa6";
import type { IconType } from "react-icons";
import { studioContact } from "@/lib/studioContact";
import "./SocialLinks.css";

const icons: Record<string, IconType> = { LinkedIn: FaLinkedinIn, Instagram: FaInstagram, YouTube: FaYoutube, Pinterest: FaPinterestP, Facebook: FaFacebookF };

/* ALYOXA's social profiles as round icon buttons. `tone` matches a light or dark background. */
export default function SocialLinks({ tone = "light", className = "", onNavigate }: { tone?: "light" | "dark"; className?: string; onNavigate?: () => void }) {
  return <nav className={`social-links social-links--${tone} ${className}`} aria-label="ALYOXA on social media">
    {studioContact.socials.map((social) => {
      const Icon = icons[social.label];
      return <a key={social.label} className="social-links__item" href={social.href} target="_blank" rel="noopener noreferrer me" aria-label={`ALYOXA on ${social.label}`} title={social.label} onClick={onNavigate}>
        <Icon aria-hidden="true" />
      </a>;
    })}
  </nav>;
}
