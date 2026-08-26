import { redirect } from "next/navigation";

// Site consolidated to home + /workshop (design v3.1, 2026-08-26):
// the Generalist deep-dive now lives on the homepage.
export default function AIGeneralistPage() {
  redirect("/#ai-generalist");
}
