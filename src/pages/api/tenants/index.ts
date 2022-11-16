import prisma from "@/services/prisma";
import { Tenant } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse<Tenant[]>
) {
  const session = await getSession({ req: request });

  if (session) {
    const tenants = await prisma.tenant.findMany({
      where: {
        tenantUsers: {
          some: {
            // @ts-ignore
            userId: session.user.id,
          },
        },
      },
    });

    response.send(tenants);
  } else {
    response.send([]);
  }
}
