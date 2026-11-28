import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import "./not-found.css";
export const metadata:Metadata={title:{absolute:"Page Not Found | ALYOXA"},description:"This page could not be found. Return to ALYOXA's studio, work, or contact page.",robots:{index:false,follow:true}};
export default function NotFound(){return <main className="not-found-page" id="main-content"><Link href="/" aria-label="ALYOXA home"><Image src="/images/logo.svg" alt="ALYOXA" width={175} height={33}/></Link><div><p>404 / A DIFFERENT DIRECTION</p><h1>This page<br/><em>is out of the frame.</em></h1><p>The page you are looking for could not be found. Let us point you somewhere useful.</p><nav aria-label="Find your way"><Link href="/">Back to the studio <span aria-hidden="true">&#8599;</span></Link><Link href="/work">Explore our work</Link><Link href="/contact">Get in touch</Link></nav></div></main>;}
