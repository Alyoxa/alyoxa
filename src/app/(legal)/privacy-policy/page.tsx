import type { Metadata } from "next";
import LegalDocument from "../LegalDocument";
import content from "./content.json";
export const metadata: Metadata = { title: "Privacy Policy", description: "How Alyoxa collects, uses, and protects personal information.", alternates: {canonical:"/privacy-policy"}, robots: {index:true,follow:true} };
export default function PrivacyPolicy() { return <LegalDocument document={content}/>; }
