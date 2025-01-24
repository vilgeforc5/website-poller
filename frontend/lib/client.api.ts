"use client";

import axios from "axios";
import { redirect } from "next/navigation";

export const apiClient = axios.create({});

async function getAuthorizationToken() {
    if (typeof document === "undefined") return "";
    let token = document.cookie
        .split(";")
        .filter((cookie) => cookie.startsWith("token"))[0];

    if (!token) {
        const response = await fetch("/api/refresh", { method: "POST" });
        const data = await response.json();
        if (!data.token) {
            await fetch("/api/logout", { method: "POST" });
            redirect("/login");
        }

        return Promise.resolve(`Bearer ${data.token}`);
    } else {
        if (typeof token === "undefined") return "expired";
        const [_, accessToken] = token.split("=");
        return Promise.resolve(`Bearer ${accessToken}`);
    }
}

apiClient.interceptors.request.use((response) => {
    const token = getAuthorizationToken;
    response.headers.Authorization = `Bearer ${token}`;

    return response;
});
