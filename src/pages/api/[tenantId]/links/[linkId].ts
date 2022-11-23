import prisma from "@/services/prisma";
import { checkTenantPermission } from "@/services/users";
import type { AppSession, Error } from "@/types/index";
import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse<Error | { id?: string; success: boolean }>
) {
  const session = (await getSession({ req: request })) as AppSession;

  if (session) {
    const tenantId = String(request.query.tenantId);
    const linkId = String(request.query.linkId);

    const tenant = await checkTenantPermission(tenantId, session?.user?.id);

    if (!tenant) {
      return response.send({ message: "You need to be auth" });
    }

    if (request.method === "DELETE") {
      const link = await prisma.link.findFirst({
        where: {
          id: linkId,
          tenantId,
        },
      });

      if (!link) {
        return response.send({ message: "You need to be auth" });
      }

      await prisma.link.delete({
        where: {
          id: linkId,
        },
      });
      response.send({ id: linkId, success: true });
    }
    response.send({ id: linkId, success: false });
  } else {
    response.send({ success: true });
  }
}
