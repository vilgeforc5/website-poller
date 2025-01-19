import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { queryKeys } from "@/api/queryKeys.ts";

export const useSitesQuery = () => {
    const sites = useQuery({
        queryFn: () => {
            return axios.get("api/site");
        },
        queryKey: [queryKeys.siteList],
    });

    return sites?.data?.data;
};
