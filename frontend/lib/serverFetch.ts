import { cookies } from "next/headers";

export const serverFetch = async <T>(
    segment: string,
    init: RequestInit = { headers: {} },
): Promise<{ ok: boolean; data: T }> => {
    const headersList = await cookies();
    const token = headersList.get("token");
    const path = segment.startsWith("/") ? segment : `/${segment}`;

    const response = await fetch(process.env.BASE_API_URL + path, {
        ...init,
        headers: {
            ...init.headers,
            Authorization: `Bearer ${token?.value}`,
            "Content-Type": "application/json",
        },
    });

    return { data: (await response.json()) as T, ok: response.ok };
};
