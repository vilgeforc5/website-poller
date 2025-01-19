import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { queryKeys } from "@/api/queryKeys.ts";

export const usePollMutation = (
    onSuccess: () => void,
    onError: () => void,
    onSettled: () => void,
) => {
    const queryClient = useQueryClient();

    const { mutate } = useMutation({
        mutationFn: () => {
            return axios.post("/api/poller/trigger-poll");
        },
        onSuccess: () => {
            onSuccess();
            queryClient.invalidateQueries({ queryKey: [queryKeys.state] });
        },
        onError,
        onSettled,
    });

    return mutate;
};
