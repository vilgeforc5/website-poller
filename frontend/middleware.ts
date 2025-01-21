import { NextRequest, NextResponse } from "next/server";
import { refresh } from "@/lib/refresh";
import { isTokenValid } from "@/lib/auth";

export async function middleware(req: NextRequest, res: NextResponse) {
    try {
        const url = req.nextUrl.clone();
        url.pathname = "/login";

        const nowUnix = (+new Date() / 1e3) | 0;
        const token = req.cookies.get("token");
        const refresh_token_cookie = req.cookies.get("refresh_token");
        let tokenIsValid = isTokenValid(token?.value);

        if (req.nextUrl.pathname === "/login") {
            if (!tokenIsValid) {
                return NextResponse.next();
            } else {
                const baseUrl = req.nextUrl.clone();
                baseUrl.pathname = "/";

                return NextResponse.redirect(baseUrl);
            }
        }

        if (!tokenIsValid && req.nextUrl.pathname === "/login") {
            return NextResponse.next();
        }

        const newResponse = NextResponse.next();

        if (!tokenIsValid && !!refresh_token_cookie) {
            const { parsedRefresh, refresh_token, parsedAccess, access_token } =
                await refresh(refresh_token_cookie.value);

            newResponse.cookies.set("token", access_token, {
                path: "/",
                maxAge: parsedAccess.exp - nowUnix,
            });

            newResponse.cookies.set("refresh_token", refresh_token, {
                path: "/",
                maxAge: parsedRefresh.exp - nowUnix,
                httpOnly: true,
            });

            tokenIsValid = true;
        }

        return tokenIsValid ? newResponse : NextResponse.redirect(url);
    } catch (error) {
        const baseUrl = req.nextUrl.clone();
        baseUrl.pathname = "/";

        const destinationUrl = new URL("/login", new URL(baseUrl).origin);
        const headers = new Headers();

        headers.set("set-cookie", `token=deleted; Max-Age=0; Path=/`);
        headers.append(
            "set-cookie",
            `refresh_token=deleted; Max-Age=0; Path=/`,
        );

        return NextResponse.redirect(destinationUrl, {
            headers,
        });
    }
}

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
