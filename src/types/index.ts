import { Link } from "@prisma/client";

export type LinkPaginationWrapper = {
  items: Link[];
  nextCursor: string;
  previousCursor: string;
};

export type Error = {
  message: string;
};
