import Head from "next/head";

type ComponentProps = {
  title: string;
  description?: string;
};

export default function Seo({ title, description }: ComponentProps) {
  return (
    <Head>
      <title>{title}</title>
      {description && <meta name="description" content={description} />}
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
}
