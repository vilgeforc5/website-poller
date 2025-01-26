import { CodesChart } from "@/components/CodesChart/CodesChart";
import { serverFetch } from "@/lib/serverFetch";
import { TPollCodeInfo } from "backend/dist/layers/poll/poll.types";

export default async function CodeChartPage() {
    const data = await serverFetch<TPollCodeInfo>("/poll/code-info/");

    return <CodesChart data={data.data} />;
}
