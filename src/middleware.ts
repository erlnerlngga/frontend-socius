import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { UserType, VerifyResType } from "@/utils/types";
import env from "@/utils/constant";

// export const config = {
//   matcher: ["/auth/:token*", "/home", "/signout"],
// };

const checkVerify = async (tokenString: string) => {
  const res = await fetch(`${env.url_api}/auth/${tokenString}`, {
    credentials: "include",
  });

  if (!res.ok) throw new Error("failed to fecth");

  return res.json();
};

const justCheck = async (tokenString: string) => {
  const res = await fetch(`${env.url_api}/justCheck/${tokenString}`, {
    credentials: "include",
    headers: {
      Authorization: `Bearer ${tokenString}`,
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) throw new Error("failed to fecth");

  return res.json();
};

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith("/auth")) {
    const tokenString = request.nextUrl.pathname.slice(
      request.nextUrl.pathname.lastIndexOf("/") + 1
    );

    const res = (await checkVerify(tokenString)) as VerifyResType;

    if (res.status === "ok") {
      // set cookie
      const response = NextResponse.redirect(new URL(`/home`, request.url));
      response.cookies.set({
        name: "token-user",
        value: res.token,
        path: "/",
        expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
        maxAge: 60 * 60 * 24, // 24hour in seccond
        httpOnly: true,
        secure: true,
      });

      response.cookies.set({
        name: "user-data",
        value: JSON.stringify(res.user),
        path: "/",
        expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
        maxAge: 60 * 60 * 24, // 24hour in seccond
        httpOnly: true,
        secure: true,
      });

      return response;
    }

    return NextResponse.redirect(new URL(`/signup`, request.url));
  }

  if (request.nextUrl.pathname.startsWith("/home")) {
    // get the cookie

    let tokenString = request.cookies.get("token-user")?.value;
    let userDataString = request.cookies.get("user-data")?.value;

    if (!tokenString || !userDataString) {
      return NextResponse.redirect(new URL(`/signup`, request.url));
    }
    const userData = JSON.parse(userDataString) as UserType;
    const res = (await justCheck(tokenString)) as VerifyResType;

    if (res.status !== "ok") {
      return NextResponse.redirect(new URL(`/signup`, request.url));
    }

    const response = NextResponse.next();

    if (res.user.photo_profile !== userData.photo_profile) {
      response.cookies.set({
        name: "user-data",
        value: JSON.stringify(res.user),
        path: "/",
        expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
        maxAge: 60 * 60 * 24, // 24hour in seccond
        httpOnly: true,
        secure: true,
      });
    }

    return response;
  }

  if (request.nextUrl.pathname.startsWith("/signout")) {
    // get the cookie
    let tokenString = request.cookies.get("token-user")?.value;

    if (!tokenString)
      return NextResponse.redirect(new URL(`/signup`, request.url));

    const response = NextResponse.redirect(`${env.url_this}`);
    response.cookies.set({
      name: "token-user",
      value: "",
      path: "/",
      expires: 0,
      maxAge: -1,
      httpOnly: true,
    });

    response.cookies.set({
      name: "user-data",
      value: "",
      path: "/",
      expires: 0,
      maxAge: -1,
      httpOnly: true,
    });
    return response;
  }
}
