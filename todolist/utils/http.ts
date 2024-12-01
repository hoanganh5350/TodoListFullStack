export const httpRequest = async (
  method: "POST" | "GET",
  url: string,
  body?: any
) => {
  const response = await fetch(process.env.NEXT_PUBLIC_BASE_API + url, {
    method: method ? method : "POST",
    headers: {
      "Cache-Control": "no-cache",
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      // "Access-Control-Allow-Headers":
      //   "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
      // "Access-Control-Allow-Methods":
      //   "GET,OPTIONS,PATCH,DELETE,POST,PUT",
    },
    body: method === "GET" || !body ? undefined : JSON.stringify(body),
  });
  return await response.json();
};
