import prisma from "@/services/prisma";

export default async function findTenantBySlug(slug: string) {
  return await prisma.tenant.findFirst({
    select: {
      id: true,
      name: true,
    },
    where: {
      slug,
    },
  });
}
