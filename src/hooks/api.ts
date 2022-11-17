import { fetcher } from "@/services/fetcher";
import useSWR from "swr";

export function useGet<Type>(url?: string) {
  return useSWR<Type>(url, fetcher);
}
