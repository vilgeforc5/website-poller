import { NextRequest, NextResponse } from "next/server";

export async function POST(req: Request | NextRequest) {
    try {
        const headers = new Headers();
        const url = req.url;

        if (!url) {
            throw new Error("No URL");
        }

        headers.set("set-cookie", `token=deleted; Max-Age=0; Path=/`);
        headers.append(
            "set-cookie",
            `refresh_token=deleted; Max-Age=0; Path=/`,
        );

        const destinationUrl = new URL("/login", new URL(url).origin);

        return NextResponse.redirect(destinationUrl, {
            headers,
        });
    } catch {
        return new Response("Error", { status: 500 });
    }
}
