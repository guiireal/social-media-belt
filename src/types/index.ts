import { Link } from "@prisma/client";

export type LinkPaginationWrapper = {
  cursor: string;
  take: number;
  items: Link[];
};
