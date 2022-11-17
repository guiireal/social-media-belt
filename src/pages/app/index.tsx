import { useGet } from "@/hooks/api";
import { Tenant } from "@prisma/client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function AppPage() {
  const { data: session } = useSession();
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const { data } = useGet<Tenant[]>("/api/tenants");
  const router = useRouter();

  useEffect(() => {
    if (data && data.length === 1) {
      setShouldRedirect(true);
    }
  }, [data]);

  useEffect(() => {
    if (data && shouldRedirect) {
      setTimeout(() => {
        router.push(`/app/${data[0].id}`);
      }, 3000);
      setShouldRedirect(false);
    }
  }, [shouldRedirect, router, data]);

  if (!session?.user) {
    return null;
  }

  const { name, image } = session.user;

  if (!name || !image) {
    return null;
  }

  return (
    <div className="max-w-lg mx-auto my-6 text-center">
      <Image
        src={image}
        alt={name}
        className="inline-block w-16 rounded-full"
        width={100}
        height={100}
      />
      <h1>{name}</h1>
      <div className="mt-6">
        {data &&
          data.length > 1 &&
          data.map((tenant) => (
            <Link
              key={tenant.id}
              href={`/app/${tenant.id}`}
              className="inline-block w-full px-4 py-2 text-base font-medium text-center text-black bg-white border rounded-md hover:bg-gray-100"
            >
              {tenant.name}
            </Link>
          ))}
      </div>
      <div className="flex items-center justify-center">
        <svg
          width={38}
          className="fill-blue-400"
          height={38}
          viewBox="0 0 38 38"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient
              x1="8.042%"
              y1="0%"
              x2="65.682%"
              y2="23.865%"
              id="a"
            >
              <stop stopColor="#60a5fa" stopOpacity={0} offset="0%" />
              <stop stopColor="#60a5fa" stopOpacity=".631" offset="63.146%" />
              <stop stopColor="#60a5fa" offset="100%" />
            </linearGradient>
          </defs>
          <g fill="none" fillRule="evenodd">
            <g transform="translate(1 1)">
              <path
                d="M36 18c0-9.94-8.06-18-18-18"
                id="Oval-2"
                stroke="url(#a)"
                strokeWidth={2}
              >
                <animateTransform
                  attributeName="transform"
                  type="rotate"
                  from="0 18 18"
                  to="360 18 18"
                  dur="0.9s"
                  repeatCount="indefinite"
                />
              </path>
              <circle fill="#fff" cx={36} cy={18} r={1}>
                <animateTransform
                  attributeName="transform"
                  type="rotate"
                  from="0 18 18"
                  to="360 18 18"
                  dur="0.9s"
                  repeatCount="indefinite"
                />
              </circle>
            </g>
          </g>
        </svg>
      </div>
    </div>
  );
}
