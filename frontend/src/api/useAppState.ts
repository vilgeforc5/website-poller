import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { queryKeys } from "@/api/queryKeys.ts";

export const useAppState = () => {
    const sites = useQuery({
        queryFn: () => {
            return axios.get("api/state/get-state");
        },
        refetchInterval: 5000,
        queryKey: [queryKeys.state],
    });

    return sites?.data?.data;
};
