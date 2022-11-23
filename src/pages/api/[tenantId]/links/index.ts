import { findPaginated, save } from "@/services/links";
import { checkTenantPermission } from "@/services/users";
import type { AppSession, Error, LinkPaginationWrapper } from "@/types/index";
import { Link } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse<Link | LinkPaginationWrapper | Error>
) {
  const session = (await getSession({
    req: request,
  })) as AppSession;

  if (session) {
    const tenantId = String(request.query.tenantId);

    const tenant = await checkTenantPermission(tenantId, session?.user?.id);

    if (!tenant) {
      response.send({ message: "You need to be auth" });
    }

    if (request.method === "POST") {
      const { name, destination, publicName, appName, slug } = request.body;

      const createdLink = await save({
        name: String(name),
        destination: String(destination),
        publicName: String(publicName),
        appName: String(appName),
        slug: String(slug),
        tenant: {
          connect: {
            id: String(tenantId),
          },
        },
      });

      response.send(createdLink);
    }

    const { cursor, take } = request.query;

    const links = await findPaginated(tenantId, cursor, take);

    response.send(links);
  } else {
    response.send({
      message: "You need to be auth",
    });
  }
}
