import AppLayout from "@/layouts/AppLayout";
import PublicLayout from "@/layouts/PublicLayout";
import TenantLayout from "@/layouts/TenantLayout";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import "../styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
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
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
