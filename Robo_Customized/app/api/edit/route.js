import { NextResponse } from "next/server";
import openai from "@/lib/openai";

export async function POST(req) {
  try {
    const { message } = await req.json();

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are a friendly helpful AI agent." },
        { role: "user", content: message }
      ]
    });

    const reply = response.choices[0].message.content;

    return NextResponse.json({ reply });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ reply: "Error generating response." });
  }
}
