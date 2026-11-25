import { pageMetadata } from "@/lib/seo";
import { PageStructuredData } from "@/components/seo/StructuredData";
import LegalDocument from "../LegalDocument";
import content from "./content.json";
export const metadata = pageMetadata("/terms-and-conditions");
export default function TermsAndConditions() { return <><PageStructuredData path="/terms-and-conditions"/><LegalDocument document={content}/></>; }
