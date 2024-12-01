import { NextResponse, NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export const middleware = async (request: NextRequest) => {
  let token = await request.cookies.get("Access_token")?.value;
  let userId = await request.cookies.get("user_id")?.value;
  const pageNonAuth = ["login"];

  const pathNow = await request.nextUrl.pathname.split("/")[1];

  // return await fetch(process.env.NEXT_PUBLIC_BASE_API + "auth/checkAuth", {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify({
  //     token: token,
  //     userId: Number(userId),
  //   }),
  // }).then(async (res: any) => {
  //   const check = await res.json();
  //   if (request.nextUrl.pathname.startsWith("/api/task") && !check.auth) {
  //     return new Response("Requires user rights", {
  //       status: 403,
  //     });
  //   }

  //   if (request.nextUrl.pathname.startsWith("/login") && check.auth === true) {
  //     return NextResponse.redirect(new URL("/", request.url));
  //   }
  //   if (!pageNonAuth.includes(pathNow) && check.auth === false) {
  //     return NextResponse.redirect(new URL("/login", request.url));
  //   }
  // });
};
