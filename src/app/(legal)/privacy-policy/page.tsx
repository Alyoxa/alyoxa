import { pageMetadata } from "@/lib/seo";
import { PageStructuredData } from "@/components/seo/StructuredData";
import LegalDocument from "../LegalDocument";
import content from "./content.json";
export const metadata = pageMetadata("/privacy-policy");
export default function PrivacyPolicy() { return <><PageStructuredData path="/privacy-policy"/><LegalDocument document={content}/></>; }
