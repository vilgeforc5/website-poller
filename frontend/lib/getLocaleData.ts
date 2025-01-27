export const getLocaleData = (date: Date | string | null | undefined) => {
    if (!date) {
        return null;
    }

    const dateObject = new Date(date);

    const timezoneOffset = new Date().getTimezoneOffset();

    dateObject.setMinutes(dateObject.getMinutes() + timezoneOffset);

    const formattedDate = dateObject.toLocaleDateString();

    return formattedDate;
};
