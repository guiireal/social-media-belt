import Seo from "@/components/Seo";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";

export default function HomePage() {
  const { data: session } = useSession();

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
      <p>
        <button onClick={() => signIn()}>Signin</button>
      </p>

      <p>
        Signed in as {session?.user?.email} <br />
        <button onClick={() => signOut()}>Sign out</button>
      </p>
    </div>
  );
}
