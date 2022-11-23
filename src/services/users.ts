import prisma from "@/services/prisma";

export async function checkTenantPermission(tenantId: string, userId: string) {
  const tenant = await prisma.tenantUser.findFirst({
    where: {
      userId,
      tenantId,
    },
  });

  return tenant;
}
