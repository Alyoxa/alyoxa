import { NextResponse } from "next/server";
import { createHash } from "node:crypto";
export const runtime = "nodejs";
const allowed = ["Brand systems","Digital experiences","Product design","Creative technology","Not sure yet"];
const fail = (error:string,status:number) => NextResponse.json({error},{status});
export async function POST(request:Request) {
 const origin=request.headers.get("origin");
 if(origin&&origin!==new URL(request.url).origin)return fail("This request is not allowed.",403);
 let input:unknown;
 try { const raw=await request.text();if(raw.length>12000)return fail("Your enquiry is too long.",413);input=JSON.parse(raw); }
 catch { return fail("Please provide a valid project enquiry.",400); }
 if(!input||typeof input!=="object"||Array.isArray(input))return fail("Please provide a valid project enquiry.",400);
 const body=input as Record<string,unknown>;
 const field=(key:string,max:number,required=false)=>{const value=body[key];if(value===undefined&&!required)return "";if(typeof value!=="string"||value.length>max)return null;return value.trim();};
 const projectType=body.projectType;
 if(!Array.isArray(projectType)||!projectType.length||projectType.length>5||projectType.some(item=>typeof item!=="string"||!allowed.includes(item)))return fail("Choose a service, or select Not sure yet.",400);
 const clientName=field("clientName",80,true),clientEmail=field("clientEmail",254,true),projectIdea=field("projectIdea",1200,true),companyName=field("companyName",100),budgetRange=field("budgetRange",100),timing=field("timing",80);
 if(!clientName||/[\r\n]/.test(clientName)||!clientEmail||!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(clientEmail)||!projectIdea||projectIdea.length<20||companyName===null||budgetRange===null||timing===null)return fail("Please check your name, email, and project details.",400);
 const apiKey=process.env.RESEND_API_KEY,from=process.env.RESEND_FROM;
 if(!apiKey||!from){console.error("Project inquiry email service is not configured.");return fail("Email is temporarily unavailable. Your brief is saved. Please try again or email hello@alyoxa.com.",503);}
 const fields=[["Project type",[...new Set(projectType)].join(" / ")],["Company / brand",companyName||"Not provided"],["Client name",clientName],["Client email",clientEmail],["Budget range",budgetRange||"Let's discuss"],["Timing",timing||"Exploring options"],["Project idea",projectIdea]];
 const text=fields.map(([label,value])=>`${label}:\n${value}`).join("\n\n");
 const idempotencyKey="project/"+createHash("sha256").update(text).digest("hex");
 try {
  const response=await fetch("https://api.resend.com/emails",{method:"POST",headers:{Authorization:`Bearer ${apiKey}`,"Content-Type":"application/json","Idempotency-Key":idempotencyKey},body:JSON.stringify({from,to:["hello@alyoxa.com"],reply_to:clientEmail,subject:`New ALYOXA project inquiry - ${clientName}`,text}),signal:AbortSignal.timeout(15000)});
  const data=await response.json();
  if(!response.ok||typeof data.id!=="string"){console.error("Project inquiry delivery failed:",response.status);return fail("We couldn't send your enquiry. Your brief is saved; please try again.",502);}
  return NextResponse.json({success:true,id:data.id});
 } catch { console.error("Project inquiry email request failed.");return fail("We couldn't send your enquiry. Your brief is saved; please try again.",502); }
}
