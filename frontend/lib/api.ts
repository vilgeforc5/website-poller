import { cookies } from "next/headers";

export const serverFetch = async <T>(
    segment: string,
    init: RequestInit = { headers: {} },
): Promise<T> => {
    const headersList = await cookies();
    const token = headersList.get("token");

    const response = await fetch(process.env.BASE_API_URL + segment, {
        ...init,
        headers: {
            ...init.headers,
            Authorization: `Bearer ${token?.value}`,
            "Content-Type": "application/json",
        },
    });

    return response.json();
};
