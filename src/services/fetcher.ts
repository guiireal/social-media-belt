export async function fetcher(...allArgs: any) {
  const args = allArgs;
  return fetch(args).then((response) => response.json());
}

export async function store(url: string, data: any) {
  const returnData = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return returnData.json();
}

export async function destroy(url: string) {
  const returnData = await fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return returnData.json();
}
