import prisma from "@/services/prisma";
import type { LinkPaginationWrapper } from "@/types/index";
import { Link } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse<Link | LinkPaginationWrapper | {}>
) {
  const session = await getSession({ req: request });

  if (session) {
    const tenantId = String(request.query.tenantId);

    if (request.method === "POST") {
      const { name, destination, publicName } = request.body;

      const createdLink = await prisma.link.create({
        data: {
          name,
          destination,
          publicName,
          tenantId,
        },
      });

      response.send(createdLink);
    }

    const { cursor, take } = request.query;
    const takeNumber = Number(take || 5);

    let links: Link[] = [];

    if (cursor) {
      links = await prisma.link.findMany({
        where: {
          tenantId,
        },
        cursor: {
          id: String(cursor),
        },
        skip: 1,
        take: takeNumber,
        orderBy: {
          id: "asc",
        },
      });
    } else {
      links = await prisma.link.findMany({
        where: {
          tenantId,
        },
        take: takeNumber,
        orderBy: {
          id: "asc",
        },
      });
    }

    response.send({
      cursor: "",
      take: 1,
      items: links,
    });
  } else {
    response.send({});
  }
}
