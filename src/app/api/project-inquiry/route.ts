
import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      projectType,
      companyName,
      clientName,
      clientEmail,
      projectIdea,
      budgetRange,
    } = body;

    if (
      !projectType ||
      !companyName?.trim() ||
      !clientName?.trim() ||
      !clientEmail?.trim() ||
      !projectIdea?.trim() ||
      !budgetRange
    ) {
      return NextResponse.json(
        { error: "Please complete all project fields." },
        { status: 400 }
      );
    }

    const email = String(clientEmail).trim();

    if (
      email.length > 254 ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    ) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    const fields = [
      ["Project type", projectType],
      ["Company / brand", companyName],
      ["Client name", clientName],
      ["Client email", email],
      ["Budget range", budgetRange],
      ["Project idea", projectIdea],
    ] as const;

    const { data, error } = await resend.emails.send({
      from: process.env.RESEND_FROM!,
      to: ["hello@alyoxa.com"],
      replyTo: email,
      subject: `New ALYOXA project inquiry — ${String(companyName).trim().slice(0, 100)}`,
      text: fields
        .map(([label, value]) => `${label}:\n${String(value).trim()}`)
        .join("\n\n"),
    });

    if (error) {
      console.error("Project inquiry email failed:", error);

      return NextResponse.json(
        { error: "We couldn't send your inquiry. Please try again." },
        { status: 502 }
      );
    }

    return NextResponse.json({
      success: true,
      id: data?.id,
    });
  } catch (error) {
    console.error("Project inquiry request failed:", error);

    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
    