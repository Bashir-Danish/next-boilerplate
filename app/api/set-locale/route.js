import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(req) {
  try {
    const { locale } = await req.json();

    const localeCookie = cookies().get("NEXT_LOCALE");
    if (localeCookie?.value !== locale) {
      cookies().set("NEXT_LOCALE", locale);
    //   console.log('Locale changed to', locale);
      return NextResponse.json({ changed: true }, { status: 200 });
    }
    return NextResponse.json({ changed: false }, { status: 200 });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { message: "Internal server error." },
      { status: 500 }
    );
  }
}
