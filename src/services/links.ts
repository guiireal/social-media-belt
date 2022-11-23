import prisma from "@/services/prisma";
import { Prisma } from "@prisma/client";

export async function save(linkCreateInput: Prisma.LinkCreateInput) {
  return await prisma.link.create({
    data: linkCreateInput,
  });
}

export async function findPaginated(
  tenantId: string,
  cursor?: string | string[],
  take?: string | string[]
) {
  const takeNumber = Number(take || 5);

  const args: Prisma.LinkFindManyArgs = {
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

  let nextLink = null;

  if (links.length > 0) {
    nextLink = await prisma.link.findFirst({
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
  }

  let previousLink = null;

  if (links.length > 0) {
    previousLink = await prisma.link.findMany({
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
  }

  return {
    items: links,
    nextCursor: nextLink?.id || "",
    previousCursor: previousLink?.[previousLink.length - 1]?.id || "",
  };
}
