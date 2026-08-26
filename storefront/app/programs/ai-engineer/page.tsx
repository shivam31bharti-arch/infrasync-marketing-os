import { redirect } from "next/navigation";

// v4: single-page site — track details live in the curriculum section.
export default function AIEngineerPage() {
  redirect("/#curriculum");
}
