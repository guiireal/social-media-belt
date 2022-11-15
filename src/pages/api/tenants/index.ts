import prisma from "@/services/prisma";
import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import type { TenantData } from "./../../../types/index";

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse<TenantData[]>
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
