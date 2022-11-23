import Heading1 from "@/components/Heading1";
import Heading2 from "@/components/Heading2";
import { store } from "@/services/fetcher";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import { useRouter } from "next/router";
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import * as yup from "yup";

type NewLinkForm = {
  name: string;
  publicName: string;
  slug: string;
  destination: string;
  appLink: string;
};

const linkSchema = yup
  .object({
    name: yup.string().required(),
    publicName: yup.string().required(),
    slug: yup.string().required(),
    destination: yup.string().required(),
    appLink: yup.string().required(),
  })
  .required();

export default function TenantIdLinksCreatePage() {
  const router = useRouter();
  const { tenantId } = router.query;

  const { register, handleSubmit } = useForm<NewLinkForm>({
    resolver: yupResolver(linkSchema),
  });

  const submitStore: SubmitHandler<NewLinkForm> = async (inputs) => {
    await store(`/api/${tenantId}/links`, inputs);
    router.push(`/app/${tenantId}/links`);
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
        <form
          onSubmit={handleSubmit(submitStore)}
          className="container max-w-2xl mx-auto mt-4 shadow-md md:w-3/4"
        >
          <div className="p-4 bg-gray-100 border-t-2 border-indigo-400 rounded-lg bg-opacity-5">
            <div className="max-w-sm mx-auto md:w-full md:mx-0">
              <div className="inline-flex items-center space-x-4">
                <Heading2>Criar link</Heading2>
              </div>
            </div>
          </div>
          <div className="space-y-6 bg-white">
            <div className="items-center w-full p-4 space-y-4 text-gray-500 md:inline-flex md:space-y-0">
              <h2 className="max-w-sm mx-auto md:w-1/3">Identificação</h2>
              <div className="max-w-sm mx-auto space-y-5 md:w-2/3">
                <div>
                  <div className="relative ">
                    <input
                      type="text"
                      className="flex-1 w-full px-4 py-2 text-base text-gray-700 placeholder-gray-400 bg-white border border-transparent border-gray-300 rounded-lg shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                      placeholder="Nome do link"
                      {...register("name")}
                    />
                  </div>
                </div>
                <div>
                  <div className="relative ">
                    <input
                      type="text"
                      className="flex-1 w-full px-4 py-2 text-base text-gray-700 placeholder-gray-400 bg-white border border-transparent border-gray-300 rounded-lg shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                      placeholder="Nome público"
                      {...register("publicName")}
                    />
                  </div>
                </div>
                <div>
                  <div className="relative ">
                    <input
                      type="text"
                      className="flex-1 w-full px-4 py-2 text-base text-gray-700 placeholder-gray-400 bg-white border border-transparent border-gray-300 rounded-lg shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                      placeholder="Identificador"
                      {...register("slug")}
                    />
                  </div>
                </div>
              </div>
            </div>
            <hr />
            <div className="items-center w-full p-4 space-y-4 text-gray-500 md:inline-flex md:space-y-0">
              <h2 className="max-w-sm mx-auto md:w-1/3">Destino</h2>
              <div className="max-w-sm mx-auto space-y-5 md:w-2/3">
                <div>
                  <div className="relative ">
                    <input
                      type="text"
                      className="flex-1 w-full px-4 py-2 text-base text-gray-700 placeholder-gray-400 bg-white border border-transparent border-gray-300 rounded-lg shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                      placeholder="https://"
                      {...register("destination")}
                    />
                  </div>
                </div>
                <div>
                  <div className="relative ">
                    <input
                      type="text"
                      className="flex-1 w-full px-4 py-2 text-base text-gray-700 placeholder-gray-400 bg-white border border-transparent border-gray-300 rounded-lg shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                      placeholder="Link interno para app"
                      {...register("appLink")}
                    />
                  </div>
                </div>
              </div>
            </div>
            <hr />
            <div className="w-full px-4 pb-4 ml-auto text-gray-500 md:w-1/3">
              <button
                type="submit"
                className="w-full px-4 py-2 text-base font-semibold text-center text-white transition duration-200 ease-in bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 "
              >
                Save
              </button>
            </div>
          </div>
        </form>
      </section>
    </>
  );
}
