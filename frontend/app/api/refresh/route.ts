import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { refresh } from "@/lib/refresh";

export async function POST() {
    const nowUnix = (+new Date() / 1e3) | 0;
    try {
        const cookieStore = await cookies();
        const refreshToken = cookieStore.get("refresh_token");

        if (!refreshToken) {
            throw new Error();
        }

        const { value } = refreshToken;
        const { parsedRefresh, refresh_token, parsedAccess, access_token } =
            await refresh(value);

        const headers = new Headers();

        headers.set(
            "set-cookie",
            `token=${access_token}; Max-Age=${
                parsedAccess.exp - nowUnix
            }; Path=/`,
        );
        headers.append(
            "set-cookie",
            `refresh_token=${refresh_token}; Max-Age=${
                parsedRefresh.exp - nowUnix
            }; Path=/; HttpOnly=true`,
        );

        return NextResponse.json(
            { refresh_token, access_token },
            {
                headers,
            },
        );
    } catch {
        return new Response("Error", { status: 500 });
    }
}
