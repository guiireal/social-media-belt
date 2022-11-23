import { Link } from "@prisma/client";
import { Session } from "next-auth";

export type LinkPaginationWrapper = {
  items: Link[];
  nextCursor: string;
  previousCursor: string;
};

export type Error = {
  message: string;
};

export type AppSession = (Session & { user: { id: string } }) | null;
