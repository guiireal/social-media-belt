import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

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
