import { findLinkBySlug } from "@/services/links";
import findTenantBySlug from "@/services/tenant";
import { GetServerSideProps } from "next";

export default function TenantSlugLinkSlugPage(props: any) {
  return <h1>Go!</h1>;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const tenant = await findTenantBySlug(String(context?.params?.tenantSlug));

  if (!tenant) {
    return {
      notFound: true,
    };
  }

  const link = await findLinkBySlug(
    tenant.id,
    String(context?.params?.linkSlug)
  );

  if (!link) {
    return {
      notFound: true,
    };
  }

  context.res
    .writeHead(301, {
      "Content-Type": "text/plain",
      Location: link.destination,
    })
    .end();

  return {
    props: {},
  };
};
