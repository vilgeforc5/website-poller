const range = (start: number, stop: number, step = 1) =>
    Array.from(
        { length: (stop - start) / step + 1 },
        (_, i) => start + i * step,
    );

export const codesRange = {
    200: range(200, 299),
    300: range(300, 399),
    400: range(400, 499),
    500: range(500, 599),
};
