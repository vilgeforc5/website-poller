import {
    createContext,
    type ReactNode,
    useCallback,
    useContext,
    useEffect,
    useState,
} from "react";
import axios, { AxiosResponse } from "axios";

const AuthContext = createContext<{
    access: null | string;
    refresh: null | string;
    setTokens: (access: string, refresh: string) => void;
    resetTokens: () => void;
    isPending: boolean;
}>({
    access: null,
    refresh: null,
    isPending: true,
    setTokens: () => {},
    resetTokens: () => {},
});

const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [accessToken_, setAccessToken] = useState(localStorage.getItem("at"));
    const [refreshToken_, setRefreshToken] = useState(
        localStorage.getItem("rt"),
    );
    const [isPending, setIsPending] = useState(true);

    const setTokens = useCallback((at: string | null, rt: string | null) => {
        setAccessToken(at);
        setRefreshToken(rt);
    }, []);

    const resetTokens = useCallback(() => {
        console.log("resetTokens");
        setTokens(null, null);
    }, []);

    const refreshTokenHandle = useCallback(
        (response: AxiosResponse) => {
            if (response.status === 401 && refreshToken_) {
                if (refreshToken_) {
                    axios
                        .post(
                            "api/auth/refresh",
                            {},
                            {
                                headers: {
                                    Authorization: `Bearer ${refreshToken_}`,
                                },
                            },
                        )
                        .then((res) => {
                            const accessToken = res.data["access_token"];
                            const refreshToken = res.data["refresh_token"];

                            if (accessToken && refreshToken) {
                                setTokens(accessToken, refreshToken);
                            }
                        })
                        .catch(() => {
                            resetTokens();
                        });
                } else {
                    resetTokens();
                }
            }

            return response;
        },
        [refreshToken_],
    );

    useEffect(() => {
        if (accessToken_ && refreshToken_) {
            setIsPending(false);
            axios.defaults.headers.common.Authorization = `Bearer ${accessToken_}`;
            axios.interceptors.response.use(
                refreshTokenHandle,
                refreshTokenHandle,
            );

            localStorage.setItem("at", accessToken_);
            localStorage.setItem("rt", refreshToken_);
        } else {
            axios.defaults.headers.common.Authorization = null;
            axios.interceptors.response.clear();

            localStorage.removeItem("at");
            localStorage.removeItem("rt");
        }
    }, [accessToken_, refreshToken_, refreshTokenHandle]);

    return (
        <AuthContext.Provider
            value={{
                access: accessToken_,
                refresh: refreshToken_,
                setTokens,
                resetTokens,
                isPending,
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
