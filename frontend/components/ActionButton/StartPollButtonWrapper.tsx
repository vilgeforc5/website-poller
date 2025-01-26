import { StartPollButton } from "@/components/ActionButton/StartPollButton";
import { serverFetch } from "@/lib/serverFetch";

export const StartPollButtonWrapper = async () => {
    const { data: hasRunningTasks } = await serverFetch<boolean>(
        "/polling-task/has-running-tasks",
    );

    return <StartPollButton disabled={hasRunningTasks} />;
};
