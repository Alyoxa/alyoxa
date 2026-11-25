import type { Metadata } from "next";
import LegalDocument from "../LegalDocument";
import content from "./content.json";
export const metadata: Metadata = { title: "Terms & Conditions", description: "Website use and general terms for working with Alyoxa.", alternates: {canonical:"/terms-and-conditions"}, robots: {index:true,follow:true} };
export default function TermsAndConditions() { return <LegalDocument document={content}/>; }
