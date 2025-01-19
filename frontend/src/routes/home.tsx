import { Box, Title } from "@mantine/core";

export function meta() {
    return [
        { title: "New React Router App" },
        { name: "description", content: "Welcome to React Router!" },
    ];
}

export default function Home() {
    return (
        <Box>
            <Title title="Главная">Главная</Title>
        </Box>
    );
}
