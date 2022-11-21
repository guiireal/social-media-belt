import prisma from "@/services/prisma";
import { Prisma } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

async function getPaginatedLinks(tenantId: string, cursor?: any, take?: any) {
  const takeNumber = Number(take || 5);
  const args: Prisma.LinkFindManyArgs = {
    select: {
      id: true,
      name: true,
    },
    where: {
      tenantId,
    },
    take: takeNumber,
    orderBy: {
      id: "asc",
    },
  };

  if (cursor) {
    args.cursor = {
      id: String(cursor),
    };
  }

  const links = await prisma.link.findMany(args);

  const nextLink = await prisma.link.findFirst({
    select: {
      id: true,
    },
    where: {
      id: {
        gt: links[links.length - 1].id,
      },
    },
    orderBy: {
      id: "asc",
    },
  });

  const previousLink = await prisma.link.findMany({
    select: {
      id: true,
    },
    where: {
      id: {
        lt: links[0].id,
      },
    },
    orderBy: {
      id: "desc",
    },
    take: takeNumber,
  });

  return {
    items: links,
    nextCursor: nextLink?.id || "",
    previousCursor: previousLink?.[previousLink.length - 1]?.id || "",
  };
}

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse<string>
) {
  const session = await getSession({ req: request });

  if (session) {
    const tenantId = String(request.query.tenantId);

    const { cursor, take } = request.query;

    const page1 = await getPaginatedLinks(tenantId, cursor, take);

    const page2 = await getPaginatedLinks(tenantId, page1.nextCursor, take);

    const page3 = await getPaginatedLinks(tenantId, page2.nextCursor, take);

    response.send(
      JSON.stringify(
        {
          page1,
          page2,
          page3,
        },
        null,
        2
      )
    );
  }
}
