import Seo from "@/components/Seo";
import Link from "next/link";

export default function HomePage() {
  return (
    <div>
      <Seo title="Social Media Belt" description="Social Media Belt" />
      <ul>
        <li>
          <Link href="/app">App</Link>
        </li>
        <li>
          <Link href="/devpleno">Tenant</Link>
        </li>
      </ul>
    </div>
  );
}
