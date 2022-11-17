import prisma from "@/services/prisma";
import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  const session = await getSession({ req: request });

  if (session) {
    const linkId = String(request.query.linkId);

    if (request.method === "DELETE") {
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
