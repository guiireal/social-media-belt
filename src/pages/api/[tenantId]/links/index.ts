import prisma from "@/services/prisma";
import { Link } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse<Link | Link[]>
) {
  const session = await getSession({ req: request });

  if (session) {
    const tenantId = String(request.query.tenantId);

    if (request.method === "POST") {
      const linkData = {
        name: request.body.name,
        destination: request.body.destination,
        publicName: request.body.publicName,
        tenantId,
      };

      const createdLink = await prisma.link.create({
        data: linkData,
      });

      response.send(createdLink);
    }

    const links = await prisma.link.findMany({
      where: {
        tenantId,
      },
    });

    response.send(links);
  } else {
    response.send([]);
  }
}
