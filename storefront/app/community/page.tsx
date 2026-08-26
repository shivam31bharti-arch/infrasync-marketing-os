import { redirect } from "next/navigation";

// v4 folded the community page into the home band + WhatsApp gateway.
// Old links/bookmarks land here — send them home instead of a 404.
export default function CommunityRedirect() {
  redirect("/#community");
}
