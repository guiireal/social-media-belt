import Alert from "@/components/Alert";
import Heading1 from "@/components/Heading1";
import Heading2 from "@/components/Heading2";
import { useGet } from "@/hooks/api";
import { destroy } from "@/services/fetcher";
import { LinkPaginationWrapper } from "@/types/index";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function TenantIdLinksPage() {
  const router = useRouter();
  const { tenantId, cursor } = router.query;

  const cursorQueryParam = cursor ? `?cursor=${cursor}` : "";

  const { data, mutate } = useGet<LinkPaginationWrapper>(
    `/api/${tenantId}/links${cursorQueryParam}`
  );

  useEffect(() => {
    if (data && router) {
      if (router.query.cursor) {
        if (data.items.length === 0) {
          router.push(`/api/${tenantId}/links`);
        }
      }
    }
  }, [data, router, tenantId]);

  const submitDestroy = async (id: string) => {
    await destroy(`/api/${tenantId}/links/${id}`);
    await mutate();
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div>
          <Heading1>Gerenciador de Links</Heading1>
          <Heading2>Gerenciador de links</Heading2>
        </div>

        <div className="flex items-center">
          <Link
            href={`/app/${tenantId}/links/create`}
            className="w-full px-4 py-2 text-base font-medium text-center text-black bg-white border-t border-b border-l rounded-l-md hover:bg-gray-100"
          >
            Criar Link
          </Link>

          <button
            type="button"
            className="w-full px-4 py-2 text-base font-medium text-black bg-white border hover:bg-gray-100"
          >
            Criar Grupo
          </button>
        </div>
      </div>
      <section className="h-screen bg-gray-100 bg-opacity-50">
        {data && data?.items?.length === 0 && (
          <Alert>Nenhum link cadastrado!</Alert>
        )}
        {data && data?.items?.length > 0 && (
          <div className="container max-w-3xl px-4 mx-auto sm:px-8">
            <div className="py-8">
              <div className="flex flex-row justify-between w-full mb-1 sm:mb-0">
                <h2 className="text-2xl leading-tight">Links</h2>
                <div className="text-end">
                  <form className="flex flex-col justify-center w-3/4 max-w-sm space-y-3 md:flex-row md:w-full md:space-x-3 md:space-y-0">
                    <div className="relative ">
                      <input
                        type="text"
                        id='"form-subscribe-Filter'
                        className="flex-1 w-full px-4 py-2 text-base text-gray-700 placeholder-gray-400 bg-white border border-transparent border-gray-300 rounded-lg shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                        placeholder="name"
                      />
                    </div>
                    <button
                      className="flex-shrink-0 px-4 py-2 text-base font-semibold text-white bg-purple-600 rounded-lg shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-purple-200"
                      type="submit"
                    >
                      Filter
                    </button>
                  </form>
                </div>
              </div>
              <div className="px-4 py-4 -mx-4 overflow-x-auto sm:-mx-8 sm:px-8">
                <div className="inline-block min-w-full overflow-hidden rounded-lg shadow">
                  <table className="min-w-full leading-normal">
                    <thead>
                      <tr>
                        <th
                          scope="col"
                          className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200"
                        >
                          Nome
                        </th>
                        <th
                          scope="col"
                          className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200"
                        >
                          status
                        </th>
                        <th
                          scope="col"
                          className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200"
                        ></th>
                      </tr>
                    </thead>
                    <tbody>
                      {data &&
                        data?.items?.map((link) => (
                          <tr key={link.id}>
                            <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                              <div className="flex items-center">
                                <div className="ml-3">
                                  <p className="text-gray-900 whitespace-no-wrap">
                                    {link.name} -{" "}
                                    <span className="text-xs text-gray-400">
                                      {link.publicName}
                                    </span>
                                    <br />
                                    {link.destination}
                                  </p>
                                </div>
                              </div>
                            </td>
                            <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                              <span className="relative inline-block px-3 py-1 font-semibold leading-tight text-green-900">
                                <span
                                  aria-hidden="true"
                                  className="absolute inset-0 bg-green-200 rounded-full opacity-50"
                                ></span>
                                <span className="relative">active</span>
                              </span>
                            </td>
                            <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                              <a
                                href="#"
                                className="inline-block mx-1 text-indigo-600 hover:text-indigo-900"
                              >
                                Edit
                              </a>
                              <button
                                onClick={() => submitDestroy(link.id)}
                                className="inline-block mx-1 text-indigo-600 hover:text-indigo-900"
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                  <div className="flex flex-col items-center px-5 py-5 bg-white xs:flex-row xs:justify-between">
                    <div className="flex items-center">
                      <Link
                        href={`/app/${tenantId}/links?cursor=${data?.previousCursor}`}
                      >
                        <button
                          className="w-full p-4 text-base text-gray-600 bg-white border rounded-l-xl hover:bg-gray-100"
                          disabled={!data.previousCursor}
                        >
                          <svg
                            width={9}
                            fill="currentColor"
                            height={8}
                            viewBox="0 0 1792 1792"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M1427 301l-531 531 531 531q19 19 19 45t-19 45l-166 166q-19 19-45 19t-45-19l-742-742q-19-19-19-45t19-45l742-742q19-19 45-19t45 19l166 166q19 19 19 45t-19 45z"></path>
                          </svg>
                        </button>
                      </Link>
                      <Link
                        href={`/app/${tenantId}/links?cursor=${data?.nextCursor}`}
                      >
                        <button
                          className="w-full p-4 text-base text-gray-600 bg-white border-t border-b border-r rounded-r-xl hover:bg-gray-100"
                          disabled={!data.nextCursor}
                        >
                          <svg
                            width={9}
                            fill="currentColor"
                            height={8}
                            viewBox="0 0 1792 1792"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M1363 877l-742 742q-19 19-45 19t-45-19l-166-166q-19-19-19-45t19-45l531-531-531-531q-19-19-19-45t19-45l166-166q19-19 45-19t45 19l742 742q19 19 19 45t-19 45z"></path>
                          </svg>
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
    </>
  );
}
