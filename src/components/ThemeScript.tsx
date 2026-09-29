export default function ThemeScript() {
    const script = `
        (function () {
            try {
                const stored = localStorage.getItem("meetkind-theme-store");
                const parsed = stored ? JSON.parse(stored) : null;
                const theme = parsed?.state?.theme || "light";

                const isDark = theme === "dark";

                document.documentElement.classList.toggle(
                    "dark",
                    isDark
                );

                document.documentElement.classList.toggle(
                    "light",
                    !isDark
                );
            } catch (error) {
                console.error("Theme initialization failed", error);
            }
        })();
    `;

    return (
        <script
            dangerouslySetInnerHTML={{
                __html: script,
            }}
        />
    );
}