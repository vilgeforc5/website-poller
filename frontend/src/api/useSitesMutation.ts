import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { queryKeys } from "@/api/queryKeys.ts";

export const useSitesAddMutation = (
    data: string[],
    onSuccess: () => void,
    onError: () => void,
    onSettled: () => void,
) => {
    const queryClient = useQueryClient();

    const { mutate } = useMutation({
        mutationFn: () => {
            return axios.post(
                "/api/site/many",
                data.map((address) => ({ address })),
            );
        },
        onSuccess: () => {
            onSuccess();
            queryClient.invalidateQueries({ queryKey: [queryKeys.siteList] });
        },
        onError,
        onSettled,
    });

    return mutate;
};
