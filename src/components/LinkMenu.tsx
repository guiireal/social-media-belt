import Link from "next/link";
import { useRouter } from "next/router";

type ComponentProps = {
  href: string;
  children: React.ReactNode;
};

export default function LinkMenu({ children, href }: ComponentProps) {
  const router = useRouter();

  const { pathname } = router;

  const selected = pathname === href;

  return (
    <Link
      className={
        selected
          ? "flex items-center justify-start w-full p-2 pl-6 my-2 text-gray-800 transition-colors duration-200 border-l-4 border-purple-500"
          : "flex items-center justify-start w-full p-2 pl-6 my-2 text-gray-400 transition-colors duration-200 border-l-4 border-transparent hover:text-gray-800"
      }
      href={href}
    >
      {children}
    </Link>
  );
}
