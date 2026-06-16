let currentFloatingButton = null;

document.addEventListener("mouseup", (event) => {
    const selectedText = window.getSelection().toString().trim();

    if (!selectedText) {
        removeFloatingButton();
        return;
    }

    if (currentFloatingButton) return;

    const button = document.createElement("button");
    button.innerText = "🔮 Appraise";

    Object.assign(button.style, {
        position: "fixed",
        top: `${event.clientY + 10}px`,
        left: `${event.clientX + 10}px`,
        zIndex: "2147483647",
        backgroundColor: "#10b981",
        color: "#0a0f0d",
        border: "none",
        borderRadius: "6px",
        padding: "6px 12px",
        fontSize: "12px",
        fontWeight: "bold",
        cursor: "pointer",
        boxShadow: "0 0 15px rgba(16, 185, 129, 0.6)",
        transition: "all 0.2s ease",
    });

    button.addEventListener("click", () => {
        button.disabled = true;
        button.innerText = "⏳ Appraising...";
        button.style.backgroundColor = "#1e293b";
        button.style.color = "#f8fafc";
        button.style.cursor = "not-allowed";
        button.style.boxShadow = "0 0 20px rgba(148, 163, 184, 0.4)";

        button.style.animation = "pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite";

        const payload = {
            rawText: selectedText,
            pageTitle: document.title || window.location.hostname,
            sourceUrl: window.location.href,
            faviconUrl: `https://www.google.com/s2/favicons?sz=64&domain=${window.location.hostname}`,

        };

        chrome.runtime.sendMessage({ action: "CLIP_NOTE", data: payload }, (response) => {

            button.style.animation = "none";

            if (response && response.success) {
                button.innerText = "✨ Bound!";
                button.style.backgroundColor = "#22c55e";
                button.style.color = "#0a0f0d";
                button.style.boxShadow = "0 0 25px rgba(34, 197, 94, 0.8)";
                setTimeout(() => removeFloatingButton(), 1200);
            } else {

                button.innerText = "❌ Failed";
                button.style.backgroundColor = "#ef4444";
                button.style.color = "#ffffff";
                button.style.boxShadow = "0 0 25px rgba(239, 68, 68, 0.8)";
                console.error("Clips save failure:", response?.error);
                setTimeout(() => removeFloatingButton(), 2200);
            }
        });
    });

    document.body.appendChild(button);
    currentFloatingButton = button;
});

function removeFloatingButton() {
    if (currentFloatingButton) {
        currentFloatingButton.remove();
        currentFloatingButton = null;
    }
}

if (!document.getElementById("grimoire-styles")) {
    const styleSheet = document.createElement("style");
    styleSheet.id = "grimoire-styles";
    styleSheet.innerText = `
        @keyframes pulse {
            0%, 100% { opacity: 1; transform: scale(1); }
            50% { opacity: .6; transform: scale(0.96); }
        }
    `;
    document.head.appendChild(styleSheet);
}
