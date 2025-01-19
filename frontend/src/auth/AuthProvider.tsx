import {
    createContext,
    type ReactNode,
    useCallback,
    useContext,
    useEffect,
    useState,
} from "react";
import axios from "axios";
import { useQueryClient } from "@tanstack/react-query";

const AuthContext = createContext<{
    access: null | string;
    refresh: null | string;
    setTokens: (access: string, refresh: string) => void;
    resetTokens: () => void;
    isReady: boolean;
}>({
    access: null,
    refresh: null,
    setTokens: () => {},
    resetTokens: () => {},
    isReady: false,
});

// TODO refactor to use http-only cookie for refresh token.
const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [accessToken_, setAccessToken] = useState(localStorage.getItem("at"));
    const [refreshToken_, setRefreshToken] = useState(
        localStorage.getItem("rt"),
    );
    const [isReady, setIsReady] = useState(false);

    const queryClient = useQueryClient();

    const setTokens = (at: string | null, rt: string | null) => {
        setAccessToken(at);
        setRefreshToken(rt);
    };

    const resetTokens = useCallback(() => {
        console.log("resetTokens called");

        setTokens(null, null);
    }, []);

    const refreshTokenHandle = useCallback(
        (refreshToken: string) => {
            console.log("refreshTokenHandle", refreshToken);
            if (refreshToken) {
                axios
                    .post(
                        "api/auth/refresh",
                        {},
                        {
                            headers: {
                                Authorization: `Bearer ${refreshToken}`,
                            },
                        },
                    )
                    .then((res) => {
                        const accessToken = res.data["access_token"];
                        const refreshToken = res.data["refresh_token"];

                        if (accessToken && refreshToken) {
                            setTokens(accessToken, refreshToken);
                            queryClient.invalidateQueries();
                        }
                    })
                    .catch(() => {
                        resetTokens();
                    });
            } else {
                resetTokens();
            }
        },
        [resetTokens],
    );

    useEffect(() => {
        console.log({ accessToken: accessToken_, refreshToken: refreshToken_ });
        if (accessToken_ && refreshToken_) {
            console.log("-inside");
            setIsReady(true);

            axios.defaults.headers.common.Authorization = `Bearer ${accessToken_}`;
            axios.interceptors.response.use(
                (response) => {
                    if (response.status === 401) {
                        if (refreshToken_) {
                            refreshTokenHandle(refreshToken_);
                        } else {
                            resetTokens();
                        }
                    }

                    return response;
                },
                (error) => {
                    if (error.response.status === 401) {
                        if (refreshToken_) {
                            refreshTokenHandle(refreshToken_);
                        } else {
                            resetTokens();
                        }
                    }

                    return error;
                },
            );

            localStorage.setItem("at", accessToken_);
            localStorage.setItem("rt", refreshToken_);
        } else {
            console.log("nullish");

            axios.defaults.headers.common.Authorization = null;
            axios.interceptors.response.use(
                (r) => r,
                (e) => e,
            );

            localStorage.removeItem("at");
            localStorage.removeItem("rt");
        }
    }, [
        accessToken_,
        refreshToken_,
        setIsReady,
        refreshTokenHandle,
        resetTokens,
    ]);

    return (
        <AuthContext.Provider
            value={{
                access: accessToken_,
                refresh: refreshToken_,
                setTokens,
                resetTokens,
                isReady,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};

export default AuthProvider;
