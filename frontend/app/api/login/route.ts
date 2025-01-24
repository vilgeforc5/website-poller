"use server";

import { NextRequest, NextResponse } from "next/server";
import { parseJwt } from "@/lib/auth";

export async function POST(req: NextRequest) {
    const nowUnix = (+new Date() / 1e3) | 0;

    try {
        const body = await req.json();
        const response = await fetch(
            process.env.BASE_API_URL + "/auth/signin",
            {
                body: JSON.stringify(body),
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            },
        );

        if (!response.ok) {
            const data = await response.json();
            return Response.json(
                { message: "Ошибка логина", data: data?.message },
                { status: 401 },
            );
        }

        const { access_token, refresh_token } = await response.json();
        const parsedAccess = parseJwt(access_token);
        const parsedRefresh = parseJwt(refresh_token);

        if (!parsedAccess || !parsedRefresh) {
            return Response.json(
                {
                    message: "Ошибка логина",
                    data: "Получены невалидные токены",
                },
                { status: 401 },
            );
        }

        const headers = new Headers(response.headers);

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
    } catch (e) {
        return Response.json(
            {
                message: "Критическая ошибка",
                data: e instanceof Error ? e.message : "",
            },
            { status: 401 },
        );
    }
}
