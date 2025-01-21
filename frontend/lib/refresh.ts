import { parseJwt } from "@/lib/auth";

export const refresh = async (oldRefresh: string) => {
    const response = await fetch("http://localhost:3000/auth/refresh", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${oldRefresh}`,
        },
    });

    if (!response.ok) {
        throw new Error();
    }

    const { access_token, refresh_token } = await response.json();

    const parsedAccess = parseJwt(access_token);
    const parsedRefresh = parseJwt(refresh_token);

    if (!parsedAccess || !parsedRefresh) {
        throw new Error();
    }

    return {
        parsedAccess,
        parsedRefresh,
        access_token,
        refresh_token,
    };
};
