import { findPaginated, save } from "@/services/links";
import { Error, LinkPaginationWrapper } from "@/types/index";

import { Link } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse<Link | LinkPaginationWrapper | Error>
) {
  const session = await getSession({ req: request });

  if (session) {
    const tenantId = String(request.query.tenantId);

    if (request.method === "POST") {
      const { name, destination, publicName } = request.body;

      const createdLink = await save({
        name: String(name),
        destination: String(destination),
        publicName: String(publicName),
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
      message: "You need to be auth.",
    });
  }
}
