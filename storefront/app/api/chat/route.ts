import { NextRequest, NextResponse } from "next/server";
import { loadServerEnv, serverEnv } from "@/lib/server-env";

// POST /api/chat — site chat agent
// LLM router: Groq → Gemini → NIM (keys from .env)
// Knowledge: agent/offers.md content embedded as system prompt
// Claims policy enforced: refuses to invent, escalates unknowns

const SYSTEM_PROMPT = `You are the InfraSync course counselor — a helpful, concise AI assistant on the InfraSync website (infra-sync.online), an AI education platform by Outskill.

You answer questions ONLY from the facts below. If you don't know something or the information says "announced soon" or "TBD", say exactly that — never invent dates, prices, curriculum details, instructor names, or outcomes.

FACTS:
- Programs: 2-Day AI Workshop ($20), AI Generalist Accelerator ($1,200 intl / ₹95,000 India), AI Engineer Accelerator ($1,200 intl / ₹95,000 India)
- Workshop: 2 days, hands-on AI fundamentals, taste of both accelerator tracks, no coding experience required
- AI Generalist: for non-tech backgrounds, learn vibe coding + modern AI tool stack + building real things without engineering background
- AI Engineer: REQUIRES Python (basic-to-intermediate), covers AI-augmented engineering, performance, productivity, time management
- Certificates: issued by Outskill on program completion, verifiable with unique code + public verify page. Completion certificates only — no accreditation claims.
- Accelerator duration, schedule, exact workshop dates, curriculum modules, instructor names/bios: Not yet announced — say "announced soon"
- EMI/installment for ₹95,000: Not yet confirmed — say "details coming soon"
- Refund policy: Not yet finalized — say "details coming soon"
- Payments: Stripe (international, USD) and Razorpay (India, INR)
- Brand: Outskill (InfraSync is the project domain name)

RULES:
- Never make outcome promises ("get a job", "3x salary", "become an AI engineer in X days") — these require real data to substantiate
- Never invent fake students, testimonials, or graduate stories
- Always state the Python prerequisite when discussing the Engineer track
- If someone asks something you can't answer from the facts above, say: "I don't have that information yet. You can reach us at [contact details coming soon] or check back — we'll update the site as details are confirmed."
- Keep answers concise (2-3 sentences max unless the question requires more detail)
- Be warm and helpful, not salesy`;

const MAX_MESSAGES = 20; // per-session rate limit
const MAX_INPUT_LENGTH = 500;

type Provider = {
  name: string;
  url: string;
  keyEnv: string;
  model: string;
  headers: (key: string) => Record<string, string>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  parseResponse: (data: any) => string | null;
};

const PROVIDERS: Provider[] = [
  {
    name: "groq",
    url: "https://api.groq.com/openai/v1/chat/completions",
    keyEnv: "GROQ_API_KEY",
    model: "llama-3.1-8b-instant",
    headers: (key) => ({
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
      "User-Agent": "InfraSync-ChatAgent/1.0",
    }),
    parseResponse: (data) => data?.choices?.[0]?.message?.content || null,
  },
  {
    name: "gemini",
    url: "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-lite:generateContent",
    keyEnv: "GEMINI_API_KEY",
    model: "gemini-2.0-flash-lite",
    headers: (key) => ({
      "Content-Type": "application/json",
      "x-goog-api-key": key,
    }),
    parseResponse: (data) =>
      data?.candidates?.[0]?.content?.parts?.[0]?.text || null,
  },
  {
    name: "nim",
    url: "https://integrate.api.nvidia.com/v1/chat/completions",
    keyEnv: "NIM_API_KEY",
    model: "meta/llama-3.1-8b-instruct",
    headers: (key) => ({
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
    }),
    parseResponse: (data) => data?.choices?.[0]?.message?.content || null,
  },
];

async function callProvider(
  provider: Provider,
  messages: { role: string; content: string }[]
): Promise<string | null> {
  const key = serverEnv(provider.keyEnv);
  if (!key) return null;

  try {
    let fetchUrl = provider.url;
    let fetchBody: string;

    if (provider.name === "gemini") {
      // Gemini uses a different request format
      fetchUrl = `${provider.url}?key=${key}`;
      fetchBody = JSON.stringify({
        systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
        contents: messages
          .filter((m) => m.role !== "system")
          .map((m) => ({
            role: m.role === "assistant" ? "model" : "user",
            parts: [{ text: m.content }],
          })),
        generationConfig: { maxOutputTokens: 300, temperature: 0.3 },
      });
    } else {
      fetchBody = JSON.stringify({
        model: provider.model,
        messages,
        max_tokens: 300,
        temperature: 0.3,
      });
    }

    const res = await fetch(provider.name === "gemini" ? fetchUrl : provider.url, {
      method: "POST",
      headers: provider.headers(key),
      body: fetchBody,
      signal: AbortSignal.timeout(10000),
    });

    if (res.status === 429) return null; // rate-limited, try next
    if (!res.ok) return null;

    const data = await res.json();
    return provider.parseResponse(data);
  } catch {
    return null; // timeout or network error, try next
  }
}

export async function POST(req: NextRequest) {
  loadServerEnv();

  let body: { messages: { role: string; content: string }[]; sessionId?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { messages } = body;

  if (!Array.isArray(messages) || messages.length === 0) {
    return NextResponse.json({ error: "Messages required" }, { status: 400 });
  }

  // Rate limit: max messages per session
  if (messages.length > MAX_MESSAGES) {
    return NextResponse.json(
      {
        reply:
          "You've reached the message limit for this session. For more help, email us or check back later.",
        provider: "rate_limit",
      },
      { status: 200 }
    );
  }

  // Validate last user message length
  const lastMsg = messages[messages.length - 1];
  if (lastMsg.content.length > MAX_INPUT_LENGTH) {
    return NextResponse.json(
      { error: "Message too long (max 500 characters)" },
      { status: 400 }
    );
  }

  // Build full message array with system prompt
  const fullMessages = [
    { role: "system", content: SYSTEM_PROMPT },
    ...messages.slice(-10), // keep last 10 messages for context
  ];

  // Try providers in order
  for (const provider of PROVIDERS) {
    const reply = await callProvider(provider, fullMessages);
    if (reply) {
      return NextResponse.json({ reply, provider: provider.name });
    }
  }

  return NextResponse.json(
    {
      reply:
        "I'm temporarily unavailable. Please try again in a moment, or reach out to us directly.",
      provider: "fallback",
    },
    { status: 200 }
  );
}
