export default function formatDate(dateString: string): string {
    const date = new Date(dateString);
    const now = new Date();

    const startOfToday = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate()
    );

    const startOfDate = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate()
    );

    const diffInDays =
        Math.floor(
            (startOfToday.getTime() - startOfDate.getTime()) /
            (1000 * 60 * 60 * 24)
        );

    if (diffInDays === 0) {
        return "Today";
    }

    if (diffInDays === 1) {
        return "Yesterday";
    }

    return date.toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
    });
};