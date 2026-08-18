import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, telefon, email, nachricht, behandlung } = body;

    if (!name || !telefon) {
      return NextResponse.json(
        { success: false, message: "Name und Telefonnummer sind erforderlich." },
        { status: 400 }
      );
    }

    // Placeholder: In production, send email via SMTP or external service
    console.log("Contact form submission:", {
      name,
      telefon,
      email,
      nachricht,
      behandlung,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json({
      success: true,
      message: "Vielen Dank fuer Ihre Anfrage. Wir melden uns zeitnah bei Ihnen.",
    });
  } catch {
    return NextResponse.json(
      { success: false, message: "Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut." },
      { status: 500 }
    );
  }
}
