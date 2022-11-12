import AppLayout from "@/layouts/AppLayout";
import PublicLayout from "@/layouts/PublicLayout";
import TenantLayout from "@/layouts/TenantLayout";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import "../styles/globals.css";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  const router = useRouter();

  const { pathname } = router;

  let Layout = PublicLayout;

  if (pathname.indexOf("/app") === 0) {
    Layout = AppLayout;
  }

  if (pathname.indexOf("/[slug]") === 0) {
    Layout = TenantLayout;
  }

  return (
    <SessionProvider session={session}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  );
}
