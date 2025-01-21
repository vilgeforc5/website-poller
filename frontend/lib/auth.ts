export type TokenGeneric = {
    exp: number;
    id: number;
    role: string;
    email: string;
};

export function parseJwt(token: string): TokenGeneric | null {
    try {
        return JSON.parse(atob(token.split(".")[1]));
    } catch (e) {
        return null;
    }
}

export function isTokenValid(token: string | undefined): boolean {
    if (!token) return false;
    const nowUnix = (+new Date() / 1e3) | 0;
    const decodedToken = parseJwt(token);

    if (decodedToken === null) return false;

    return decodedToken.exp > nowUnix;
}
