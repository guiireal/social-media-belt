export default async function fetcher(...args: any) {
  // @ts-ignore
  return fetch(...args).then((response) => response.json());
}
