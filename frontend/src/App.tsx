import { Navigate, Route, Routes } from "react-router";
import { lazy } from "react";
import { ProtectedRoute } from "@/routes/ProtectedRoute.tsx";
import AppLayout from "@/components/AppLayout.tsx";
import Settings from "@/routes/settings.tsx";

const Home = lazy(() => import("@/routes/home"));
const Sites = lazy(() => import("@/routes/sites"));
const SignIn = lazy(() => import("@/routes/sign-in.tsx"));

function App() {
    return (
        <>
            <Routes>
                <Route element={<ProtectedRoute />}>
                    <Route element={<AppLayout />}>
                        <Route index element={<Home />} />
                        <Route path="sites" element={<Sites />} />
                        <Route
                            path="*"
                            element={<Navigate replace to="/not-found" />}
                        />
                        <Route
                            path="not-found"
                            element={<div>Страничка еще не закончена</div>}
                        />
                        <Route path="settings" element={<Settings />} />
                    </Route>
                </Route>
                <Route path="/sign-in" element={<SignIn />} />
                <Route
                    path="*"
                    element={<Navigate replace to="/not-found" />}
                />
                <Route
                    path="not-found"
                    element={<div>Страничка еще не закончена</div>}
                />
            </Routes>
        </>
    );
}

export default App;
