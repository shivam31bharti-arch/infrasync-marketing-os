import { redirect } from "next/navigation";

// v4: single-page site — workshop registration lives on the homepage.
export default function WorkshopPage() {
  redirect("/#register");
}
